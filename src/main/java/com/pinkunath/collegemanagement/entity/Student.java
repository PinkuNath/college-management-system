package com.pinkunath.collegemanagement.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "student")
@Getter
@Setter
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int rollNo;
    private String name;
    private int deptID;
    private String contactNo;
    private String email;

    @ManyToOne
    @JoinColumn(name = "deptId")
    private Department department;
}
