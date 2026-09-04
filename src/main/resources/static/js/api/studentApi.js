export async function getStudents() {
    const response = await fetch("/students");
    if (!response.ok) {
        throw new Error("Failed to load students.");
    }
    return  await response.json();
}

export async function addStudent(student){
    const response = await fetch("/student",{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(student)
    });
    if(!response.ok){
        throw await response.json();
    }
}

export async function deleteStudent(id){
    const response = await fetch(`/student/${id}`,{
        method: "DELETE"
    });
    if(!response.ok){
        throw new Error("Delete Failed");
    }
}

export async function updateStudent(id, updatedStudent){
    const response = await fetch(`/student/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(updatedStudent)
    });
    if(!response.ok){
        throw new Error("Update Failed");
    }
}