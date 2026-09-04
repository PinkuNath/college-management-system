package com.pinkunath.collegemanagement.service;

import com.pinkunath.collegemanagement.dto.request.StudentRequestDTO;
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
        Map<Long, String> departmentMap = new HashMap<>();
        for (Department department : departments){
            departmentMap.put(department.getId(),department.getName());
        }
        for(Student student : students){
            Long studentId = student.getId();
            Long deptId = student.getDeptId();
            studentResponseDTOList.add(new StudentResponseDTO(
                    studentId,
                    student.getRollNo(),
                    student.getName(),
                    student.getDeptId(),
                    departmentMap.get(deptId),
                    student.getContactNo(),
                    student.getEmail()
            ));
        }
        return studentResponseDTOList;
    }

    public void addStudents(StudentRequestDTO studentRequestDTO){
        studentRepository.save(new Student(
                studentRequestDTO.rollNo(),
                studentRequestDTO.name(),
                studentRequestDTO.deptId(),
                studentRequestDTO.contactNo(),
                studentRequestDTO.email()
        ));
    }

    public void deleteStudent(Long id){
        studentRepository.deleteById(id);
    }

    public void updateStudent(Long id, StudentRequestDTO studentRequestDTO){
        Student student = studentRepository.findById(id).orElseThrow();
        student.setRollNo(studentRequestDTO.rollNo());
        student.setName(studentRequestDTO.name());
        student.setDeptId(studentRequestDTO.deptId());
        student.setContactNo(studentRequestDTO.contactNo());
        student.setEmail(studentRequestDTO.email());
        studentRepository.save(student);
    }
}
