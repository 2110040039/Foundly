package com.foundly.app2.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foundly.app2.dto.FoundItemReportRequest;
import com.foundly.app2.dto.LostItemReportRequest;
import com.foundly.app2.entity.ItemReports;
import com.foundly.app2.entity.Category;
import com.foundly.app2.repository.ItemReportsRepository;

@Service
public class ItemReportsService {

    @Autowired
    private ItemReportsRepository itemReportsRepository;
    @Autowired
    private CategoryService categoryService;
    
    // Get all item reports
    public List<ItemReports> getAllItemReports() {
        return itemReportsRepository.findAll();
    }

    // Get an item report by ID
    public Optional<ItemReports> getItemReportById(Integer itemId) {
        return itemReportsRepository.findById(itemId);
    }

    public ItemReports reportLostItem(LostItemReportRequest request) {
        ItemReports lostItem = new ItemReports();
        lostItem.setItemName(request.getItemName());
        lostItem.setDescription(request.getDescription());
        lostItem.setLocation(request.getLocation());
        lostItem.setImageUrl(request.getImageUrl());
        lostItem.setType(ItemReports.Type.LOST);
        lostItem.setDateReported(LocalDateTime.now());

        // Set the category
        Optional<Category> categoryOptional = categoryService.getCategoryById(request.getCategoryId());
        if (categoryOptional.isPresent()) {
            lostItem.setCategory(categoryOptional.get());
        } else {
            // Handle the case where the category is not found
            throw new IllegalArgumentException("Category not found for ID: " + request.getCategoryId());
        }

        return itemReportsRepository.save(lostItem);
    }
    public ItemReports reportFoundItem(FoundItemReportRequest request) {
        ItemReports foundItem = new ItemReports();
        foundItem.setItemName(request.getItemName());
        foundItem.setDescription(request.getDescription());
        foundItem.setLocation(request.getLocation());
        foundItem.setImageUrl(request.getImageUrl());
        foundItem.setType(ItemReports.Type.FOUND);
        foundItem.setDateReported(LocalDateTime.now());

        // Fetch the category details based on the categoryId
        Optional<Category> categoryOptional = categoryService.getCategoryById(request.getCategoryId());
        if (categoryOptional.isPresent()) {
            foundItem.setCategory(categoryOptional.get());
        } else {
            throw new IllegalArgumentException("Category not found for ID: " + request.getCategoryId());
        }

        // Set the handoverToSecurity field
        foundItem.setHandoverToSecurity(request.isHandoverToSecurity());

        // Set security details if handoverToSecurity is true
        if (request.isHandoverToSecurity()) {
            if (request.getSecurityId() == null || request.getSecurityName() == null) {
                throw new IllegalArgumentException("Security ID and security name are required when handing over to security");
            }
            foundItem.setSecurityId(request.getSecurityId());
            foundItem.setSecurityName(request.getSecurityName());
        }

        return itemReportsRepository.save(foundItem);
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