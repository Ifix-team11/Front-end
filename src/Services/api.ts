import axios from "axios"

const api = axios.create({
    baseURL: "https://back-end-git-main-hagers-projects-df0172bd.vercel.app",
    headers:{
        "Content-Type": "application/json",
    },
});

export default api ;