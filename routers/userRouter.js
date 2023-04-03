import express from 'express'
import * as userController from '../controllers/userController.js';
import * as authMiddlaware from "../middlewares/authMiddleware.js";

const router = express.Router()

router.route("/dashboard").get(authMiddlaware.authToken, userController.getDashboard);
router.route('/register').post(userController.createUser);
router.route("/login").post(userController.loginUser);

export default router