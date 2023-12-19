import React, { useContext, useState } from "react"

const UserContext = React.createContext({ isAuthenticated: false, token: '', token: '' });
const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ isAuthenticated: false, token: '', token: '' });

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