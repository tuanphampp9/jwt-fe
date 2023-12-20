import React, { useEffect, useState } from "react"
import { getMe } from "../services/userService";
const UserContext = React.createContext({ isAuthenticated: false, token: '', isLoading: true });
const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ isAuthenticated: false, token: '', isLoading: true });
    useEffect(() => {
        fetchAccount();
    }, [])

    const fetchAccount = async () => {
        try {
            const res = await getMe();
            if (res && res.data.EC === 0) {
                setUser({ isAuthenticated: true, token: res.data.DT.access_token, isLoading: false })
            }
        } catch (error) {
            if (error && error.response?.data.EC === -1) {
                setUser({ isAuthenticated: false, token: '', isLoading: false })
            }
        }

    }
    const login = (infoUser) => {
        setUser(infoUser)
    }

    const logout = (name) => {
        setUser((user) => ({
            name: '',
            auth: false
        }))
    }
    return <UserContext.Provider value={{ user, login, logout }}>
        {children}
    </UserContext.Provider>
}

export { UserProvider, UserContext }