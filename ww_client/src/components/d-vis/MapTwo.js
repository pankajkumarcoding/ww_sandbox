import React, { Component } from 'react';
import DoMaptwo from "../../charts/do-maptwo";

class MapTwo extends Component {

    componentDidMount () {
        new DoMaptwo().makemap();

    }

    

    render() {
        return (
           <div id="map-container"></div>
        );
    }

}

export default MapTwo;