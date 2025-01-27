import {useContext} from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

const ProtectedRoute = ({children}) =>{
    const {auth} = useContext(AuthContext);
     if(!auth.token){
        return <Navigate to='/login' />
     }
    return(
        children
    );
}

ProtectedRoute.propTypes = {
    component: PropTypes.elementType.isRequired
};
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ProtectedRoute;

