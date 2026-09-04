package com.pinkunath.collegemanagement.dto.request;

import jakarta.validation.constraints.*;

public record StudentRequestDTO(
        @NotNull(message = "must be a positive valid roll number")
        @Min(value = 0, message = "roll number must be greater than zero")
        Long rollNo,

        @NotBlank(message = "name cannot be blank")
        String name,

        @NotNull(message = "department must be selected")
        Long deptId,

        @Pattern(
                regexp = "^$|^\\+91 \\d{10}$",
                message = "Contact number must be in format +91 XXXXXXXXXX"
        )
        String contactNo,

        @Email(message = "must be a valid email address")
        String email
) {
}
