package com.foundly.app2.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "found_item_details")
@Getter
@Setter
public class FoundItemDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // Ensure this column exists in the database

    @OneToOne
    @JoinColumn(name = "item_id", nullable = false)
    @JsonIgnore // Prevent circular reference during serialization
    private ItemReports item; // Link to the found item report

    @Column(name = "security_id")
    private String securityId; // ID of the security personnel

    @Column(name = "security_name")
    private String securityName; // Name of the security personnel

    @Column(name = "pickup_message")
    private String pickupMessage; // Message for User A
    
    @Column(name = "handover_to_security")
    private boolean handoverToSecurity; // true if handed to security, false if kept with finder
} 