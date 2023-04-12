import express from 'express'
import * as userController from '../controllers/userController.js';
import * as authMiddlaware from "../middlewares/authMiddleware.js";

const router = express.Router()

router.route("/dashboard").get(authMiddlaware.authToken, userController.getDashboard);
router.route('/register').post(userController.createUser);
router.route("/login").post(userController.loginUser);
router.route("/").get(authMiddlaware.authToken, userController.getAllUsers);
router.route("/:id").get(authMiddlaware.authToken, userController.getAUser);

export default router