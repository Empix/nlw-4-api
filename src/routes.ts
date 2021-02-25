import { Router } from 'express';
const router = Router();

import { UserController } from './controllers/UserController';
const userController = new UserController();

import { SurveysController } from './controllers/SurveysController';
const surveyController = new SurveysController();

router.post('/users', userController.create);

router.get('/surveys', surveyController.index);
router.post('/surveys', surveyController.create);

export { router };
