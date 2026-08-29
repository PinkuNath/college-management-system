import {getStudents} from "../api/studentApi.js";

let studentTableBody = document.getElementById("studentTableBody");

export async function loadStudents(){
    try{
        let html = "";
        const students = await getStudents();
        students.forEach(student => {
            html += `
            <tr id="${student.id}">
                <td>${student.rollNo}</td>
                <td>${student.name}</td>
                <td  id="${student.deptId}">${student.deptName}</td>
                <td>${student.contactNo}</td>
                <td>${student.email}</td>
                <td>
                    <button class="delete-btn">Delete</button>
                </td>
                <td>
                    <button class="edit-btn">Edit</button>
                </td>   
            `
            studentTableBody.innerHTML = html;
        })
    }catch (error){
        studentTableBody.innerHTML = error;
    }
}