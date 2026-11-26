import {Outlet, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const PublicRoutes = () => {
    const user = useSelector(state => state.user.user)

    if (user) return <Navigate to="/dashboard" replace/>
    
    return <Outlet />
}

export default PublicRoutes;