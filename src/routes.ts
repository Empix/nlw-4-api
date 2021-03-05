import { Router } from 'express';
const router = Router();

import { UserController } from './controllers/UserController';
const userController = new UserController();

import { SurveysController } from './controllers/SurveysController';
const surveyController = new SurveysController();

import { SendMailController } from './controllers/SendMailController';
const sendMailController = new SendMailController();

router.post('/users', userController.create);

router.get('/surveys', surveyController.index);
router.post('/surveys', surveyController.create);

router.post('/sendMail', sendMailController.execute);

export { router };
