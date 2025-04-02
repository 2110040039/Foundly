package com.foundly.app2.service;

import com.foundly.app2.entity.Transactions;
import com.foundly.app2.repository.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionsService {

    @Autowired
    private TransactionsRepository transactionsRepository;

    // Get all transactions
    public List<Transactions> getAllTransactions() {
        return transactionsRepository.findAll();
    }

    // Get a transaction by ID
    public Optional<Transactions> getTransactionById(Integer transactionId) {
        return transactionsRepository.findById(transactionId);
    }

    // Create or update a transaction
    public Transactions saveTransaction(Transactions transaction) {
        return transactionsRepository.save(transaction);
    }

    // Delete a transaction
    public void deleteTransaction(Integer transactionId) {
        transactionsRepository.deleteById(transactionId);
    }

    // Get transactions by status
    public List<Transactions> getTransactionsByStatus(Transactions.TransactionStatus transactionStatus) {
        return transactionsRepository.findByTransactionStatus(transactionStatus);
    }
}
