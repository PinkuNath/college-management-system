import {getDepartments} from "./api/departmentApi.js";

export function showElement(elementId){
    document.getElementById(elementId).style.display="block";
}

export function hideElement(elementId){
    document.getElementById(elementId).style.display="none";
}

export function showTable(tableId){
    document.getElementById(tableId).style.display="table";
}

export function hideTable(tableId){
    document.getElementById(tableId).style.display="none";
}

export function cancelForm(formId,cancelButtonId,resultTableIdToShow){
    document.getElementById(cancelButtonId)
        .addEventListener("click", ()=>{
            hideElement(formId);
            showTable(resultTableIdToShow);
        });
}

export function resetForm(formId){
    document.getElementById(formId).reset();
    document.querySelectorAll(".error-message")
        .forEach(errorMessage=>
            errorMessage.textContent = ""
        );
}

export function setValue(id,value){
    document.getElementById(id).value = value;
}

export function getValue(id){
    return document.getElementById(id).value;
}

export async function createDepartmentSelectionMenu(id){
    let departmentSelectionMenu = document.getElementById(id);
    try {
        let html = `<option value="">Choose any one</option>`;
        console.log(html);
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