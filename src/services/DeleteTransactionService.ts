import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transactionFound = await transactionRepository.findOne(id);

    if (!transactionFound) {
      throw new AppError('Not possible delete inexistent transaction.', 401);
    }

    await transactionRepository.delete(id);
  }
}

export default DeleteTransactionService;
