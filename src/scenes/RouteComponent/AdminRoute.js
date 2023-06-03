import { Navigate, Route, Routes } from "react-router-dom";
import { service } from "./Service";



//home page


//componenetUser pages 

import NotFoundPage from "../404/404";


//header and footer




import Form from "../form";
import Contacts from "../contacts";
import Bar from "../bar";
import Pie from "../pie";
import Line from "../line";

import Dashboard from "../dashboard";
import Dashboard2 from "../dashboard2";

import Profile from "../profil/index.jsx";
import Calendar from "../calendar/calendar";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import { useState } from "react";
import ExamComponent from "../exam/test";
import UserList from "../team/index.jsx";
import Login from "../../Login";




const AdminRoute = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
   
        <div>
      <Routes>
          <Route>
          <Route path="/" element={ service.isLogged && service.getRole() === 'ROLE_ADMIN' ? (<ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Dashboard />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
              ) : (<NotFoundPage/>)}/>

<Route path="/" element={ service.isLogged && service.getRole() === 'ROLE_ETUDIANT' ? (<ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Dashboard2 />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
              ) : (<NotFoundPage/>)}/>


                <Route path="/profile" element={ service.isLogged && service.getRole() === 'ROLE_ADMIN' ? (<ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Profile />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
              ) : (<NotFoundPage/>)}/> 
                <Route path="/contacts" element={ service.isLogged && service.getRole() === 'ROLE_ADMIN' ? (<ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Contacts />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
              ) : (<NotFoundPage />)}/>


                <Route path="/calendar" element={ service.isLogged && service.getRole() === 'ROLE_ADMIN' ? (<ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Calendar />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
              ) : (<NotFoundPage />)}/>


                <Route path="/form" element={ service.isLogged && service.getRole() === 'ROLE_ADMIN' ? (<ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Form />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
              ) : (<NotFoundPage/>)}/>
<Route path="/exams" element={ service.isLogged && service.getRole() === 'ROLE_ADMIN' ? (<ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <ExamComponent />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
              ) : (<NotFoundPage/>)}/>



                <Route path="/Profile" element={ service.isLogged && service.getRole() === 'ROLE_ETUDIANT' ? (<ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Profile />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
              ) : (<NotFoundPage/>)}/>

<Route path="/Profile" element={ service.isLogged && service.getRole() === 'ROLE_ADMIN' ? (<ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Profile />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
              ) : (<NotFoundPage/>)}/>

<Route path="/Profile" element={ service.isLogged && service.getRole() === 'ROLE_PROF' ? (<ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Profile />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
              ) : (<NotFoundPage/>)}/>
                <Route path="/users" element={ service.isLogged && service.getRole() === 'ROLE_ADMIN' ? ( <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <UserList />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
              ) : (<NotFoundPage/>)}/>

                
        
            
<Route path="/bar" element={ service.isLogged && service.getRole() === 'ROLE_ADMIN' ? (<ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Bar />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
              ) : (<NotFoundPage/>)}/>

<Route path="/pie" element={ service.isLogged && service.getRole() === 'ROLE_ADMIN' ? (<ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Pie />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
              ) : (<NotFoundPage/>)}/>

<Route path="/line" element={ service.isLogged && service.getRole() === 'ROLE_ADMIN' ? (<ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Line />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
              ) : (<NotFoundPage/>)}/>




          </Route>

          <Route path="/404" element={(<ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className="app">
                <Sidebar isSidebar={isSidebar} />
                <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} />
                  <NotFoundPage />
                </main>
              </div>
            </ThemeProvider>
          </ColorModeContext.Provider>
          )} />
          <Route path="/*" element={(<ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className="app">
                <Sidebar isSidebar={isSidebar} />
                <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} />
                  <NotFoundPage />
                </main>
              </div>
            </ThemeProvider>
          </ColorModeContext.Provider>
          )} />

      </Routes>
      </div>

  );
};

export default AdminRoute;
