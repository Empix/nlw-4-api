import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { resolve } from 'path';

import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveyUser';
import { UserRepository } from '../repositories/UsersRepository';

import SendMailService from '../services/SendMailService';
import { AppError } from '../errors/AppError';

export class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const userExists = await userRepository.findOne({ email });
    if (!userExists) {
      throw new AppError('User does not exists');
    }

    const surveyExists = await surveysRepository.findOne({ id: survey_id });
    if (!surveyExists) {
      throw new AppError('Survey does not exists');
    }

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

    const surveyUserExists = await surveysUsersRepository.findOne({
      where: { user_id: userExists.id, value: null },
      relations: ['user', 'survey'],
    });

    const variables = {
      name: userExists.name,
      title: surveyExists.title,
      description: surveyExists.description,
      id: '',
      link: process.env.URL_MAIL,
    };

    if (surveyUserExists) {
      variables.id = surveyUserExists.id;

      await SendMailService.execute(
        userExists.email,
        surveyExists.title,
        variables,
        npsPath
      );

      return response.json(surveyUserExists);
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: userExists.id,
      survey_id: surveyExists.id,
    });

    await surveysUsersRepository.save(surveyUser);

    variables.id = surveyUser.id;

    await SendMailService.execute(
      userExists.email,
      surveyExists.title,
      variables,
      npsPath
    );

    return response.json(surveyUser);
  }
}
