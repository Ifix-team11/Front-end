import api from "../Services/api"
import type {
    RegisterRequest,
    RegisterResponse,
    LoginRequest,
    LoginResponse,
 } from "../Types/auth";


export const register = async (
    data:RegisterRequest):Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>("/api/auth/register", data);
    return response.data;

};

export const login = async (
    data:LoginRequest):Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/api/auth/login",data);
    return response.data;
}

