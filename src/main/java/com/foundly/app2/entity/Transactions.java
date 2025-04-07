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
    private User initiatorUser;

    @ManyToOne
    @JoinColumn(name = "receiver_user_id")
    private User receiverUser;  // Fixed Foreign Key Issue

    @Column(name = "security_id")
    private String securityId;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type", nullable = false)
    private TransactionType transactionType;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_status", nullable = false)
    private TransactionStatus transactionStatus = TransactionStatus.PENDING;

    @Column(name = "date_updated")
    private LocalDateTime dateUpdated; // Changed from String to LocalDateTime

    public enum TransactionType {
        CLAIM, HANDOVER
    }

    public enum TransactionStatus {
        PENDING, REQUESTED, HAND_OVER_TO_SECURITY, COMPLETED
    }
}
