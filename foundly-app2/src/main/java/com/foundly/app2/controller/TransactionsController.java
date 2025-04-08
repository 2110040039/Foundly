package com.foundly.app2.controller;

import com.foundly.app2.entity.ItemReports;
import com.foundly.app2.entity.Transactions;
import com.foundly.app2.entity.User;
import com.foundly.app2.service.TransactionsService;
import com.foundly.app2.service.UserService;
import com.foundly.app2.service.ItemReportsService; // Import UserService
import com.foundly.app2.dto.ClaimRequest;
import com.foundly.app2.dto.HandoverRequest;
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

    @Autowired
    private UserService userService; // Inject UserService
    
    @Autowired
    private ItemReportsService itemReportsService;
    
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

    // Create a new claim transaction
    @PostMapping("/claim")
    public ResponseEntity<Transactions> claimItem(@RequestBody ClaimRequest request) {
        if (request.getInitiatorUserId() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Return 400 Bad Request if ID is null
        }

        // Fetch the User object based on the ID
        Optional<User> userOptional = userService.findById(request.getInitiatorUserId());
        if (!userOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // User not found
        }

        // Fetch the ItemReports object based on the ID (you need to add this)
        Optional<ItemReports> itemReportsOptional = itemReportsService.getItemReportById(request.getItemId());
        if (!itemReportsOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Item report not found
        }

        Transactions transaction = new Transactions();
        transaction.setTransactionType(Transactions.TransactionType.CLAIM);
        transaction.setInitiatorUser (userOptional.get()); // Set the User object
        transaction.setItem(itemReportsOptional.get()); // Set the ItemReports object
        transaction.setTransactionContext(request.getProofOfOwnership());
        transaction.setTransactionContext(request.getDescription());

        Transactions createdTransaction = transactionsService.saveTransaction(transaction);
        return new ResponseEntity<>(createdTransaction, HttpStatus.CREATED);
    }
    // Create a new handover transaction
    @PostMapping("/handover")
    public ResponseEntity<Transactions> handoverItem(@RequestBody HandoverRequest request) {
        Transactions transaction = new Transactions();
        transaction.setTransactionType(Transactions.TransactionType.HANDOVER);

        // Fetch the User object based on the ID
        Optional<User> userOptional = userService.getUserById(request.getInitiatorUserId());
        if (userOptional.isPresent()) {
            transaction.setInitiatorUser (userOptional.get()); // Set the User object
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // User not found
        }

        // Create a context string based on the request
        String context = String.format("{\"security_id\": \"%s\", \"security_name\": \"%s\", \"pickup_message\": \"%s\", \"photo\": \"%s\"}",
                request.getSecurityId(), request.getSecurityName(), request.getPickupMessage(), request.getPhoto());
        transaction.setTransactionContext(context);

        Transactions createdTransaction = transactionsService.saveTransaction(transaction);
        return new ResponseEntity<>(createdTransaction, HttpStatus.CREATED);
    }

    // Update an existing transaction
    @PutMapping("/{id}")
    public ResponseEntity<Transactions> updateTransaction(@PathVariable Integer id, @RequestBody Transactions transaction) {
        Optional<Transactions> existingTransaction = transactionsService.getTransactionById(id);
        if (existingTransaction.isPresent()) {
            transaction.setTransactionId(id);
            Transactions updatedTransaction = transactionsService.saveTransaction(transaction);
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

    // Update transaction status based on actions
    @PatchMapping("/{id}/status")
    public ResponseEntity<Transactions> updateTransactionStatus(@PathVariable Integer id, @RequestParam String action) {
        Optional<Transactions> existingTransaction = transactionsService.getTransactionById(id);
        if (existingTransaction.isPresent()) {
            Transactions transaction = existingTransaction.get();
            switch (action.toLowerCase()) {
                case "finder keeps item":
                    transaction.setTransactionStatus(Transactions.TransactionStatus.REQUESTED);
                    break;
                case "finder gives to security":
                    transaction.setTransactionStatus(Transactions.TransactionStatus.HAND_OVER_TO_SECURITY);
                    break;
                case "claimer confirms receipt":
                    transaction.setTransactionStatus(Transactions.TransactionStatus.COMPLETED);
                    break;
                // Add more cases as needed based on your table
                default:
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            Transactions updatedTransaction = transactionsService.saveTransaction(transaction);
            return new ResponseEntity<>(updatedTransaction, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}