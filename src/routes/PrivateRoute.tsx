import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/AuthContext';

interface PropType {
    component: React.FC;
}

const PrivateRoute: FC<PropType> = ({ component: Component }) => {
    const user  = useAuthContext();

    if (user) return <Component />;
    return <Navigate to='/signin' />;
};

export default PrivateRoute;