package com.foundly.app2.controller;

import com.foundly.app2.entity.ItemReports;
import com.foundly.app2.entity.Category;
import com.foundly.app2.entity.User;
import com.foundly.app2.service.ItemReportsService;
import com.foundly.app2.service.CategoryService; // Import the CategoryService
import com.foundly.app2.service.UserService; // Import the UserService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import com.foundly.app2.dto.FoundItemReportRequest;
import com.foundly.app2.dto.LostItemReportRequest;

@RestController
@RequestMapping("/api/items")
public class ItemReportsController {

    @Autowired
    private ItemReportsService itemReportsService;

    @Autowired
    private CategoryService categoryService; // Inject CategoryService

    @Autowired
    private UserService userService; // Inject UserService

    // Get all item reports
    @GetMapping
    public ResponseEntity<List<ItemReports>> getAllItemReports() {
        List<ItemReports> itemReports = itemReportsService.getAllItemReports();
        return new ResponseEntity<>(itemReports, HttpStatus.OK);
    }

   
    @GetMapping("/filter")
    public ResponseEntity<List<ItemReports>> filterItems(
            @RequestParam(required = false) Integer id,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) ItemReports.ItemStatus itemStatus,
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) Integer userId,
            @RequestParam(required = false) ItemReports.Type type) {

        // Fetch Category and User objects based on IDs only if they are not null
        Category category = (categoryId != null) ? categoryService.findById(categoryId).orElse(null) : null;
        User user = (userId != null) ? userService.findById(userId).orElse(null) : null;

        List<ItemReports> filteredItems = itemReportsService.filterItems(id, location, itemStatus, category, user, type);
        return new ResponseEntity<>(filteredItems, HttpStatus.OK);
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