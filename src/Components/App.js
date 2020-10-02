import React from 'react';
import './App.css';
import {Header} from "./Header/Header";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {FirstPage} from "./FirstPage/FirstPage";
import {SecondPage} from "./SecondPage/SecondPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <Switch>
                    <Route exact path="/" component={FirstPage}/>
                    <Route path="/second" component={SecondPage}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
