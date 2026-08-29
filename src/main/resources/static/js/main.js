import {loadStudents} from "./ui/student.js";

window.addEventListener("load", async ()=>{
    console.log("Loading")
    await loadStudents();
    console.log("loaded")
})