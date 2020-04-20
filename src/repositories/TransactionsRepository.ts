import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const income = transactions.reduce((total, currentValue) => {
      if (currentValue.type === 'income') {
        return total + currentValue.value;
      }
      return total;
    }, 0);

    const outcome = transactions.reduce((total, currentValue) => {
      if (currentValue.type === 'outcome') {
        return total + currentValue.value;
      }
      return total;
    }, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }
}

export default TransactionsRepository;
