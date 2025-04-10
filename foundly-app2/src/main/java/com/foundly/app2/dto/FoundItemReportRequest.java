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
    private String dateLostOrFound; // Date and time the item was found
    private String mobileNumber; // Contact number of the reporter
    private String email; // Email ID of the reporter
    private Boolean handoverToSecurity; // Flag indicating if the item was handed over to security
    private String securityId; // Security ID for item handover
    private String securityName; // Name of the security staff handling the item
    private String pickupMessage; // Pickup message for the item
    private String imageUrl; // URL of the item's image (optional)
}
