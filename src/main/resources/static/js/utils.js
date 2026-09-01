import {getDepartments} from "./api/departmentApi.js";

export async function createDepartmentSelectionMenu(){
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
}