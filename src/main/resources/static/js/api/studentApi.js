export async function getStudents() {
    const response = await fetch("http://localhost:8080/students");
    if (!response.ok) {
        throw new Error("Failed to load students.");
    }
    return  await response.json();
}

export async function addStudent(student){
    const response = await fetch("http://localhost:8080/student",{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(student)
    });
    if(!response.ok){
        throw new Error("Failed to add Student");
    }
}