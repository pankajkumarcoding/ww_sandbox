import React, { Component, useState  } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import {
    BrowserRouter as Router,
    Route, 
    Link, 
    Switch,
    Redirect
  } from "react-router-dom";

import './styles/index.css';

import Scatterplot from './components/Scatterplot';
import Radar from './components/Radar';
import ChloroMap from './components/ChloroMap';
import MapTwo from './components/MapTwo';
import Linegraph from './components/Linegraph';
import Histogram from './components/Histogram';
import Many from './components/Many';
import World from './components/World';
import Dashboard from './components/Dashboard';
import AdvancedScatter from './components/AdvancedScatter';

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

function App() {
    


  return (
    <ApolloProvider client={client}>

        <div>
            <Router>
                <div id="navbar-wrapper">
                    <nav id="sidebar-nav">
                        <ul className="main-ul">
                            <li className="main-li"><Link to="/">Dashboard</Link></li>
                            <li className="main-li"><Link to="/adv-scatter">Adv. Scatter</Link></li>
                            <li className="main-li"> <Link to="/radar">Radar</Link></li>
                            <li className="main-li"> <Link to="/chloro-map">Chloropleth Map</Link></li>
                            <li className="main-li"> <Link to="/linegraph">Line Graph</Link></li>
                            <li className="main-li"><Link to="/usamap">USA Map</Link></li>
                            <li className="main-li"><Link to="/scatterplot">Scatterplot</Link></li>
                            <li className="main-li"><Link to="/histogram">Histogram</Link></li>
                            <li className="main-li"><Link to="/many">Many - Interactive</Link></li>
                            <li className="main-li"><Link to="/world">World</Link></li>
                        </ul>
                    </nav>
                </div>
                <div id="main-content-wrapper">
                    <Switch>
                        <Route exact path="/">
                            <Dashboard />
                        </Route>
                        <Route path="/adv-scatter">
                            <AdvancedScatter />
                        </Route>
                        <Route path="/radar">
                            <Radar />
                        </Route>
                        <Route path="/linegraph">
                            <Linegraph />   
                        </Route>
                        <Route path="/usamap">
                            <MapTwo />
                        </Route>
                        <Route path="/scatterplot">
                            <Scatterplot />
                        </Route>
                        <Route path="/histogram">
                            <Histogram />
                        </Route>
                        <Route path="/many">
                            <Many />
                        </Route>
                        <Route path="/world">
                            <World />
                        </Route>
                        <Route path="/chloro-map">
                            <ChloroMap />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    </ApolloProvider>

  );
}

export default App;