package com.bits.project.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bits.project.user.model.UserDetails;

@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {
    Optional<UserDetails> findByPreferredUsername(String preferredUsername); // Query by PreferredUsername
}
