const apiUrl = "https://localhost:5001";

export const getAllPlaceholders = () => {
    return fetch(`${apiUrl}/api/Placeholder`)
    .then((res) => res.json())
};