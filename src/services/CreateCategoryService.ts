import { getRepository } from 'typeorm';

import Catetory from '../models/Category';

interface Request {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: Request): Promise<Catetory> {
    const catetoriesRepository = getRepository(Catetory);

    const checkCategoryExists = await catetoriesRepository.findOne({
      title,
    });

    if (checkCategoryExists) {
      return checkCategoryExists;
    }

    const category = catetoriesRepository.create({
      title,
    });

    await catetoriesRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
