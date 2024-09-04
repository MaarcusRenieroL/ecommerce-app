package com.maarcus.backend.controller;

import com.maarcus.backend.model.Category;
import com.maarcus.backend.service.implementation.CategoryServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private final CategoryServiceImplementation categoryService;

    public CategoryController(CategoryServiceImplementation categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping(path = "/all")
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping(path = "/get/{id}")
    public Optional<Category> getCategory(@PathVariable Long id) {
        return categoryService.getCategory(id);
    }

    @PostMapping(path = "/add")
    public Category addCategory(@RequestBody Category category) {
        return categoryService.addCategory(category);
    }

    @PutMapping(path = "/update/{id}")
    public Category updateCategory(@PathVariable Long id, @RequestBody Category category) {
        return categoryService.updateCategory(id, category);
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }
}
