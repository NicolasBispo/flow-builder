"use client";

import { UserContext } from "@/contexts/user-context";
import { loginRequest } from "@/requests/auth";
import { LoginSchema } from "@/schemas/login.schema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function useAuth() {
  const { refetchUser } = useContext(UserContext);
  const { push } = useRouter();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginSchema) => {
      return await loginRequest(data);
    },
    onSuccess: async () => {
      console.log('cheguei aquio')
      await refetchUser();
      await push("/dashboard");

    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return { loginMutation };
}
