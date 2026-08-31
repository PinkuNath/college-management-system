import {getStudents, addStudent} from "../api/studentApi.js";
import {getDepartments} from "../api/departmentApi.js";

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

const addStudentForm = document.getElementById("addStudentForm");

function showStudentFrom(){
    addStudentForm.style.display="block";
}
export function hideStudentFrom(){
    addStudentForm.style.display="none";
}

document.getElementById("showAddStudentForm").addEventListener("click", async ()=>{
    showStudentFrom();
    await createDepartmentSelectionMenu();
});

async function createDepartmentSelectionMenu(){
    let departmentSelectionMenu = document.getElementById("departmentSelectionMenu");
    try {
        let html = "<option>Choose any one</option>";
        const departments = await getDepartments();
        departments.forEach((department)=>{
            html += `
                <option value="${department.id}">${department.name}</option>
            `
        });
        departmentSelectionMenu.innerHTML = html;
    }
    catch (error){
        departmentSelectionMenu.innerHTML = `
            <option>error</option>
        `
    }
    finally {
        document.getElementById("cancel").addEventListener("click", ()=>{
            hideStudentFrom();
        })
    }
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