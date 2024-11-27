"use client";
import { getCurrentUserRequest } from "@/requests/auth";
import { User } from "@prisma/client";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { createContext, PropsWithChildren, useMemo } from "react";

type UserContextType = {
  user: User | null;
  refetchUser: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<User | null>>;
  loadingUser: boolean;
  isAuth: boolean;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const token = getCookie("token");
  const {
    data: user,
    refetch: refetchUser,
    isLoading: loadingUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserRequest,
    enabled: !!token,
    initialData: null,
  });

  const isAuth = useMemo(() => {
    if (user) return true;
    return false;
  }, [user]);

  return (
    <UserContext.Provider value={{ user, refetchUser, loadingUser, isAuth }}>
      {children}
    </UserContext.Provider>
  );
};
