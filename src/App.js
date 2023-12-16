import './App.scss'
import Login from './components/Login/Login';
import Nav from './components/Navigation/Nav';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Register from './components/Register/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Users from './components/Users/Users';
import { useEffect, useState } from 'react';
function App() {
  const [account, setAccount] = useState({});
  useEffect(() => {
    const session = sessionStorage.getItem('account');
    if (session) {
      setAccount(JSON.parse(session))
    }
  }, [])
  return (
    <BrowserRouter>
      <div className="App">
        {Object.keys(account).length > 0 && <Nav />}
        <Routes>
          <Route path='/create-user' element={'create'} />
          <Route path='/update-user' element={'edit'} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/manage-users' element={<Users />} />
          <Route path='/' element={'hello'} exact />
          <Route path='*' element={'404 not found'} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
