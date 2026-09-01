import {getStudents, addStudent, deleteStudent} from "../api/studentApi.js";
import {createDepartmentSelectionMenu} from "../utils.js";

//To load students in the Student Table
export async function loadStudents(){
    let studentTableBody = document.getElementById("studentTableBody");
    try{
        let html = "";
        const students = await getStudents();
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
    showStudentFrom();
    await createDepartmentSelectionMenu();
    document.getElementById("cancel").addEventListener("click", ()=>{
        hideStudentFrom();
    })
});
const addStudentForm = document.getElementById("addStudentForm");
export function showStudentFrom(){
    addStudentForm.style.display="block";
}
export function hideStudentFrom(){
    addStudentForm.style.display="none";
}
addStudentForm.addEventListener("submit", async (event)=>{
    event.preventDefault();
    try {
        const name = document.getElementById("name").value;
        const rollNo = document.getElementById("rollNo").value;
        const deptId = document.getElementById("departmentSelectionMenu").value;
        const contactNo = document.getElementById("contactNo").value;
        const email = document.getElementById("email").value;
        const student = {
            rollNo,
            name,
            deptId,
            contactNo,
            email
        }
        await addStudent(student);
        hideStudentFrom();
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
