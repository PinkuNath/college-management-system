package com.pinkunath.collegemanagement.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "student")
@Getter
@Setter
@NoArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int rollNo;
    private String name;
    private int deptId;
    private String contactNo;
    private String email;

    public Student(int rollNo, String name, int deptId, String contactNo, String email){
        this.rollNo = rollNo;
        this.name = name;
        this.deptId = deptId;
        this.contactNo = contactNo;
        this.email = email;
    }

//    @ManyToOne
//    @JoinColumn(name = "deptId")
//    private Department department;
}
