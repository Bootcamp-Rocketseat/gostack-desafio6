import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';

import CreateCategoryIfNotExist from './CreateCategoryIfNotExist';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionRepository);

    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('Not valida transaction type.');
    }

    if (type === 'outcome') {
      const balance = await transactionRepository.getBalance();

      if (balance.total < value) {
        throw new AppError(
          'You do not have suffient balance for this transaction.',
        );
      }
    }

    const createCategory = new CreateCategoryIfNotExist();
    const categoryCreated = await createCategory.execute({ title: category });

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category: categoryCreated,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
