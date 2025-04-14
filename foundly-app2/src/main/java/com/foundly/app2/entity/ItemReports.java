package com.foundly.app2.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

@Entity
@Table(name = "item_reports")
@Getter
@Setter
public class ItemReports {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // The user who reported the item

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category; // The category of the item
    
    @Column(name = "reporter_name")
    private String name;


    @Column(name = "item_name", nullable = false)
    private String itemName;

    @Column(name = "description")
    private String description;

    @Column(name = "location")
    private String location;

    @Column(name = "date_reported")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime dateReported; // Date and time when the report is created

    @Column(name = "date_lost_or_found")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime dateLostOrFound; // Date when the item was lost or found

    @Column(name = "image_url", length = 1000000)
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private Type type; // Type of the item (LOST or FOUND)

    @Enumerated(EnumType.STRING)
    @Column(name = "item_status", nullable = false)
    private ItemStatus itemStatus = ItemStatus.NOT_FOUND; // Current status of the item

    @OneToOne(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore // Prevent circular reference during serialization
    private FoundItemDetails foundItemDetails; // Link to found item details

    @Column(name = "is_requested")
    private boolean isRequested; // Flag to indicate if the item has been requested

    public enum Type {
        LOST, FOUND
    }

    public enum ItemStatus {
        NOT_FOUND, WITH_FINDER, WITH_SECURITY, RECEIVED
    }

    public void setIsRequested(boolean requested) {
        this.isRequested = requested; // Assign the value to the field
    }
}