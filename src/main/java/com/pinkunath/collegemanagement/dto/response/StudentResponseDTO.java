package com.pinkunath.collegemanagement.dto.response;

public record StudentResponseDTO(
        int id,
        int rollNo,
        String name,
        int deptId,
        String deptName,
        String contactNo,
        String email
) {
}
