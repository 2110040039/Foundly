package com.foundly.app2.controller;

import com.foundly.app2.entity.Transactions;
import com.foundly.app2.service.TransactionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
public class TransactionsController {

    @Autowired
    private TransactionsService transactionsService;

    // Get all transactions
    @GetMapping
    public ResponseEntity<List<Transactions>> getAllTransactions() {
        List<Transactions> transactions = transactionsService.getAllTransactions();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    // Get transaction by ID
    @GetMapping("/{id}")
    public ResponseEntity<Transactions> getTransactionById(@PathVariable Integer id) {
        Optional<Transactions> transaction = transactionsService.getTransactionById(id);
        return transaction.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Create a new transaction
    @PostMapping
    public ResponseEntity<Transactions> createTransaction(@RequestBody Transactions transactions) {
        Transactions createdTransaction = transactionsService.saveTransaction(transactions);
        return new ResponseEntity<>(createdTransaction, HttpStatus.CREATED);
    }

    // Update an existing transaction
    @PutMapping("/{id}")
    public ResponseEntity<Transactions> updateTransaction(@PathVariable Integer id, @RequestBody Transactions transactions) {
        Optional<Transactions> existingTransaction = transactionsService.getTransactionById(id);
        if (existingTransaction.isPresent()) {
            transactions.setTransactionId(id);
            Transactions updatedTransaction = transactionsService.saveTransaction(transactions);
            return new ResponseEntity<>(updatedTransaction, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete a transaction
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Integer id) {
        Optional<Transactions> existingTransaction = transactionsService.getTransactionById(id);
        if (existingTransaction.isPresent()) {
            transactionsService.deleteTransaction(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
