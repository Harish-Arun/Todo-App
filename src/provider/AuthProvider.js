import { createContext, useContext,useState } from "react";

const AuthContext=createContext();

const AuthProvider=({children})=>{
    const [user,setUser]=useState("");

    return (
        <AuthContext.Provider value={{ user , setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext= ()=> useContext(AuthContext);

export default AuthProvider;