package com.foundly.app2.controller;

import com.foundly.app2.entity.Transactions;
import com.foundly.app2.service.TransactionsService;
import com.foundly.app2.dto.ClaimRequest;
import com.foundly.app2.dto.HandoverRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    // Get a transaction by ID
    @GetMapping("/{id}")
    public ResponseEntity<Transactions> getTransactionById(@PathVariable Integer id) {
        return transactionsService.getTransactionById(id)
                .map(transaction -> new ResponseEntity<>(transaction, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Claim an item
    @PostMapping("/claim")
    public ResponseEntity<Transactions> claimItem(@RequestBody ClaimRequest request) {
        Transactions createdTransaction = transactionsService.claimItem(request);
        return new ResponseEntity<>(createdTransaction, HttpStatus.CREATED);
    }

    // Handover an item
    @PostMapping("/handover")
    public ResponseEntity<Transactions> handoverItem(@RequestBody HandoverRequest request) {
        Transactions createdTransaction = transactionsService.handoverItem(request);
        return new ResponseEntity<>(createdTransaction, HttpStatus.CREATED);
    }

    // Additional methods for handling transaction status updates can be added here
}