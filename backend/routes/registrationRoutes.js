const express = require("express");

const router = express.Router();

const {
    registerForEvent,
    getMyRegistrations,
    getAllRegistrations
} = require("../controllers/registrationController");

const authenticateToken =
    require("../middleware/authMiddleware");

const adminOnly =
    require("../middleware/adminMiddleware");
// ==========================================
// USER EVENT REGISTRATION
// ==========================================

router.post(
    "/",
    authenticateToken,
    registerForEvent
);

// Get my registration history
router.get(
    "/my",
    authenticateToken,
    getMyRegistrations,
    

);

// ==========================================
// ADMIN - VIEW ALL REGISTRATIONS
// ==========================================

router.get(
    "/",
    authenticateToken,
    adminOnly,
    getAllRegistrations
);


module.exports = router;