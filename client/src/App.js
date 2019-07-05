import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import photoPage from './components/pages/photosPage';
function App (){
    return(
        <Router>
            <div>
                
                <Route exact path ="/" component={photoPage}/>
            </div>
        </Router>
    )
}

export default App;
