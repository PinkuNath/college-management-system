package com.pinkunath.collegemanagement.controller;

import com.pinkunath.collegemanagement.dto.response.StudentResponseDTO;
import com.pinkunath.collegemanagement.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @GetMapping("/students")
    public ResponseEntity<List<StudentResponseDTO>> getStudent(){
        return ResponseEntity.ok(studentService.getStudents());
    }
}
