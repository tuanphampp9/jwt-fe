import {
    Route,
    Routes,
} from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/Users/Users";
import PrivateRoutes from "./PrivateRoutes";
const AppRoutes = (props) => {
    return (<>
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route path='/manage-users' element={<Users />} />
                <Route path='/projects' element={'projects'} />
            </Route>
            <Route path='/create-user' element={'create'} />
            <Route path='/update-user' element={'edit'} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/manage-users' element={<Users />} />
            <Route path='/project' element={'project'} />
            <Route path='/' element={'hello'} exact />
            <Route path='*' element={'404 not found'} />
        </Routes>
    </>)
}

export default AppRoutes