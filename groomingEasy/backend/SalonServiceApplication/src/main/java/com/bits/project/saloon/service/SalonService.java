package com.bits.project.saloon.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.bits.project.saloon.model.Salon;
import com.bits.project.saloon.repository.SalonRepository;

@Service
public class SalonService {

    @Autowired
    private SalonRepository salonRepository;

    // Register a new salon
    public Salon registerSalon(Salon salon) {
    	if(!ObjectUtils.isEmpty(salon))
    	{
    		String uuid = UUID.randomUUID().toString();
    		salon.setSalonLoginId(salon.getName().substring(0, 2)+uuid.replace("-", "").substring(0, 5));
    	}
    	
        return salonRepository.save(salon);
    }
    
    public Optional<Salon> getSalonByLoginId(String salonLoginId) {
        return salonRepository.findBySalonLoginId(salonLoginId);
    }
    
    // Update salon details by salonLoginId
    public Salon updateSalonByLoginId(String salonLoginId, Salon updatedSalon) {
        Optional<Salon> existingSalon = salonRepository.findBySalonLoginId(salonLoginId);

        if (existingSalon.isPresent()) {
            Salon salon = existingSalon.get();
            salon.setName(updatedSalon.getName());
            salon.setAddress(updatedSalon.getAddress());
            salon.setOwnerName(updatedSalon.getOwnerName());
            salon.setContactNumber(updatedSalon.getContactNumber());
            salon.setEmailId(updatedSalon.getEmailId());
            salon.setGrievanceEmailId(updatedSalon.getGrievanceEmailId());
            salon.setRegistrationNo(updatedSalon.getRegistrationNo());

            return salonRepository.save(salon);
        } else {
            throw new RuntimeException("Salon with login ID " + salonLoginId + " not found!");
        }
    }

    // Delete salon by salonLoginId
    public void deleteSalonByLoginId(String salonLoginId) {
        Optional<Salon> existingSalon = salonRepository.findBySalonLoginId(salonLoginId);

        if (existingSalon.isPresent()) {
            salonRepository.delete(existingSalon.get());
        } else {
            throw new RuntimeException("Salon with login ID " + salonLoginId + " not found!");
        }
    }

    // Get all salons
    public List<Salon> getAllSalons() {
        return salonRepository.findAll();
    }

    // Get a salon by ID
    public Optional<Salon> getSalonById(Long id) {
        return salonRepository.findById(id);
    }


}
