package com.foundly.app2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.foundly.app2.dto.FoundItemReportRequest;
import com.foundly.app2.dto.LostItemReportRequest;
import com.foundly.app2.entity.Category;
import com.foundly.app2.entity.ItemReports;
import com.foundly.app2.entity.User;
import com.foundly.app2.service.CategoryService;
import com.foundly.app2.service.ItemReportsService;
import com.foundly.app2.service.UserService;

@RestController
@RequestMapping("/api/items")
public class ItemReportsController {

    @Autowired
    private ItemReportsService itemReportsService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    // Get all item reports
    @GetMapping
    public ResponseEntity<List<ItemReports>> getAllItemReports() {
        List<ItemReports> itemReports = itemReportsService.getAllItemReports();
        return new ResponseEntity<>(itemReports, HttpStatus.OK);
    }

    // Get an item report by ID
    @GetMapping("/{id}")
    public ResponseEntity<ItemReports> getItemReportById(@PathVariable Integer id) {
        return itemReportsService.getItemReportById(id)
                .map(itemReport -> new ResponseEntity<>(itemReport, HttpStatus.OK))
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

    // Filter item reports
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
}