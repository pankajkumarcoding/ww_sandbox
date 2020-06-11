import React, { Component } from 'react';
import DoAdvancedScatter from '../charts/do-advanced-scatter';
import '../styles/advanced-scatter.css';

class AdvancedScatter extends Component {

    constructor (props) {
        super(props);
        this.state = {
            //
        }
    }

    componentDidMount() {
        let init = new DoAdvancedScatter().drawScatter();
    }

    render() {
        return (
           <div id="advanced-scatter"></div>
        );
    }

}

export default AdvancedScatter;