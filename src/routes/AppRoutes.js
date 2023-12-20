import {
    Route,
    Routes,
} from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/Users/Users";
import PrivateRoutes from "./PrivateRoutes";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const AppRoutes = (props) => {
    const { user } = useContext(UserContext);
    return (<>
        <Routes>
            {!user.isLoading && <Route element={<PrivateRoutes />}>
                <Route path='/manage-users' element={<Users />} />
                <Route path='/projects' element={'projects'} />
            </Route>}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={'hello'} exact />
            <Route path='*' element={'404 not found'} />
        </Routes>
    </>)
}

export default AppRoutes