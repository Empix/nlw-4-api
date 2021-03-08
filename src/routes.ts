import { Router } from 'express';
const router = Router();

import { UserController } from './controllers/UserController';
const userController = new UserController();

import { SurveysController } from './controllers/SurveysController';
const surveyController = new SurveysController();

import { SendMailController } from './controllers/SendMailController';
const sendMailController = new SendMailController();

import { AnswerController } from './controllers/AnswerController';
const answerController = new AnswerController();

import { NpsController } from './controllers/NpsController';
const npsController = new NpsController();

router.post('/users', userController.create);

router.get('/surveys', surveyController.index);
router.post('/surveys', surveyController.create);

router.post('/sendMail', sendMailController.execute);

router.get('/answers/:value', answerController.execute);

router.get('/nps/:survey_id', npsController.execute);

export { router };
