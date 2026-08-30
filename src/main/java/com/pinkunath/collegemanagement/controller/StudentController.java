package com.pinkunath.collegemanagement.controller;

import com.pinkunath.collegemanagement.dto.request.StudentRequestDTO;
import com.pinkunath.collegemanagement.dto.response.StudentResponseDTO;
import com.pinkunath.collegemanagement.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")
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

    @PostMapping("/student")
    public ResponseEntity<String> addStudent(@RequestBody StudentRequestDTO studentRequestDTO){
        studentService.addStudents(studentRequestDTO);
        return ResponseEntity.ok("Student added successfully");
    }
}
