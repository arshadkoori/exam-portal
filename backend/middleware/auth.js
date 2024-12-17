import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); 

// Middleware to verify the token
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded token info to request
        next(); // Continue to the next middleware or route handler
    } catch (err) {
        console.error("Token verification failed:", err);
        return res.status(403).json({ msg: "Invalid or expired token." });
    }
}

// Middleware to check if user is authenticated (example for specific roles if needed)
export function isAuthenticated(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ msg: "Authentication required." });
    }
    next();
}

// Middleware for role-based authorization (optional)
export function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ msg: "Access forbidden: insufficient privileges." });
        }
        next();
    };
}

