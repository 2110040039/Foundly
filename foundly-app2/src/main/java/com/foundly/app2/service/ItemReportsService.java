package com.foundly.app2.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foundly.app2.dto.FoundItemReportRequest;
import com.foundly.app2.dto.LostItemReportRequest;
import com.foundly.app2.entity.ItemReports;
import com.foundly.app2.entity.User;
import com.foundly.app2.entity.Category;
import com.foundly.app2.repository.ItemReportsRepository;

@Service
public class ItemReportsService {

    @Autowired
    private ItemReportsRepository itemReportsRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    // Get all item reports
    public List<ItemReports> getAllItemReports() {
        return itemReportsRepository.findAll();
    }

    // Get an item report by ID
    public Optional<ItemReports> getItemReportById(Integer itemId) {
        return itemReportsRepository.findById(itemId);
    }

    // Report a found item
    public ItemReports reportFoundItem(FoundItemReportRequest request) {
        ItemReports foundItem = new ItemReports();
        foundItem.setItemName(request.getItemName());
        foundItem.setDescription(request.getDescription());
        foundItem.setLocation(request.getLocation());
        foundItem.setImageUrl(request.getImageUrl());
        foundItem.setDateReported(LocalDateTime.now()); // Set the date reported to the current time
        foundItem.setDateLostOrFound(request.getDateLostOrFound()); // Set the date lost or found

        // Fetch the user details based on userId
        Optional<User> userOptional = userService.getUserById(request.getUserId());
        if (userOptional.isPresent()) {
            foundItem.setUser (userOptional.get()); // Set the user object
        } else {
            throw new IllegalArgumentException("User  not found for ID: " + request.getUserId());
        }

        // Fetch the category details based on the categoryId
        Optional<Category> categoryOptional = categoryService.getCategoryById(request.getCategoryId());
        if (categoryOptional.isPresent()) {
            foundItem.setCategory(categoryOptional.get());
        } else {
            throw new IllegalArgumentException("Category not found for ID: " + request.getCategoryId());
        }

        return itemReportsRepository.save(foundItem);
    }

    // Report a lost item
    public ItemReports reportLostItem(LostItemReportRequest request) {
        ItemReports lostItem = new ItemReports();
        lostItem.setItemName(request.getItemName());
        lostItem.setDescription(request.getDescription());
        lostItem.setLocation(request.getLocation());
        lostItem.setImageUrl(request.getImageUrl());
        lostItem.setDateReported(LocalDateTime.now()); // Set the date reported to the current time
        lostItem.setDateLostOrFound(request.getDateLostOrFound()); // Set the date lost

        // Fetch the user details based on userId
        Optional<User> userOptional = userService.getUserById(request.getUserId());
        if (userOptional.isPresent()) {
            lostItem.setUser (userOptional.get()); // Set the user object
        } else {
            throw new IllegalArgumentException("User  not found for ID: " + request.getUserId());
        }

        // Fetch the category details based on the categoryId
        Optional<Category> categoryOptional = categoryService.getCategoryById(request.getCategoryId());
        if (categoryOptional.isPresent()) {
            lostItem.setCategory(categoryOptional.get());
        } else {
            throw new IllegalArgumentException("Category not found for ID: " + request.getCategoryId());
        }

        return itemReportsRepository.save(lostItem);
    }

    // Create or update an item report
    public ItemReports saveItemReport(ItemReports itemReport) {
        return itemReportsRepository.save(itemReport);
    }

    // Delete an item report
    public void deleteItemReport(Integer itemId) {
        itemReportsRepository.deleteById(itemId);
    }

    // Get reports by item status
    public List<ItemReports> getReportsByStatus(ItemReports.ItemStatus itemStatus) {
        return itemReportsRepository.findByItemStatus(itemStatus);
    }
}