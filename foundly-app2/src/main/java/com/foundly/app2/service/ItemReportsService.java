package com.foundly.app2.service;

import com.foundly.app2.entity.ItemReports;
import com.foundly.app2.entity.Category;
import com.foundly.app2.entity.User;
import com.foundly.app2.repository.ItemReportsRepository;
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
        // Set properties from request
        foundItem.setItemName(request.getItemName());
        foundItem.setDescription(request.getDescription());
        foundItem.setLocation(request.getLocation());
        foundItem.setImageUrl(request.getImageUrl());
        foundItem.setDateReported(LocalDateTime.now());
        foundItem.setType(ItemReports.Type.FOUND);
        // Additional logic for found item
        return itemReportsRepository.save(foundItem);
    }

    // Report a lost item
    public ItemReports reportLostItem(LostItemReportRequest request) {
        ItemReports lostItem = new ItemReports();
        // Set properties from request
        lostItem.setItemName(request.getItemName());
        lostItem.setDescription(request.getDescription());
        lostItem.setLocation(request.getLocation());
        lostItem.setImageUrl(request.getImageUrl());
        lostItem.setDateReported(LocalDateTime.now());
        lostItem.setType(ItemReports.Type.LOST);
        // Additional logic for lost item
        return itemReportsRepository.save(lostItem);
    }

    // Save or update an item report
    public ItemReports saveItemReport(ItemReports itemReport) {
        return itemReportsRepository.save(itemReport);
    }

    // Delete an item report
    public void deleteItemReport(Integer itemId) {
        itemReportsRepository.deleteById(itemId);
    }
}