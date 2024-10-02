const baseURI = 'http://localhost:5000/api/v1'
const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
};
export { baseURI, headers }