import { getRepository, DeleteResult } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<DeleteResult> {
    const transactionsRepository = getRepository(Transaction);

    const transactionExist = transactionsRepository.findOne({ id });

    if (!transactionExist) {
      throw new AppError('Transaction not found');
    }

    const transaction = transactionsRepository.delete({
      id,
    });

    return transaction;
  }
}

export default DeleteTransactionService;
