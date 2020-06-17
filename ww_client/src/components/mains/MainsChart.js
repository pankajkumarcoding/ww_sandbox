import React, { Component, useState  } from 'react';
import {
    BrowserRouter as Router,
    Route, 
    Link, 
    Switch,
    Redirect
  } from "react-router-dom";
import Scatterplot from '../../components/d-vis/Scatterplot';
import Radar from '../../components/d-vis/Radar';
import ChloroMap from '../../components/d-vis/ChloroMap';
import MapTwo from '../../components/d-vis/MapTwo';
import Linegraph from '../../components/d-vis/Linegraph';
import Histogram from '../../components/d-vis/Histogram';
import Many from '../../components/d-vis/Many';
import World from '../../components/d-vis/World';
import Dashboard from '../../components/d-vis/Dashboard';
import AdvancedScatter from '../../components/d-vis/AdvancedScatter';

/**
 * Index of Charts located at /chart
 */
class MainsChart extends Component {

    render () {

        return (
            <div>
                <Router>

                    <Route path="/chart">
                        <div id="navbar-wrapper">
                            <nav id="sidebar-nav">
                                <ul className="main-ul">
                                    <li className="main-li"><Link to="/chart">Dashboard</Link></li>
                                    <li className="main-li"><Link to="/chart/adv-scatter">Adv. Scatter</Link></li>
                                    <li className="main-li"> <Link to="/chart/radar">Radar</Link></li>
                                    <li className="main-li"> <Link to="/chart/chloro-map">Chloropleth Map</Link></li>
                                    <li className="main-li"> <Link to="/chart/linegraph">Line Graph</Link></li>
                                    <li className="main-li"><Link to="/chart/usamap">USA Map</Link></li>
                                    <li className="main-li"><Link to="/chart/scatterplot">Scatterplot</Link></li>
                                    <li className="main-li"><Link to="/chart/histogram">Histogram</Link></li>
                                    <li className="main-li"><Link to="/chart/many">Many - Interactive</Link></li>
                                    <li className="main-li"><Link to="/chart/world">World</Link></li>
                                </ul>
                            </nav>
                        </div>


                        <div id="main-content-wrapper">
                            <Switch>

                                    <Route exact path="/chart">
                                        <Dashboard />
                                    </Route>
                                    <Route path="/chart/adv-scatter">
                                        <AdvancedScatter />
                                    </Route>
                                    <Route path="/chart/radar">
                                        <Radar />
                                    </Route>
                                    <Route path="/chart/linegraph">
                                        <Linegraph />   
                                    </Route>
                                    <Route path="/chart/usamap">
                                        <MapTwo />
                                    </Route>
                                    <Route path="/chart/scatterplot">
                                        <Scatterplot />
                                    </Route>
                                    <Route path="/chart/histogram">
                                        <Histogram />
                                    </Route>
                                    <Route path="/chart/many">
                                        <Many />
                                    </Route>
                                    <Route path="/chart/world">
                                        <World />
                                    </Route>
                                    <Route path="/chart/chloro-map">
                                        <ChloroMap />
                                    </Route>
                            </Switch>
                        </div>
                            </Route>
                </Router>
            </div>
        );
    }
}

export default MainsChart;