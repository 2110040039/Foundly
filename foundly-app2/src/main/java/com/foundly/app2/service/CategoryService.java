package com.foundly.app2.service;

import com.foundly.app2.entity.Category;
import com.foundly.app2.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    

    // Get all categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Get a category by ID
    public Optional<Category> getCategoryById(Integer categoryId) {
        return categoryRepository.findById(categoryId);
    }
    

    public Optional<Category> findById(Integer id) {
        return categoryRepository.findById(id);
    }
    // Create or update a category
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Delete a category
    public void deleteCategory(Integer categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}
