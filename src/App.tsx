import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.scss';
import { useAppDispatch } from './config/store';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/Signup';
import { getAccount } from './reducers/authentication';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAccount());
  }, []);

  
  return (
    <div className="App">
      <ToastContainer
        position={toast.POSITION.TOP_LEFT}
        className="toastify-container"
        toastClassName="toastify-toast"
        style={{ "zIndex": "100001"}}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
