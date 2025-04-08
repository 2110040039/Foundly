package com.foundly.app2.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Getter
@Setter
public class Transactions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transactionId;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private ItemReports item;

    @ManyToOne
    @JoinColumn(name = "initiator_user_id", nullable = false)
    private User initiatorUser ; // This should be a User object

    @ManyToOne
    @JoinColumn(name = "receiver_user_id")
    private User receiverUser ;  // The person receiving the item (if applicable)

    // Context field to hold relevant information based on transaction type
    @Column(name = "transaction_context", columnDefinition = "TEXT")
    private String transactionContext;  // JSON or structured text to hold security details or pickup message

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type", nullable = false)
    private TransactionType transactionType;  // Type of transaction

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_status", nullable = false)
    private TransactionStatus transactionStatus = TransactionStatus.PENDING;  // Current status of the transaction

    @Column(name = "date_updated")
    private LocalDateTime dateUpdated;  // Timestamp for the last update

    public enum TransactionType {
        CLAIM, HANDOVER
    }

    public enum TransactionStatus {
        PENDING, REQUESTED, HAND_OVER_TO_SECURITY, COMPLETED
    }
}