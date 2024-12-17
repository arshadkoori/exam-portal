import { Router } from 'express';
import * as user from '../requesthandlers/user.handler.js';
import { authenticateToken, isAuthenticated, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.route('/register').post(user.register);
router.route('/login').post(user.login);
router.route('/request-password-reset').post(user.requestPasswordReset);
router.route('/change-password').post(user.changePassword);

// Example protected route
router.route('/protected').get(authenticateToken, isAuthenticated, (req, res) => {
    res.status(200).json({ msg: "This is a protected route", user: req.user });
});

// Example role-based protected route
router.route('/admin').get(authenticateToken, authorizeRoles('admin'), (req, res) => {
    res.status(200).json({ msg: "This is an admin-only route", user: req.user });
});

export default router;
