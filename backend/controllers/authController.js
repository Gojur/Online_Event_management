const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");


// ==========================================
// USER REGISTRATION
// ==========================================
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // Check whether email already exists
        const checkUserSql = "SELECT * FROM users WHERE email = ?";

        db.query(checkUserSql, [email], async (err, results) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Database error"
                });
            }

            // Email already exists
            if (results.length > 0) {
                return res.status(409).json({
                    message: "Email already registered"
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user
            const insertUserSql = `
                INSERT INTO users (name, email, password, role)
                VALUES (?, ?, ?, 'user')
            `;

            db.query(
                insertUserSql,
                [name, email, hashedPassword],
                (err, result) => {

                    if (err) {
                        console.error(err);

                        return res.status(500).json({
                            message: "Failed to register user"
                        });
                    }

                    res.status(201).json({
                        message: "User registered successfully",
                        userId: result.insertId
                    });
                }
            );
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// USER LOGIN
// ==========================================
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user
        const sql = "SELECT * FROM users WHERE email = ?";

        db.query(sql, [email], async (err, results) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Database error"
                });
            }

            // User not found
            if (results.length === 0) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            const user = results[0];

            // Compare password
            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            // Create JWT token
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            // Successful login
            res.json({
                message: "Login successful",

                token: token,

                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const forgotPassword = (req, res) => {

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    const sql =
        "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Email not found"
            });
        }

        const user = results[0];

        const resetToken = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        res.status(200).json({
            message: "Password reset token generated",
            resetToken: resetToken
        });

    });

};

const resetPassword = (req, res) => {

    const { token, password } = req.body;

    if (!token || !password) {

        return res.status(400).json({
            message: "Token and new password are required"
        });

    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        bcrypt.hash(password, 10)
            .then((hashedPassword) => {

                const sql = `
                    UPDATE users
                    SET password = ?
                    WHERE id = ?
                `;

                db.query(
                    sql,
                    [
                        hashedPassword,
                        decoded.id
                    ],
                    (err) => {

                        if (err) {

                            console.error(err);

                            return res.status(500).json({
                                message:
                                    "Failed to reset password"
                            });

                        }

                        res.status(200).json({
                            message:
                                "Password reset successfully"
                        });

                    }
                );

            });

    } catch (error) {

        return res.status(400).json({
            message:
                "Invalid or expired reset token"
        });

    }

};


// ==========================================
// EXPORT FUNCTIONS
// ==========================================
module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
};