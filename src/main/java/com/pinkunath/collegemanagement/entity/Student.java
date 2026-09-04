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
    private Long id;

    private Long rollNo;
    private String name;
    private Long deptId;
    private String contactNo;
    private String email;

    public Student(Long rollNo, String name, Long deptId, String contactNo, String email){
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
