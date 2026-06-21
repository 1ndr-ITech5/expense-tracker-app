import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import Dashboard from './dashboard/Dashboard.jsx';
import Register from './entry/Register.jsx';
import Login from './entry/Login.jsx';
import Header from './layout/Header.jsx';
import AddExpense from './dashboard/AddExpense.jsx';
import ProtectedLayout from './utils/ProtectedLayout.jsx';
import Profile from './dashboard/Profile.jsx';

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