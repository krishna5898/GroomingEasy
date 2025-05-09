package com.bits.project.saloon.controller;

import java.util.List;
import java.util.Optional;

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

import com.bits.project.saloon.model.Salon;
import com.bits.project.saloon.service.SalonService;

@RestController
@CrossOrigin(origins = "http://localhost:3001/")
@RequestMapping("/api/salons")
public class SalonController {

    @Autowired
    private SalonService salonService;

    // Register a new salon
    @PostMapping("/register")
    public ResponseEntity<Salon> registerSalon(@RequestBody Salon salon) {
        Salon registeredSalon = salonService.registerSalon(salon);
        return ResponseEntity.ok(registeredSalon);
    }

    // Get all salons
    @GetMapping
    public ResponseEntity<List<Salon>> getAllSalons() {
        List<Salon> salons = salonService.getAllSalons();
        return ResponseEntity.ok(salons);
    }

    // Get a salon by ID
    @GetMapping("/{id}")
    public ResponseEntity<Salon> getSalonById(@PathVariable Long id) {
        return salonService.getSalonById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // get a salonLoginId
    @GetMapping("/fetch/{salonLoginId}")
    public ResponseEntity<Salon> getSalonByLoginId(@PathVariable String salonLoginId) {
        Optional<Salon> salon = salonService.getSalonByLoginId(salonLoginId);
        return salon.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }
    
    // Update salon details by salonLoginId
    @PutMapping("/update/{salonLoginId}")
    public ResponseEntity<Salon> updateSalonByLoginId(@PathVariable String salonLoginId, @RequestBody Salon updatedSalon) {
        try {
            Salon salon = salonService.updateSalonByLoginId(salonLoginId, updatedSalon);
            return ResponseEntity.ok(salon);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete salon by salonLoginId
    @DeleteMapping("/remove/{salonLoginId}")
    public ResponseEntity<String> deleteSalonByLoginId(@PathVariable String salonLoginId) {
        try {
            salonService.deleteSalonByLoginId(salonLoginId);
            return ResponseEntity.ok("Deleted");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
