package com.pinkunath.collegemanagement.controller;

import com.pinkunath.collegemanagement.dto.response.DepartmentResponseDTO;
import com.pinkunath.collegemanagement.service.DepartmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService){
        this.departmentService = departmentService;
    }

    @GetMapping("/departments")
    public ResponseEntity<List<DepartmentResponseDTO>> getDepartments(){
        return ResponseEntity.ok(departmentService.getDepartments());
    }
}
