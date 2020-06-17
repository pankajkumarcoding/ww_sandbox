 /**
  * RadarChart   Originally written by Nadieh Bremer
  *              Inspired by alangrafu
  *              Updated by Anthony Lyristis - May, 2020
  * # Released under MIT License
  * Copyright (c) 2013 Mark Otto.
  * Copyright (c) 2017 Andrew Fong.
  * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
  * associated documentation files (the "Software"), to deal in the Software without restriction, including without 
  * limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
  * and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  * 
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
  * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE 
  * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR 
  * IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */


import React, { Component } from 'react';
import * as d3 from "d3";
import { graphql } from 'react-apollo';
import DataHog from '../../helpers/DataHog';

class Radar extends Component {

    constructor (props) {
        super(props);
        this.state = {
            //
        }
        this.dh = new DataHog();
        
    }

    componentDidMount () {
        // console.log("Radar!");
        this.displayNewCityData("oregon","00xdc14154");
    }

    RadarSetup(new_data) {
        var margin = {top: 65, right: 65, bottom: 65, left: 65},
            width = Math.min(300, window.innerWidth - 10) - margin.left - margin.right,
            height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
					
			////////////////////////////////////////////////////////////// 
			////////////////////////// Data ////////////////////////////// 
			////////////////////////////////////////////////////////////// 

        var data = new_data;
        ////////////////////////////////////////////////////////////// 
        //////////////////// Draw the Chart ////////////////////////// 
        ////////////////////////////////////////////////////////////// 

        var color = d3.scaleOrdinal(d3.schemeCategory10)
            .range(["#FF0000","#0000FF","#e3e3e3"]);
            
        var radarChartOptions = {
            w: width,
            h: height,
            margin: margin,
            maxValue: 200,
            levels: 2,
            roundStrokes: true,
            color: color
        };
        this.RadarChart(".radarChart", data, radarChartOptions);
    }

     RadarChart(id, data, options) {
        var cfg = {
            w: 600,				//Width of the circle
            h: 600,				//Height of the circle
            margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins of the SVG
            levels: 2,				//How many levels or inner circles should there be drawn
            maxValue: 200, 			//What is the value that the biggest circle will represent
            labelFactor: 1.5, 	//How much farther than the radius of the outer circle should the labels be placed
            wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
            opacityArea: 0.35, 	//The opacity of the area of the blob
            dotRadius: 1, 			//The size of the colored circles of each blog
            opacityCircles: 0.1, 	//The opacity of the circles of each blob
            strokeWidth: 1, 		//The width of the stroke around each blob
            roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
            color: d3.scaleOrdinal(d3.schemeCategory10)	//Color function
        };
        
        //Put all of the options into a variable called cfg
        if('undefined' !== typeof options){
          for(var i in options){
            if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
          }//for i
        }//if
        
        //If the supplied maxValue is smaller than the actual one, replace by the max in the data
        var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i) {
            return d3.max(i.map(function(o){
                return o.value;
            }))
        }));
            
        var allAxis = (data[0].map(function(i, j){return i.axis})),	//Names of each axis
            total = allAxis.length,					//The number of different axes
            radius = Math.min(cfg.w/2, cfg.h/2), 	//Radius of the outermost circle
            Format = d3.format('%'),			 	//Percentage formatting
            angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"
        
        //Scale for the radius
        var rScale = d3.scaleLinear(d3.schemeCategory10)
            .range([0, radius])
            .domain([0, maxValue]);

        /////////////////////////////////////////////////////////
        //////////// Create the container SVG and g /////////////
        /////////////////////////////////////////////////////////
    
        //Remove whatever chart with the same id/class was present before
        d3.select(id).select("svg").remove();
        
        //Initiate the radar chart SVG
        var svg = d3.select(id).append("svg")
                .attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
                .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
                .attr("class", "radar"+id);
        //Append a g element		
        var g = svg.append("g")
                .attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");
        
        /////////////////////////////////////////////////////////
        ////////// Glow filter for some extra pizzazz ///////////
        /////////////////////////////////////////////////////////
        
        //Filter for the outside glow
        var filter = g.append('defs').append('filter').attr('id','glow'),
            feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
            feMerge = filter.append('feMerge'),
            feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
            feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');
    
        /////////////////////////////////////////////////////////
        /////////////// Draw the Circular grid //////////////////
        /////////////////////////////////////////////////////////
        
        //Wrapper for the grid & axes
        var axisGrid = g.append("g").attr("class", "axisWrapper");
        
        //Draw the background circles
        axisGrid.selectAll(".levels")
           .data(d3.range(1,(cfg.levels+1)).reverse())
           .enter()
            .append("circle")
            .attr("class", "gridCircle")
            .attr("r", function(d, i){return radius/cfg.levels*d;})
            .style("fill", "#CDCDCD")
            .style("stroke", "#CDCDCD")
            .style("fill-opacity", cfg.opacityCircles)
            .style("filter" , "url(#glow)");
    
        //Text indicating at what % each level is
        axisGrid.selectAll(".axisLabel")
           .data(d3.range(1,(cfg.levels+1)).reverse())
           .enter().append("text")
           .attr("class", "axisLabel")
           .attr("x", 4)
           .attr("y", function(d){return -d*radius/cfg.levels;})
           .attr("dy", "0.4em")
           .style("font-size", "10px")
           .attr("fill", "#737373")
           .text(function(d,i) { return Format(maxValue * d/cfg.levels); });
    
        /////////////////////////////////////////////////////////
        //////////////////// Draw the axes //////////////////////
        /////////////////////////////////////////////////////////
        
        //Create the straight lines radiating outward from the center
        var axis = axisGrid.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");
        //Append the lines
        axis.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
            .attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
            .attr("class", "line")
            .style("stroke", "white")
            .style("stroke-width", "2px");
    
        //Append the labels at each axis
        axis.append("text")
            .attr("class", "legend")
            .style("font-size", "11px")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
            .attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
            .text(function(d){return d})
            .call(wrap, cfg.wrapWidth);
    
        /////////////////////////////////////////////////////////
        ///////////// Draw the radar chart blobs ////////////////
        /////////////////////////////////////////////////////////
        
        //The radial line function
        var radarLine = d3.lineRadial()
            .radius(function(d) { return rScale(d.value); })
            .angle(function(d,i) {	return i*angleSlice; });
            
        if(cfg.roundStrokes) {
            radarLine.curve(d3.curveCardinalClosed)
        }
                    
        //Create a wrapper for the blobs	
        var blobWrapper = g.selectAll(".radarWrapper")
            .data(data)
            .enter().append("g")
            .attr("class", "radarWrapper");
                
        //Append the backgrounds	
        blobWrapper
            .append("path")
            .attr("class", "radarArea")
            .attr("d", function(d,i) { return radarLine(d); })
            .style("fill", function(d,i) { return cfg.color(i); })
            .style("fill-opacity", cfg.opacityArea)
            .on('mouseover', function (d,i){
                //Dim all blobs
                d3.selectAll(".radarArea")
                    .transition().duration(200)
                    .style("fill-opacity", 0.1); 
                //Bring back the hovered over blob
                d3.select(this)
                    .transition().duration(200)
                    .style("fill-opacity", 0.7);	
            })
            .on('mouseout', function(){
                //Bring back all blobs
                d3.selectAll(".radarArea")
                    .transition().duration(200)
                    .style("fill-opacity", cfg.opacityArea);
            });
            
        //Create the outlines	
        blobWrapper.append("path")
            .attr("class", "radarStroke")
            .attr("d", function(d,i) { return radarLine(d); })
            .style("stroke-width", cfg.strokeWidth + "px")
            .style("stroke", function(d,i) { return cfg.color(i); })
            .style("fill", "none")
            .style("filter" , "url(#glow)");		
        
        //Append the circles
        blobWrapper.selectAll(".radarCircle")
            .data(function(d,i) { return d; })
            .enter().append("circle")
            .attr("class", "radarCircle")
            .attr("r", cfg.dotRadius)
            .attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
            .attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
            .style("fill", function(d,i,j) { return cfg.color(j); })
            .style("fill-opacity", 0.8);
    
        /////////////////////////////////////////////////////////
        //////// Append invisible circles for tooltip ///////////
        /////////////////////////////////////////////////////////
        
        //Wrapper for the invisible circles on top
        var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
            .data(data)
            .enter().append("g")
            .attr("class", "radarCircleWrapper");
            
        //Append a set of invisible circles on top for the mouseover pop-up
        blobCircleWrapper.selectAll(".radarInvisibleCircle")
            .data(function(d,i) { return d; })
            .enter().append("circle")
            .attr("class", "radarInvisibleCircle")
            .attr("r", cfg.dotRadius*1.5)
            .attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
            .attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function(d,i) {
                var newX =  (parseFloat(d3.select(this).attr('cx')) - 10);
                var newY =  (parseFloat(d3.select(this).attr('cy')) - 10);
                        
                tooltip
                    .attr('x', newX)
                    .attr('y', newY)
                    .text(Format(d.value))
                    .transition().duration(200)
                    .style('opacity', 1);
            })
            .on("mouseout", function(){
                tooltip.transition().duration(200)
                    .style("opacity", 0);
            });
            
        //Set up the small tooltip for when you hover over a circle
        var tooltip = g.append("text")
            .attr("class", "tooltip")
            .style("opacity", 0);
        
        /////////////////////////////////////////////////////////
        /////////////////// Helper Function /////////////////////
        /////////////////////////////////////////////////////////
    
        //Taken from http://bl.ocks.org/mbostock/7555321
        //Wraps SVG text	
        function wrap(text, width) {
          text.each(function() {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.4, // ems
                y = text.attr("y"),
                x = text.attr("x"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
                
            while (word = words.pop()) {
              line.push(word);
              tspan.text(line.join(" "));
              if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
              }
            }
          });
        }//wrap	
        
    }//RadarChart

    displayNewCityData (state_id, city_id, init=0) {
        // {axis:"Health Services",value:100},
        // {axis:"Utilities",value:100},
        // {axis:"Transportation",value:65},
        // {axis:"Misc. Recreation",value:57},
        // // {axis:"Have Internet Connectivity",value:22},
        // {axis:"Housing",value:26},
        // {axis:"Groceries",value:36},

        // "gro": "105.2",
        // "hea": "86.6",
        // "hou": "106.6",
        // "uti": "107.4",
        // "tra": "95.4",
        // "ent": "106.1"

        let data = [];
        var city_datas, state_datas, natl_datas;
        for (var state in this.dh.data_col) {
            // console.log(`state_id: ${state_id}`)
            if (state === state_id){
                var state_datas = [
                    {axis: "Health Services", value: parseInt(this.dh.data_col[state]['avgs']['tab_col']['hea'])},
                    {axis: "Groceries", value: parseInt(this.dh.data_col[state]['avgs']['tab_col']['gro'])},
                    {axis: "Housing", value: parseInt(this.dh.data_col[state]['avgs']['tab_col']['hou'])},
                    {axis: "Utilities", value: parseInt(this.dh.data_col[state]['avgs']['tab_col']['uti'])},
                    {axis: "Transportation", value: parseInt(this.dh.data_col[state]['avgs']['tab_col']['tra'])},
                    {axis: "Activities", value: parseInt(this.dh.data_col[state]['avgs']['tab_col']['ent'])}
                ];
            }
            for (var city of this.dh.data_col[state]['cities']) {
                
                if (city["c_id"] == city_id) {
                    city_datas = [
                        {axis: "Health Services", value: parseInt(city['tab_col']['hea'] )},
                        {axis: "Groceries", value: parseInt(city['tab_col']['gro'] )},
                        {axis: "Housing", value: parseInt(city['tab_col']['hou'] )},
                        {axis: "Utilities", value: parseInt(city['tab_col']['uti'])},
                        {axis: "Transportation", value: parseInt(city['tab_col']['tra'])},
                        {axis: "Activities", value: parseInt(city['tab_col']['ent']) }
                    ]
                    data.push(city_datas);
                }
            }
        }
        natl_datas = [
            {axis: "Health Services", value:100 },
            {axis: "Groceries", value:100 },
            {axis: "Housing", value:100 },
            {axis: "Utilities", value:100},
            {axis: "Transportation", value:100},
            {axis: "Activities", value:100}
        ]
        data.push(state_datas);
        data.push(natl_datas);
        return this.RadarSetup(data);
    }

    render() {

        return (
                <div className="radarField">
                    <div className="radarChart"></div>
                    <div className="radarForm">
                        <ul>
                            <li className="city_state_li" onClick={ (e) => {this.displayNewCityData("oregon","00xdc14154")} }>Salem, OR</li>
                            <li className="city_state_li" onClick={ (e) => {this.displayNewCityData("connecticut", "00000fax15")} }>Hartford, CN</li>
                            <li className="city_state_li" onClick={ (e) => {this.displayNewCityData("connecticut", "0000xfd743")} }>Baltic, CN</li>
                            <li className="city_state_li" onClick={ (e) => {this.displayNewCityData("colorado","00eac18114")} }>Fort Collins, CO</li>
                            <li className="city_state_li" onClick={ (e) => {this.displayNewCityData("mississippi","00dee15404")} }>Pascagoula, MS</li>
                            <li className="city_state_li" onClick={ (e) => {this.displayNewCityData("massachusetts","000ddb9982")} }>Worcester, MA</li>
                        </ul>
                        <div></div>
                    </div>
                </div>
        );
    }
}

export default Radar;
