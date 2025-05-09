package com.bits.project.controller;

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

import com.bits.project.model.Appointment;
import com.bits.project.service.AppointmentService;

@RestController
@CrossOrigin(origins = "http://localhost:3001/")
@RequestMapping("/api/appointments") // Base URL for appointment APIs
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Create a new appointment
    @PostMapping("/book")
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
        Appointment newAppointment = appointmentService.createAppointment(appointment);
        return ResponseEntity.ok(newAppointment);
    }

    // Get all appointments
    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    // Get a specific appointment by appointmentId
    @GetMapping("/{appointmentId}")
    public ResponseEntity<Appointment> getAppointmentByAppointmentId(@PathVariable String appointmentId) {
        Optional<Appointment> appointment = appointmentService.getAppointmentByAppointmentId(appointmentId);
        return appointment.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update an existing appointment by appointmentId
    @PutMapping("/update/{appointmentId}")
    public ResponseEntity<Appointment> updateAppointmentByAppointmentId(
            @PathVariable String appointmentId, @RequestBody Appointment updatedAppointment) {
        Optional<Appointment> updated = appointmentService.updateAppointmentByAppointmentId(appointmentId, updatedAppointment);
        return updated.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete an appointment by appointmentId
    @DeleteMapping("/remove/{appointmentId}")
    public ResponseEntity<Void> deleteAppointmentByAppointmentId(@PathVariable String appointmentId) {
        boolean isDeleted = appointmentService.deleteAppointmentByAppointmentId(appointmentId);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
