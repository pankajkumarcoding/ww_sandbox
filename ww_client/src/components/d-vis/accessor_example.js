import React, { Component } from 'react';
import * as d3 from "d3";
// import { graphql } from 'react-apollo';
// import { getCostOfLivingQuery } from '';


class Barchart extends Component {

    constructor (props) {
        super(props);
        this.state = {};
        this.myRef = React.createRef();
    }

    componentDidMount() {
        let accessToRef = d3.select(this.myRef.current);
        accessToRef.style('background-color', 'red');
    }

    render() {
        return (
            <div></div>
        );
    }

}

export default Barchart;