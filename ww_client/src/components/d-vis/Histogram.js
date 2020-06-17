import React, { Component } from 'react'
import DoHistogram from '../../charts/do-histogram';

class Histogram extends Component {

    constructor (props) {
        super(props);
        this.state = {
            //
        }
    }

    componentDidMount () {
        new DoHistogram().drawHistogram()
    }

    render() {
        return (
           <div id="histogram-wrapper"></div>
        );
    }
}

export default Histogram;