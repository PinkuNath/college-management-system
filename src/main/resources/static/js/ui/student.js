import {
    getStudents,
    addStudent,
    deleteStudent,
    updateStudent
} from "../api/studentApi.js";

import {
    cancelForm,
    setValue,
    getValue,
    createDepartmentSelectionMenu,
    resetForm,
    showTable,
    hideTable,
    showElement,
    hideElement, clearErrors
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
        resetForm("addStudentForm");
        hideTable("studentTable");
        showElement("addStudentForm");
        await createDepartmentSelectionMenu("departmentSelectionMenuToAddDeptForStudent");
});

cancelForm(
    "addStudentForm",
    "cancelAddStudentBtn",
    "studentTable"
);

document.getElementById("addStudentForm")
    .addEventListener("reset", () => {
        clearErrors(
            document.getElementById("studentNameToAddError"),
            document.getElementById("studentRollNoToAddError"),
            document.getElementById("studentDepartmentToAddError"),
            document.getElementById("studentContactNoToAddError"),
            document.getElementById("studentEmailToAddError")
        );
    });

document.getElementById("addStudentForm")
    .addEventListener("submit", async (event)=>{
    event.preventDefault();
    let nameError = document.getElementById("studentNameToAddError");
    let rollNoError = document.getElementById("studentRollNoToAddError");
    let deptError = document.getElementById("studentDepartmentToAddError");
    let contactNoError = document.getElementById("studentContactNoToAddError");
    let emailError = document.getElementById("studentEmailToAddError");
    try {
        clearErrors(
            nameError,
            rollNoError,
            deptError,
            contactNoError,
            emailError
        );
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
        hideElement("addStudentForm");
        showTable("studentTable");
        await loadStudents();
        resetForm("addStudentForm");
    }catch (errors){
        nameError.textContent = errors.name || "";
        rollNoError.textContent = errors.rollNo || "";
        deptError.textContent = errors.deptId || "";
        contactNoError.textContent = errors.contactNo || "";
        emailError.textContent = errors.email || "";
    }
});

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
                const id = Number(button.value);
                const student = students.find(student => student.id === id);
                showElement("updateStudentForm");
                await createDepartmentSelectionMenu("departmentSelectionMenuToUpdateDeptForStudent");
                setValue("studentNameToUpdate", student.name);
                setValue("studentRollNoToUpdate", student.rollNo);
                setValue("departmentSelectionMenuToUpdateDeptForStudent", student.deptId);
                setValue("studentContactNoToUpdate", student.contactNo);
                setValue("studentEmailToUpdate", student.email);
                setValue("UpdateStudentBtn",id);
            });
        });
}

cancelForm(
    "updateStudentForm",
    "cancelUpdateStudentBtn",
    "studentTable"
);

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
            hideElement("updateStudentForm");
            resetForm("updateStudentForm");
        }
        catch (error){
            console.log(error);
        }
    });