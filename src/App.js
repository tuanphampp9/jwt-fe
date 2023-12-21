import './App.scss'
import NavHeader from './components/Navigation/NavHeader';
import {
  BrowserRouter
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import AppRoutes from './routes/AppRoutes';
import { UserContext } from './context/UserContext';
function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
        <div className='app-header'>{user.token && <NavHeader />}</div>
        <div className="App">
          <AppRoutes />
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
    </>
  );
}

export default App;
