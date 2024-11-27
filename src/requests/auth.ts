import apiClient from "@/config/api-client";
import { LoginSchema } from "@/schemas/login.schema";
import { SignupSchema } from "@/schemas/signup.schema";
import { User } from "@prisma/client";

export async function loginRequest(data: LoginSchema) {
  return await apiClient<User>({
    method: "POST",
    url: "/login",
    data: {
      ...data,
    },
  });
}

export async function signupRequest(data: SignupSchema) {
  return await apiClient<User>({
    method: "POST",
    url: "/signup",
    data: {
      ...data,
    },
  });
}

export async function getCurrentUserRequest() {
  const { data } = await apiClient<User>({
    method: "GET",
    url: "/me",
  });
  return data;
}
