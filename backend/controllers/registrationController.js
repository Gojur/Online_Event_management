const db = require("../config/db");


// ==========================================
// REGISTER FOR EVENT
// ==========================================
const registerForEvent = (req, res) => {

    const userId = req.user.id;
    const { event_id } = req.body;


    // Check event ID
    if (!event_id) {
        return res.status(400).json({
            message: "Event ID is required"
        });
    }


    // Check whether event exists
    const eventSql = `
        SELECT *
        FROM events
        WHERE id = ?
    `;

    db.query(eventSql, [event_id], (err, events) => {

        if (err) {
            console.error("Event check error:", err);

            return res.status(500).json({
                message: "Database error"
            });
        }


        if (events.length === 0) {
            return res.status(404).json({
                message: "Event not found"
            });
        }


        const event = events[0];


        // Check event capacity
        const countSql = `
            SELECT COUNT(*) AS registered_count
            FROM registrations
            WHERE event_id = ?
        `;


        db.query(
            countSql,
            [event_id],
            (err, countResult) => {

                if (err) {
                    console.error("Registration count error:", err);

                    return res.status(500).json({
                        message: "Database error"
                    });
                }


                const registeredCount =
                    countResult[0].registered_count;


                // Check capacity
                if (registeredCount >= event.capacity) {
                    return res.status(400).json({
                        message: "Event is full"
                    });
                }


                // Check duplicate registration
                const duplicateSql = `
                    SELECT *
                    FROM registrations
                    WHERE user_id = ?
                    AND event_id = ?
                `;


                db.query(
                    duplicateSql,
                    [userId, event_id],
                    (err, existing) => {

                        if (err) {
                            console.error(
                                "Duplicate check error:",
                                err
                            );

                            return res.status(500).json({
                                message: "Database error"
                            });
                        }


                        if (existing.length > 0) {
                            return res.status(409).json({
                                message:
                                    "You are already registered for this event"
                            });
                        }


                        // Insert registration
                        const insertSql = `
                            INSERT INTO registrations
                            (user_id, event_id)
                            VALUES (?, ?)
                        `;


                        db.query(
                            insertSql,
                            [userId, event_id],
                            (err, result) => {

                                if (err) {
                                    console.error(
                                        "Registration error:",
                                        err
                                    );

                                    return res.status(500).json({
                                        message:
                                            "Failed to register for event"
                                    });
                                }


                                res.status(201).json({
                                    message:
                                        "Event registration successful",
                                    registrationId:
                                        result.insertId
                                });
                            }
                        );
                    }
                );
            }
        );
    });
};

// ==========================================
// GET MY REGISTRATION HISTORY
// ==========================================
const getMyRegistrations = (req, res) => {

    const userId = req.user.id;

    const sql = `
        SELECT
            r.id AS registration_id,
            r.registered_at,
            e.id AS event_id,
            e.title,
            e.description,
            e.event_date,
            e.event_time,
            e.location,
            e.capacity
        FROM registrations r
        JOIN events e
            ON r.event_id = e.id
        WHERE r.user_id = ?
        ORDER BY e.event_date ASC, e.event_time ASC
    `;

    db.query(sql, [userId], (err, results) => {

        if (err) {
            console.error("Registration history error:", err);

            return res.status(500).json({
                message: "Failed to fetch registration history"
            });
        }

        res.json({
            registrations: results
        });
    });
};

// ==========================================
// ADMIN - VIEW ALL REGISTERED USERS
// ==========================================
const getAllRegistrations = (req, res) => {

    const sql = `
        SELECT
            r.id AS registration_id,
            r.registered_at,

            u.id AS user_id,
            u.name AS user_name,
            u.email AS user_email,

            e.id AS event_id,
            e.title AS event_title,
            e.event_date,
            e.event_time,
            e.location

        FROM registrations r

        JOIN users u
            ON r.user_id = u.id

        JOIN events e
            ON r.event_id = e.id

        ORDER BY r.registered_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.error(
                "Get all registrations error:",
                err
            );

            return res.status(500).json({
                message: "Failed to fetch registrations"
            });
        }

        res.json({
            registrations: results
        });
    });
};

module.exports = {
    registerForEvent,
    getMyRegistrations,
    getAllRegistrations
};