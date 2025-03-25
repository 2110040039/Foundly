package com.foundly.app.controller;

import java.net.http.HttpHeaders;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foundly.app.entity.ItemReport;
import com.foundly.app.entity.User;
import com.foundly.app.service.ItemReportService;

import jakarta.annotation.Resource;

@RestController
@RequestMapping("/items")
public class ItemReportController {
    @Autowired
    private ItemReportService itemReportService;

    @PostMapping("/report")
    public ResponseEntity<ItemReport> reportItem(@RequestBody ItemReport itemReport) {
        return ResponseEntity.ok(itemReportService.saveItemReport(itemReport));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ItemReport>> getAllItems() {
        return ResponseEntity.ok(itemReportService.getAllItems());
    }
    @GetMapping("/{id}")
    public ResponseEntity<ItemReport> getItemById(@PathVariable Long id) {
        ItemReport item = itemReportService.findById(id);
        return ResponseEntity.ok(item);
    }
    
  
}
