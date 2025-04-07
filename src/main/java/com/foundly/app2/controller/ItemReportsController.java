package com.foundly.app2.controller;

import com.foundly.app2.dto.FoundItemReportRequest;
import com.foundly.app2.dto.LostItemReportRequest;
import com.foundly.app2.entity.ItemReports;
import com.foundly.app2.service.ItemReportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/items")
public class ItemReportsController {

    @Autowired
    private ItemReportsService itemReportsService;

    // Get all item reports
    @GetMapping
    public ResponseEntity<List<ItemReports>> getAllItemReports() {
        List<ItemReports> itemReports = itemReportsService.getAllItemReports();
        return new ResponseEntity<>(itemReports, HttpStatus.OK);
    }

    // Get item report by ID
    @GetMapping("/{id}")
    public ResponseEntity<ItemReports> getItemReportById(@PathVariable Integer id) {
        Optional<ItemReports> itemReport = itemReportsService.getItemReportById(id);
        return itemReport.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    

    // Report a found item
    @PostMapping("/found")
    public ResponseEntity<ItemReports> reportFoundItem(@RequestBody FoundItemReportRequest request) {
        ItemReports createdItemReport = itemReportsService.reportFoundItem(request);
        return new ResponseEntity<>(createdItemReport, HttpStatus.CREATED);
    }

    // Report a lost item
    @PostMapping("/lost")
    public ResponseEntity<ItemReports> reportLostItem(@RequestBody LostItemReportRequest request) {
        ItemReports createdItemReport = itemReportsService.reportLostItem(request);
        return new ResponseEntity<>(createdItemReport, HttpStatus.CREATED);
    }

    // Update an existing item report
    @PutMapping("/{id}")
    public ResponseEntity<ItemReports> updateItemReport(@PathVariable Integer id, @RequestBody ItemReports itemReports) {
        Optional<ItemReports> existingItemReport = itemReportsService.getItemReportById(id);
        if (existingItemReport.isPresent()) {
            itemReports.setItemId(id);
            ItemReports updatedItemReport = itemReportsService.saveItemReport(itemReports);
            return new ResponseEntity<>(updatedItemReport, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete an item report
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItemReport(@PathVariable Integer id) {
        Optional<ItemReports> existingItemReport = itemReportsService.getItemReportById(id);
        if (existingItemReport.isPresent()) {
            itemReportsService.deleteItemReport(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}