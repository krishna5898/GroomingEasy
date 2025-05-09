package com.bits.project.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bits.project.user.model.UserDetails;
import com.bits.project.user.service.UserDetailsService;

@RestController
@CrossOrigin(origins = "http://localhost:3001/")
@RequestMapping("/api/users") // Base URL for user details APIs
public class UserDetailsController {

    @Autowired
    private UserDetailsService userDetailsService;

    // Create a new user
    @PostMapping("/register")
    public ResponseEntity<UserDetails> createUser(@RequestBody UserDetails userDetails) {
        UserDetails newUser = userDetailsService.createUser(userDetails);
        return ResponseEntity.ok(newUser);
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<UserDetails>> getAllUsers() {
        List<UserDetails> users = userDetailsService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Get a user by PreferredUsername
    @GetMapping("/fetch/{preferredUsername}")
    public ResponseEntity<UserDetails> getUserByPreferredUsername(@PathVariable String preferredUsername) {
        return userDetailsService.getUserByPreferredUsername(preferredUsername)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update an existing user
    @PutMapping("/update/{preferredUsername}")
    public ResponseEntity<UserDetails> updateUser(
            @PathVariable String preferredUsername, @RequestBody UserDetails updatedUserDetails) {
        return userDetailsService.updateUser(preferredUsername, updatedUserDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a user by PreferredUsername
    @DeleteMapping("/remove/{preferredUsername}")
    public ResponseEntity<Void> deleteUser(@PathVariable String preferredUsername) {
        boolean isDeleted = userDetailsService.deleteUser(preferredUsername);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
