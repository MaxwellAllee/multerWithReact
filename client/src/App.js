import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import photoPage from './components/pages/photosPage';
import NavBar from './components/Utils/NavBar'
import slideShow from './components/pages/slideShow'
function App() {
    return (
        <Router>
            <div>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={slideShow} />
                    <Route exact path="/setup" component={photoPage} />
                </Switch>
            </div>
        </Router>
    )
}

export default App;
