import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './components/Dashboard.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';
import Navbar from './components/Navbar.jsx';
import AddExpense from './components/AddExpense.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Header/>
        <Routes element={<Navbar/>}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/add-expense" element={<AddExpense/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    
  )
}

export default App;