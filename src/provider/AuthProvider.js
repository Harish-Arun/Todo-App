import { createContext, useContext,useState } from "react";

const AuthContext=createContext();

const AuthProvider=({children})=>{
    const [user,setUser]=useState("");
    const login=(msg)=>{
        setUser(msg)
    }

    const logout=()=>{
        setUser("")
    }

    return (
        <AuthContext.Provider value={{ user , login , logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext= ()=> useContext(AuthContext);

export default AuthProvider;