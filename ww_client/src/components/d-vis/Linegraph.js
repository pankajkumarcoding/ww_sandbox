import React, { Component } from 'react';
import DoLinegraph from '../../charts/do-linegraph';

class Linegraph extends Component {

    componentDidMount () {
        new DoLinegraph().drawLineChart();
    }

    render() {
        return (
           <div id="line-wrapper"></div>
        );
    }

}

export default Linegraph;