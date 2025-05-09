package com.bits.project.user.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bits.project.user.model.UserDetails;
import com.bits.project.user.repository.UserDetailsRepository;

@Service
public class UserDetailsService {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    // Create a new user
    public UserDetails createUser(UserDetails userDetails) {
        return userDetailsRepository.save(userDetails);
    }

    // Get all users
    public List<UserDetails> getAllUsers() {
        return userDetailsRepository.findAll();
    }

    // Get a user by PreferredUsername
    public Optional<UserDetails> getUserByPreferredUsername(String preferredUsername) {
        return userDetailsRepository.findByPreferredUsername(preferredUsername);
    }

    // Update user details by PreferredUsername
    public Optional<UserDetails> updateUser(String preferredUsername, UserDetails updatedUserDetails) {
        return userDetailsRepository.findByPreferredUsername(preferredUsername).map(existingUser -> {
            existingUser.setFirstName(updatedUserDetails.getFirstName());
            existingUser.setLastName(updatedUserDetails.getLastName());
            existingUser.setEmailAddress(updatedUserDetails.getEmailAddress());
            existingUser.setMobileNumber(updatedUserDetails.getMobileNumber());
            existingUser.setAddress(updatedUserDetails.getAddress());
            existingUser.setPincode(updatedUserDetails.getPincode());
            return userDetailsRepository.save(existingUser);
        });
    }

    // Delete a user by PreferredUsername
    public boolean deleteUser(String preferredUsername) {
        Optional<UserDetails> user = userDetailsRepository.findByPreferredUsername(preferredUsername);
        if (user.isPresent()) {
            userDetailsRepository.delete(user.get());
            return true;
        }
        return false;
    }
}
