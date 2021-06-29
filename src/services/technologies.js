export const getAllTechnologies = async () => {
    const res = await fetch("http://localhost:8080/technologies");
    const data = await res.json();
    return data;
};
