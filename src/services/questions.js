export const getAllQuestions = async () => {
    const res = await fetch("http://localhost:8080/questions");
    const data = await res.json();
    return data;
};
