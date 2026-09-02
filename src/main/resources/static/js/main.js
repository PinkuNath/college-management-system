import {loadStudents} from "./ui/student.js";
import {hideElement, hideTable, showElement, showTable} from "./utils.js";

window.addEventListener("load", async ()=>{
    showElement("homeSection");
});

const manage = document.getElementById("manage");
manage.addEventListener("change", async () => {
   const option = manage.value;
   console.log(option);
   switch (option){
       case "home":
           showElement("homeSection");
           hideTable("studentTable");
           hideElement("addStudentForm");
           hideElement("updateStudentForm");
           break;
       case "student":
           hideElement("homeSection");
           showTable("studentTable");
           await loadStudents();
           break;
       case "department":
           hideElement("homeSection");
           hideTable("studentTable");
           hideElement("addStudentForm");
           hideElement("updateStudentForm");
           break;
       case "professor":
           hideElement("homeSection");
           hideTable("studentTable");
           hideElement("addStudentForm");
           hideElement("updateStudentForm");
           break;
       case "hod":
           hideElement("homeSection");
           hideTable("studentTable");
           hideElement("addStudentForm");
           hideElement("updateStudentForm");
           break;
   }
});

document.getElementById("studentManagement")
    .addEventListener("click", async ()=>{
        hideElement("homeSection");
        showTable("studentTable");
        manage.value="student";
        await loadStudents();
    });

document.getElementById("departmentManagement")
    .addEventListener("click",()=>{
        hideElement("homeSection");
        hideTable("studentTable");
        hideElement("addStudentForm");
        hideElement("updateStudentForm");
        manage.value="department";
    });

document.getElementById("professorManagement")
    .addEventListener("click", ()=>{
        hideElement("homeSection");
        hideTable("studentTable");
        hideElement("addStudentForm");
        hideElement("updateStudentForm");
        manage.value="professor";
    });

document.getElementById("hodManagement")
    .addEventListener("click", ()=>{
        hideElement("homeSection");
        hideTable("studentTable");
        hideElement("addStudentForm");
        hideElement("updateStudentForm");
        manage.value="hod";
    })
