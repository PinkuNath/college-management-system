import {
    getStudents,
    addStudent,
    deleteStudent,
    updateStudent
} from "../api/studentApi.js";

import {
    showForm,
    hideForm,
    cancelForm,
    assignValue,
    getValue,
    createDepartmentSelectionMenu,
    resetForm, showTable, hideTable
} from "../utils.js";

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
                    <button value="${student.id}" class="edit-btn">Edit</button>
                </td>   
            `
        });
        studentTableBody.innerHTML = html;
        attachDeleteListeners();
        attachUpdateListeners();
    }catch (error){
        studentTableBody.innerHTML = error;
    }
}

//To Add new Student
document.getElementById("showAddStudentForm")
    .addEventListener("click", async ()=>{
        hideTable("studentTable");
        showForm("addStudentForm");
        await createDepartmentSelectionMenu("departmentSelectionMenuToAddDeptForStudent");
        cancelForm("addStudentForm","cancelAddStudentBtn", "studentTable");
        resetForm("addStudentForm");
});

document.getElementById("addStudentForm")
    .addEventListener("submit", async (event)=>{
    event.preventDefault();
    try {
        const name = getValue("studentNameToAdd")
        const rollNo = getValue("studentRollNoToAdd")
        const deptId = getValue("departmentSelectionMenuToAddDeptForStudent")
        const contactNo = getValue("studentContactNoToAdd")
        const email = getValue("studentEmailToAdd")
        const student = {
            rollNo,
            name,
            deptId,
            contactNo,
            email
        }
        await addStudent(student);
        hideForm("addStudentForm");
        showTable("studentTable");
        resetForm("addStudentForm");
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

//To Update Student Details
function attachUpdateListeners(){
    document.querySelectorAll(".edit-btn")
        .forEach(button=>{
            button.addEventListener("click", async ()=>{
                hideTable("studentTable");
                cancelForm("updateStudentForm", "cancelUpdateStudentBtn", "studentTable");
                const id = Number(button.value);
                const student = students.find(student => student.id === id);
                showForm("updateStudentForm");
                await createDepartmentSelectionMenu("departmentSelectionMenuToUpdateDeptForStudent");
                assignValue("studentNameToUpdate", student.name);
                assignValue("studentRollNoToUpdate", student.rollNo);
                assignValue("departmentSelectionMenuToUpdateDeptForStudent", student.deptId);
                assignValue("studentContactNoToUpdate", student.contactNo);
                assignValue("studentEmailToUpdate", student.email);
                assignValue("UpdateStudentBtn",id);
            });
        });
}

document.getElementById("updateStudentForm")
    .addEventListener("submit", async (event)=>{
        event.preventDefault()
        const id = getValue("UpdateStudentBtn");
        const name = getValue("studentNameToUpdate");
        const rollNo = getValue("studentRollNoToUpdate");
        const deptId = getValue("departmentSelectionMenuToUpdateDeptForStudent");
        const contactNo = getValue("studentContactNoToUpdate");
        const email = getValue("studentEmailToUpdate");
        const updatedStudent = {
            rollNo,
            name,
            deptId,
            contactNo,
            email
        }
        try {
            await updateStudent(id,updatedStudent);
            showTable("studentTable");
            await loadStudents();
            hideForm("updateStudentForm");
            resetForm("updateStudentForm");
        }
        catch (error){
            console.log(error);
        }
    })