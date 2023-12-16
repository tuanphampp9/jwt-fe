import './App.scss'
import Nav from './components/Navigation/Nav';
import {
  BrowserRouter
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';
function App() {
  const [account, setAccount] = useState({});
  useEffect(() => {
    const session = sessionStorage.getItem('account');
    if (session) {
      setAccount(JSON.parse(session))
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <div className='app-header'>{Object.keys(account).length > 0 && <Nav />}</div>
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
