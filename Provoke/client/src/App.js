import React, { useState }  from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import NavBar from "./Components/nav/NavBar";
import ApplicationViews from "./Components/views/ApplicationViews";
import { useEffect } from 'react';
import Authorize from './Components/views/Authorized';

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(true);


  
  useEffect(()=>{  
    if(!localStorage.getItem("user")){
      setIsLoggedIn(false)
      
    }
  },[isLoggedIn])

  return (
    <Router>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        { isLoggedIn ?
        <ApplicationViews  />
        :
        <Authorize setIsLoggedIn={setIsLoggedIn}/>
        }
    </Router>
  );
}

export default App;
