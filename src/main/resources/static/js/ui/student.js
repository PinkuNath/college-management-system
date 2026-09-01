import {getStudents, addStudent, deleteStudent} from "../api/studentApi.js";
import {showFrom, hideFrom, createDepartmentSelectionMenu} from "../utils.js";

//Global Variables
let students;

//To load students in the Student Table
export async function loadStudents(){
    let studentTableBody = document.getElementById("studentTableBody");
    try{
        let html = "";
        students = await getStudents();
        students.forEach(student => {
            html += `
            <tr>
                <td>${student.rollNo}</td>
                <td>${student.name}</td>
                <td  id="${student.deptId}">${student.deptName}</td>
                <td>${student.contactNo}</td>
                <td>${student.email}</td>
                <td>
                    <button value="${student.id}" class="delete-btn">Delete</button>
                </td>
                <td>
                    <button class="edit-btn">Edit</button>
                </td>   
            `
        });
        studentTableBody.innerHTML = html;
        attachDeleteListeners();
    }catch (error){
        studentTableBody.innerHTML = error;
    }
}

//To Add new Student
document.getElementById("showAddStudentForm").addEventListener("click", async ()=>{
    showFrom("addStudentForm");
    await createDepartmentSelectionMenu("departmentSelectionMenuToAddDeptForStudent");
    document.getElementById("cancelAddStudent").addEventListener("click", ()=>{
        hideFrom("addStudentForm");
    })
});

document.getElementById("addStudentForm")
    .addEventListener("submit", async (event)=>{
    event.preventDefault();
    try {
        const name = document.getElementById("studentNameToAdd").value;
        const rollNo = document.getElementById("studentRollNoToAdd").value;
        const deptId = document.getElementById("departmentSelectionMenuToAddDeptForStudent").value;
        const contactNo = document.getElementById("studentContactNoToAdd").value;
        const email = document.getElementById("studentEmailToAdd").value;
        const student = {
            rollNo,
            name,
            deptId,
            contactNo,
            email
        }
        await addStudent(student);
        hideFrom("addStudentForm");
        await loadStudents();
    }catch (error){
        console.log(error);
    }
})

//To Delete a student
function attachDeleteListeners(){
    document.querySelectorAll(".delete-btn")
        .forEach(button => {
            button.addEventListener("click", async ()=>{
                try {
                    const id = button.value;
                    await deleteStudent(id);
                    await loadStudents();
                }
                catch (error){
                    console.log(error);
                }
            });
        });
}

//To Edit a Student Details
