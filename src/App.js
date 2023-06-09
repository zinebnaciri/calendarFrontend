import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";


import AuthRoute from './scenes/RouteComponent/Route'
import Login from './Login';
import AdminRoute from './scenes/RouteComponent/AdminRoute';
import ProtectedRoute from './scenes/RouteComponent/Route';

function App() {

  return (
    
        
        
        <Routes>
             <Route path='/login' element={<Login />}/>
             <Route path="/*" element={
              <ProtectedRoute>
                 <AdminRoute />
              </ProtectedRoute>
             }/>
        </Routes>
          
         
        );
}

export default App;
