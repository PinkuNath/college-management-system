import {getDepartments} from "./api/departmentApi.js";

export function showFrom(formId){
    document.getElementById(formId).style.display="block";
}
export function hideFrom(formId){
    document.getElementById(formId).style.display="none";
}

export async function createDepartmentSelectionMenu(deptSelectionMenuId){
    let departmentSelectionMenu = document.getElementById(deptSelectionMenuId);
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