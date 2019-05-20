import React from 'react';
import logo from './logo.svg';
import './App.css';

import LandingPage from './routes/LandingPage';
import DebugRouteBobby from './DebugRouteBobby';
import DebugRouteChase from './DebugRouteChase';

function App() {
    return (
        <div className="App">
            <Route exact path="/" component={LandingPage} />
            <Route exact path="debug-bobby" component={DebugRouteBobby} />
            <Route exact path="debug-chase" component={DebugRouteChase} />
        </div>
    );
}

export default App;
