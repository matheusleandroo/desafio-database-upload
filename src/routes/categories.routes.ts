import { Router } from 'express';
import { getRepository } from 'typeorm';

import Catetory from '../models/Category';
import CreateCategoryService from '../services/CreateCategoryService';

const categoriesRouter = Router();

categoriesRouter.get('/', async (request, response) => {
  const catetoriesRepository = getRepository(Catetory);

  const categories = await catetoriesRepository.find();

  return response.json(categories);
});

categoriesRouter.post('/', async (request, response) => {
  const { title } = request.body;

  const createCategory = new CreateCategoryService();

  const category = await createCategory.execute({ title });

  return response.json(category);
});

export default categoriesRouter;
