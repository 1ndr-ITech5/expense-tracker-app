import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Header/>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    
  )
}

export default App;
