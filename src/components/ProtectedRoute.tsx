import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../services/authService";

interface ProtectedRouteProps {
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const token = getToken();

    return token ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;