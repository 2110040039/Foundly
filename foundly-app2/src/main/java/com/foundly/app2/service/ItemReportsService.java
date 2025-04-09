package com.foundly.app2.service;

import com.foundly.app2.entity.ItemReports;
import com.foundly.app2.entity.Category;
import com.foundly.app2.entity.User;
import com.foundly.app2.repository.ItemReportsRepository;
import com.foundly.app2.repository.UserRepository;
import com.foundly.app2.repository.CategoryRepository;
import com.foundly.app2.dto.FoundItemReportRequest;
import com.foundly.app2.dto.LostItemReportRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ItemReportsService {

    @Autowired
    private ItemReportsRepository itemReportsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // Get all item reports
    public List<ItemReports> getAllItemReports() {
        return itemReportsRepository.findAll();
    }

    // Get an item report by ID
    public Optional<ItemReports> getItemReportById(Integer itemId) {
        return itemReportsRepository.findById(itemId);
    }

    // Filter item reports based on various criteria
    public List<ItemReports> filterItems(Integer id, String location, ItemReports.ItemStatus itemStatus, Category category, User user, ItemReports.Type type) {
        return itemReportsRepository.findByFilters(id, location, itemStatus, category, user, type);
    }

    // Report a found item
    public ItemReports reportFoundItem(FoundItemReportRequest request) {
        ItemReports foundItem = new ItemReports();
        foundItem.setItemName(request.getItemName());
        foundItem.setDescription(request.getDescription());
        foundItem.setLocation(request.getLocation());
        foundItem.setImageUrl(request.getImageUrl());
        foundItem.setDateReported(LocalDateTime.now());
        foundItem.setType(ItemReports.Type.FOUND);
        if (request.isHandoverToSecurity()) {
            foundItem.setItemStatus(ItemReports.ItemStatus.WITH_SECURITY); // Set status to WITH_SECURITY
        } else {
            foundItem.setItemStatus(ItemReports.ItemStatus.WITH_FINDER); // Set status to WITH_FINDER
        }
        foundItem.setIsRequested(false); // Initially not requested

        // Set User
        if (request.getUserId() != null) {
            Optional<User> userOptional = userRepository.findById(request.getUserId());
            userOptional.ifPresent(foundItem::setUser );
        }

        // Set Category
        if (request.getCategoryId() != null) {
            Optional<Category> categoryOptional = categoryRepository.findById(request.getCategoryId());
            if (categoryOptional.isPresent()) {
                foundItem.setCategory(categoryOptional.get());
            } else {
                throw new RuntimeException("Category not found for ID: " + request.getCategoryId());
            }
        } else {
            throw new RuntimeException("Category ID must be provided.");
        }

        // Set dateLostOrFound if applicable
        if (request.getDateLostOrFound() != null) {
            foundItem.setDateLostOrFound(LocalDateTime.parse(request.getDateLostOrFound()));
        }

        // Save the found item report
        return itemReportsRepository.save(foundItem);
    }

    public ItemReports reportLostItem(LostItemReportRequest request) {
        ItemReports lostItem = new ItemReports();
        lostItem.setItemName(request.getItemName());
        lostItem.setDescription(request.getDescription());
        lostItem.setLocation(request.getLocation());
        lostItem.setImageUrl(request.getImageUrl());
        lostItem.setDateReported(LocalDateTime.now()); // Set the date when the report is created
        lostItem.setType(ItemReports.Type.LOST);
        lostItem.setItemStatus(ItemReports.ItemStatus.NOT_FOUND);
        lostItem.setIsRequested(false); // Initially not requested

        // Set User
        if (request.getUserId() != null) {
            Optional<User> userOptional = userRepository.findById(request.getUserId());
            userOptional.ifPresent(lostItem::setUser );
        }

        // Set Category
        if (request.getCategoryId() != null) {
            Optional<Category> categoryOptional = categoryRepository.findById(request.getCategoryId());
            categoryOptional.ifPresent(lostItem::setCategory);
        }

        // Set dateLostOrFound from the request
        if (request.getDateLostOrFound() != null) {
            lostItem.setDateLostOrFound(LocalDateTime.parse(request.getDateLostOrFound()));
        } else {
            // Handle the case where dateLostOrFound is not provided
            throw new IllegalArgumentException("Date lost or found must be provided.");
        }

        // Save the lost item report
        return itemReportsRepository.save(lostItem);
    }
    // Additional methods for handling item reports can be added here
}