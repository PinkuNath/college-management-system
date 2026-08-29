package com.pinkunath.collegemanagement.service;

import com.pinkunath.collegemanagement.dto.response.StudentResponseDTO;
import com.pinkunath.collegemanagement.entity.Department;
import com.pinkunath.collegemanagement.entity.Student;
import com.pinkunath.collegemanagement.repository.DepartmentRepository;
import com.pinkunath.collegemanagement.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final DepartmentRepository departmentRepository;

    public StudentService(StudentRepository studentRepository, DepartmentRepository departmentRepository){
        this.studentRepository = studentRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<StudentResponseDTO> getStudents(){
        List<Student> students = studentRepository.findAll();
        List<StudentResponseDTO> studentResponseDTOList = new ArrayList<>();
        List<Department> departments = departmentRepository.findAll();
        Map<Integer, String> departmentMap = new HashMap<>();
        for (Department department : departments){
            departmentMap.put(department.getId(),department.getName());
        }
        for(Student student : students){
            int studentId = student.getId();
            studentResponseDTOList.add(new StudentResponseDTO(
                    studentId,
                    student.getRollNo(),
                    student.getName(),
                    student.getDeptId(),
                    departmentMap.get(studentId),
                    student.getContactNo(),
                    student.getEmail()
            ));
        }
        return studentResponseDTOList;
    }
}
