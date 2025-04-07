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
    @JoinColumn(name = "user_id")
    @JsonIgnore // Prevents infinite recursion
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "item_name", nullable = false)
    private String itemName;

    @Column(name = "description")
    private String description;

    @Column(name = "location")
    private String location;

   @Column(name = "date_reported")
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
//    private LocalDateTime dateReported; // Formats date for Swagger
  

   @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
   private LocalDateTime dateReported; // Ensure this is LocalDateTime


    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "handover_to_security")
    private boolean handoverToSecurity; // Add this field

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private Type type;

    @Enumerated(EnumType.STRING)
    @Column(name = "item_status", nullable = false)
    private ItemStatus itemStatus = ItemStatus.NOT_FOUND;

    @Column(name = "security_id")
    private String securityId;

    @Column(name = "security_name")
    private String securityName;

    @Column(name = "pickup_message")
    private String pickupMessage;

    public enum Type {
        LOST, FOUND
    }

    public enum ItemStatus {
        NOT_FOUND, WITH_FINDER, WITH_SECURITY, RECEIVED
    }
}
