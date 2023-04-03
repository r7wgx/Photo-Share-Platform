import express from 'express';
import * as pageController from '../controllers/pageController.js'
const router = express.Router();

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router.route('/register').get(pageController.getRegister);
router.route("/login").get(pageController.getLogin);
router.route("/logout").get(pageController.getLoguot);

export default router;