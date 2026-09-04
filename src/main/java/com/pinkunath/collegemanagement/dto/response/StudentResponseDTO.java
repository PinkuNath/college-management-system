package com.pinkunath.collegemanagement.dto.response;

public record StudentResponseDTO(
        Long id,
        Long rollNo,
        String name,
        Long deptId,
        String deptName,
        String contactNo,
        String email
) {
}
