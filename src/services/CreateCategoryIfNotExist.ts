// import AppError from '../errors/AppError';

import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface Request {
  title: string;
}

class CreateCategoryIfNotExist {
  public async execute({ title }: Request): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const categoryFound = await categoryRepository.findOne({
      where: { title },
    });

    if (categoryFound) {
      return categoryFound;
    }

    const category = categoryRepository.create({
      title,
    });

    await categoryRepository.save(category);

    return category;
  }
}

export default CreateCategoryIfNotExist;
