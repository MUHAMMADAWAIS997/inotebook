import { useState } from "react";
import AuthContext from "./authContext";

export default function AuthState(props) {
    const [token, setToken] = useState(null)
    const login=(tokenvalue)=>{
        localStorage.setItem('token',tokenvalue)
        setToken(tokenvalue)
    }
    const logout=()=>{
        localStorage.removeItem('token')
        setToken(null)
    }
    const isAuthenticated = !!token

    return (
        <AuthContext.Provider value={{login,logout,token,isAuthenticated}}>
            {props.children}
        </AuthContext.Provider>
    );
}
