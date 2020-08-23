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

    const income = transactions.reduce((total, elemento) => {
      if (elemento.type === 'income') return total + Number(elemento.value);
      return total;
    }, 0);

    const outcome = transactions.reduce((total, elemento) => {
      if (elemento.type === 'outcome') return total + Number(elemento.value);
      return total;
    }, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public async canCreateOutcome(outcomeValue: number): Promise<boolean> {
    const balance = await this.getBalance();

    if (outcomeValue > balance.total) return false;

    return true;
  }
}

export default TransactionsRepository;
