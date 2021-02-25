import { Router } from 'express';
const router = Router();

import { UserController } from './controllers/UserController';
const userController = new UserController();

router.post('/users', userController.create);

export { router };
