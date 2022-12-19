import React, { useState }  from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import NavBar from "./Components/nav/NavBar";
import ApplicationViews from "./Components/views/ApplicationViews";
import { useEffect } from 'react';
import Authorize from './Components/views/Authorized';
// import useLocalStorage from 'use-local-storage'
// import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from 'reactstrap';

function App() {

  // const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const [ isLoggedIn, setIsLoggedIn ] = useState(true);

  // const switchTheme = () => {
  //   const newTheme = theme === 'light' ? 'dark' : 'light';
  //   setTheme(newTheme);
  // }
  
  useEffect(()=>{  
    if(!localStorage.getItem("user")){
      setIsLoggedIn(false)
      
    }
  },[isLoggedIn])

  //do i need to pass down isLoggedIn/setIsLoggedIn all the way down to Tutorial Views so I can refresh state? Would that talk back upward to ApplicationViews?
  return (
    <Router>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        {/* <button onClick={switchTheme}>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode</button> */}
        { isLoggedIn ?
        <>
        <ApplicationViews  />
        <ToastContainer style={{ fontSize: "30px", height: "200px" }} />
        </>
        :
        <Authorize setIsLoggedIn={setIsLoggedIn}/>
        }
    </Router>
  );
}

export default App;
