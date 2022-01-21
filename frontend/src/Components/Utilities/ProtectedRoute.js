import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/Auth/index';

// middleware for the protected route   rest = all the thinn we want to pass 
const ProtectedRoute = ({ children}) => {

    const { user } = useContext(AuthContext);

    return  user ? children : <Navigate to='/' />
};

export default ProtectedRoute;