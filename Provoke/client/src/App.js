import React, { useState }  from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import NavBar from "./Components/nav/NavBar";
import ApplicationViews from "./Components/views/ApplicationViews";
import { useEffect } from 'react';
import Authorize from './Components/views/Authorized';
// import useLocalStorage from 'use-local-storage'
// import './App.css'

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

  return (
    <Router>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        {/* <button onClick={switchTheme}>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode</button> */}
        { isLoggedIn ?
        <ApplicationViews  />
        :
        <Authorize setIsLoggedIn={setIsLoggedIn}/>
        }
    </Router>
  );
}

export default App;
