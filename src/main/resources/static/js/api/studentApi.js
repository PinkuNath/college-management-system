export async function getStudents() {
    const response = await fetch("http://localhost:8080/students");
    if (!response.ok) {
        throw new Error("Failed to load students.");
    }
    return  await response.json();
}