import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/AuthContext';

interface PropType {
    component: React.FC;
}

const PublicRoute: FC<PropType> = ({ component: Component }) => {
    const user = useAuthContext();

    if (user) return <Navigate to="/members"/>;
    return <Component />;
};

export default PublicRoute;