import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import MainPage from './components/pages/mainPage'
import photoPage from './components/pages/photosPage';
function App (){
    return(
        <Router>
            <div>
                <Route exact path ="/" component={MainPage}/>
                <Route exact path ="/photo" component={photoPage}/>
            </div>
        </Router>
    )
}

export default App;
