import {getDepartments} from "./api/departmentApi.js";

export function showForm(formId){
    document.getElementById(formId).style.display="block";
}

export function hideForm(formId){
    document.getElementById(formId).style.display="none";
}

export function cancelForm(formId,cancelButtonId,resultTableIdToShow){
    document.getElementById(cancelButtonId)
        .addEventListener("click", ()=>{
            hideForm(formId);
            showTable(resultTableIdToShow);
        });
}

export function resetForm(formId){
    document.getElementById(formId).reset();
}

export function assignValue(id,value){
    document.getElementById(id).value = value;
}

export function showTable(tableId){
    document.getElementById(tableId).style.display="";
}


export function hideTable(tableId){
    document.getElementById(tableId).style.display="none";
}

export function getValue(id){
    return document.getElementById(id).value;
}

export async function createDepartmentSelectionMenu(id){
    let departmentSelectionMenu = document.getElementById(id);
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