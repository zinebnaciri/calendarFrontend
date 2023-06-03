import { Navigate } from "react-router-dom";
import { service } from "./Service";


const ProtectedRoute = ({children}) => {

  if(!service.isLogged()){
      return <Navigate to="/"/>
  }
 
  return children
};

export default ProtectedRoute;