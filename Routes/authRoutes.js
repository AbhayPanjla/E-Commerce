import express from 'express';
import { forgotpasswordController, loginController, registerController, testControllers, } from '../Controlers/authControllers.js'
import { IsAdmin, requireSignIn } from '../middleWare/authMiddleware.js';
// Router Object 
const router = express.Router();

// Routing

// Ragister || Method Post
router.post("/register", registerController)

// lOGIN
router.post("/login", loginController);

// Forget Password
router.post("/forgot-password", forgotpasswordController);


// Test Routes
router.get("/test", requireSignIn, IsAdmin, testControllers);

// Protected Routes for user Auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});
// Protected Routes for user Auth
router.get("/admin-auth", requireSignIn, IsAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

export default router