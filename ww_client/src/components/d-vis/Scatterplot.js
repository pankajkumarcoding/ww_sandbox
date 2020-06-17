import React, { Component } from 'react';
import DoScatterplot from '../../charts/do-scatterplot';

class Scatterplot extends Component {

    constructor (props) {
        super(props);
        this.state = {
            //
        }
    }

    componentDidMount () {
        var scatter = new DoScatterplot().drawScatter();
    }

    render() {
        return (
            <div className="box-container">
                <div id="wrapper"></div>
            </div>
        );
    }

}

export default Scatterplot;