package com.foundly.app2.service;

import com.foundly.app2.entity.ItemReports;
import com.foundly.app2.repository.ItemReportsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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