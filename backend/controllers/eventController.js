const db = require("../config/db");

// ==========================================
// GET ALL EVENTS
// ==========================================
const getAllEvents = (req, res) => {

    const sql = `
        SELECT *
        FROM events
        ORDER BY event_date ASC, event_time ASC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.error("Get events error:", err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json({
            events: results
        });
    });
};


// ==========================================
// GET EVENT BY ID
// ==========================================
const getEventById = (req, res) => {

    const { id } = req.params;

    const sql = "SELECT * FROM events WHERE id = ?";

    db.query(sql, [id], (err, results) => {

        if (err) {
            console.error("Get event error:", err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.json({
            event: results[0]
        });
    });
};


// ==========================================
// CREATE EVENT - ADMIN
// ==========================================
const createEvent = (req, res) => {

    const {
        title,
        description,
        event_date,
        event_time,
        location,
        capacity
    } = req.body;


    // Validate required fields
    if (
        !title ||
        !description ||
        !event_date ||
        !event_time ||
        !location ||
        !capacity
    ) {
        return res.status(400).json({
            message: "All event fields are required"
        });
    }


    const sql = `
        INSERT INTO events
        (title, description, event_date, event_time, location, capacity)
        VALUES (?, ?, ?, ?, ?, ?)
    `;


    db.query(
        sql,
        [
            title,
            description,
            event_date,
            event_time,
            location,
            capacity
        ],
        (err, result) => {

            if (err) {
                console.error("Create event error:", err);

                return res.status(500).json({
                    message: "Failed to create event"
                });
            }


            res.status(201).json({
                message: "Event created successfully",
                eventId: result.insertId
            });
        }
    );
};
// ==========================================
// UPDATE EVENT - ADMIN
// ==========================================
const updateEvent = (req, res) => {

    const { id } = req.params;

    const {
        title,
        description,
        event_date,
        event_time,
        location,
        capacity
    } = req.body;


    // Check required fields
    if (
        !title ||
        !description ||
        !event_date ||
        !event_time ||
        !location ||
        !capacity
    ) {
        return res.status(400).json({
            message: "All event fields are required"
        });
    }


    const sql = `
        UPDATE events
        SET
            title = ?,
            description = ?,
            event_date = ?,
            event_time = ?,
            location = ?,
            capacity = ?
        WHERE id = ?
    `;


    db.query(
        sql,
        [
            title,
            description,
            event_date,
            event_time,
            location,
            capacity,
            id
        ],
        (err, result) => {

            if (err) {
                console.error("Update event error:", err);

                return res.status(500).json({
                    message: "Failed to update event"
                });
            }


            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Event not found"
                });
            }


            res.json({
                message: "Event updated successfully"
            });
        }
    );
};


// ==========================================
// DELETE EVENT - ADMIN
// ==========================================
const deleteEvent = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM events WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.error("Delete event error:", err);

            return res.status(500).json({
                message: "Failed to delete event"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.json({
            message: "Event deleted successfully"
        });
    });
};


// ==========================================
// EXPORT
// ==========================================
module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};