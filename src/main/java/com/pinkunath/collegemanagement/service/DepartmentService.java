package com.pinkunath.collegemanagement.service;

import com.pinkunath.collegemanagement.dto.response.DepartmentResponseDTO;
import com.pinkunath.collegemanagement.entity.Department;
import com.pinkunath.collegemanagement.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DepartmentService {
    private final DepartmentRepository departmentRepository;
    public DepartmentService(DepartmentRepository departmentRepository){
        this.departmentRepository = departmentRepository;
    }
    public List<DepartmentResponseDTO> getDepartments(){
        List<Department> departments = departmentRepository.findAll();
        List<DepartmentResponseDTO> departmentResponseDTOS = new ArrayList<>();
        for (Department department : departments){
            departmentResponseDTOS.add(new DepartmentResponseDTO(
                    department.getId(),
                    department.getName()
                    )
            );
        }
        return departmentResponseDTOS;
    }
}
