export async function getDepartments(){
    const response = await fetch("http://localhost:8080/departments");
    if(!response.ok){
        throw new Error("Failed to load departments.");
    }
    return await response.json();
}