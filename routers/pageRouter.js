import express from 'express';
import * as pageController from '../controllers/pageController.js'
import * as authMiddlaware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").get(authMiddlaware.authToken, pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router.route('/register').get(pageController.getRegister);
router.route("/login").get(pageController.getLogin)

export default router;