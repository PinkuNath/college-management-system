export async function getDepartments(){
    const response = await fetch("/departments");
    if(!response.ok){
        throw new Error("Failed to load departments.");
    }
    return await response.json();
}