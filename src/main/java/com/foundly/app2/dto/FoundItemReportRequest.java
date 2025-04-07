package com.foundly.app2.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoundItemReportRequest {
    private Integer userId; // ID of the user reporting the found item
    private Integer categoryId; // ID of the category for the found item
    private String itemName; // Name of the found item
    private String description; // Description of the found item
    private String location; // Location where the item was found
    private String dateLostOrFound; // Date when the item was found
    private String imageUrl; // URL of the item's image
    private boolean handoverToSecurity; // true if handed to security, false if kept with finder
    private String securityId; // Optional, only if handed to security
    private String securityName; // Optional, only if handed to security
    private String pickupMessage; // Message for User A
}