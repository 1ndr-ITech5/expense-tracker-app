import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../layout/Navbar';

const ProtectedLayout = () => {
    const user = useSelector((state) => state.user);

    if (!user) return <Navigate to="/login" replace />;

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default ProtectedLayout;
