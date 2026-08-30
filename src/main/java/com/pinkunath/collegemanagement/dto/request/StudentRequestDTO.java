package com.pinkunath.collegemanagement.dto.request;

public record StudentRequestDTO(
        int rollNo,
        String name,
        int deptId,
        String contactNo,
        String email
) {
}
