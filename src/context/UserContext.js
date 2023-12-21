import React, { useEffect, useState } from "react"
import { getMe } from "../services/userService";
const UserContext = React.createContext({ isAuthenticated: false, token: '', display_name: '', isLoading: true });
const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ isAuthenticated: false, token: '', display_name: '', isLoading: true });
    useEffect(() => {
        if (window.location.pathname !== '/login') {
            fetchAccount();
        }
    }, [])

    const fetchAccount = async () => {
        try {
            const res = await getMe();
            if (res && res.data.EC === 0) {
                setUser({ isAuthenticated: true, token: res.data.DT.access_token, display_name: res.data.DT.infoUser.display_name, isLoading: false })
            }
        } catch (error) {
            if (error && error.response?.data.EC === -1) {
                setUser({ isAuthenticated: false, token: '', display_name: '', isLoading: false })
            }
        }

    }
    const login = (infoUser) => {
        setUser(infoUser)
    }

    const logout = () => {
        setUser({ isAuthenticated: false, token: '', display_name: '', isLoading: false })
    }
    return <UserContext.Provider value={{ user, login, logout }}>
        {children}
    </UserContext.Provider>
}

export { UserProvider, UserContext }