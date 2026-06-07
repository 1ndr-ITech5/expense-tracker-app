import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import Dashboard from './components/Dashboard.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';
import AddExpense from './components/AddExpense.jsx';
import ProtectedLayout from './components/ProtectedLayout.jsx';
import Profile from './components/Profile.jsx';

const App = () => {
    return (
        <BrowserRouter>
            <div className="container">
                <Header />
                <Routes>
                    {/*Pages without navbar*/}
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/*Pages with navbar*/}
                    <Route element={<ProtectedLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/add-expense" element={<AddExpense />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Routes>
                <ToastContainer/>
            </div>
        </BrowserRouter>
    );
};

export default App;