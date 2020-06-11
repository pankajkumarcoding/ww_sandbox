import React, { Component } from 'react';
import * as d3 from "d3";
// import { graphql } from 'react-apollo';
// import { getCostOfLivingQuery } from '';


var data1 = [12,35,24,78,16,66,24];
var data2 = {
    "health" : 123,
    "grocery" : 55,
    "median_home_cost" : 18,
    "misc_entertainment" : 67,
    "transportation" : 98 
};
// [ ... rest params]
class Chart2 extends Component {

    constructor (props) {
        super(props);
        this.myRef = React.createRef();
        
        this.state = {
            //
        }
    }

    componentDidMount () {
        console.log("Component Mounted!!!");
        this.doStuff();
    }

    componentDidUpdate () {
        console.log("Component Updated!!");
    }

    doStuff () {

        d3.selectAll('p').data([18,32,60]).transition().duration(250).style('font-size', function(d){
            return d * Math.random(20) + "px";
        });
    }


    render() {
        return (
            <div></div>
        );
    }

}

export default Chart2;