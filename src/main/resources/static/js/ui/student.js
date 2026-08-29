import {getStudents} from "../api/studentApi.js";

let studentTableBody = document.getElementById("studentTableBody");

export async function loadStudents(){
    try{
        let html = "";
        const students = await getStudents();
        students.forEach(student => {
            html += `
            <tr>
                <td>${student.id}<td>
                <td>${student.rollNo}<td>
                <td id="${student.deptId}">${student.name}<td>
                <td>${student.contactNo}<td>
                <td>${student.email}<td>
                <td>
                    <button>Delete</button>
                </td>
                <td>
                    <button>Edit</button>
                </td>   
            `
            studentTableBody.innerHTML = html;
        })
    }catch (error){
        studentTableBody.innerHTML = error;
    }
}