import {loadStudents} from "./ui/student.js";

window.addEventListener("load", async ()=>{
    await loadStudents();
})