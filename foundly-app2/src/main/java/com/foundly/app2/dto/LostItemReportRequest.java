package com.foundly.app2.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LostItemReportRequest {
    private Integer userId; // ID of the user reporting the lost item
    private Integer categoryId; // ID of the category for the lost item
    private String itemName; // Name of the lost item
    private String description; // Description of the lost item
    private String location; // Location where the item was lost
    private String dateLostOrFound; // Date when the item was lost (as String)
    private String imageUrl; // URL of the item's image
}