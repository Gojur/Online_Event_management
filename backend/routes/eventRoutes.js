const express = require("express");

const router = express.Router();

const {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController");

const authenticateToken = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");


// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get all events
router.get("/", getAllEvents);

// Get event by ID
router.get("/:id", getEventById);


// ==========================================
// ADMIN ROUTES
// ==========================================

// Create event
router.post(
    "/",
    authenticateToken,
    adminOnly,
    createEvent
);
// Update event
router.put(
    "/:id",
    authenticateToken,
    adminOnly,
    updateEvent
);

// Delete event
router.delete(
    "/:id",
    authenticateToken,
    adminOnly,
    deleteEvent
);



module.exports = router;