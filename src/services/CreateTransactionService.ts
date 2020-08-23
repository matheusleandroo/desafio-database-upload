import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const categoryRepository = getRepository(Category);
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    let transacationCategory = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });

    if (!transacationCategory) {
      transacationCategory = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(transacationCategory);
    }

    if (
      type === 'outcome' &&
      !(await transactionsRepository.canCreateOutcome(value))
    ) {
      throw new AppError('No limit', 400);
    }

    const transacation = transactionsRepository.create({
      title,
      type,
      value,
      category: transacationCategory,
    });

    await transactionsRepository.save(transacation);

    return transacation;
  }
}

export default CreateTransactionService;
