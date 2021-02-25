import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../repositories/UsersRepository';

export class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    if (!name || !email) {
      return response.status(400).json({ error: `Missing data!` });
    }

    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      return response.status(400).json({ error: 'Email already exists!' });
    }

    const user = userRepository.create({
      name,
      email,
    });

    await userRepository.save(user);

    return response.status(201).json(user);
  }
}
