'use client'

// import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/token.constants";
// import { useActions } from "@/hooks/useActions";
import { FC, PropsWithChildren } from "react";
// import { usePathname } from "next/navigation";
// import { useUser } from "@/hooks/useSelectors";

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
   // const { user } = useUser()
   // const { checkAuth, getProfile } = useActions();
   // const pathname = usePathname();

   // useEffect(() => {
   //    function getAccessToken(): string | null {
   //       return localStorage.getItem(ACCESS_TOKEN);
   //     }
   //     const accessToken = getAccessToken()
   //    if (accessToken) {
   //       checkAuth();
   //    }
   // }, [checkAuth]);

   // useEffect(() => {
   //    function getAccessToken(): string | null {
   //       return localStorage.getItem(REFRESH_TOKEN);
   //     }
   //     const refreshToken = getAccessToken()
   //    if (!refreshToken && user) {
   //       getProfile();
   //    }
   // }, [getProfile, user, pathname]);

   return <>{children}</>;

};

export default AuthProvider;