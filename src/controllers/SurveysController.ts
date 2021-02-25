import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { SurveysRepository } from '../repositories/SurveysRepository';

export class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    if (!title || !description) {
      return response.status(400).json({ error: `Missing data!` });
    }

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survey = surveysRepository.create({
      title,
      description,
    });

    await surveysRepository.save(survey);

    return response.status(201).json(survey);
  }

  async index(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const all = await surveysRepository.find();

    return response.json(all);
  }
}
