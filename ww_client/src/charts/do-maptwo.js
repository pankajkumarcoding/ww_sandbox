import * as d3 from "d3";
import * as topojson from "topojson-client";

const width = 975;
const height = 610;
const path = d3.geoPath();
const svg = d3.create("svg")
const g = svg.append("g");
const zoom = d3.zoom()

class DoMaptwo {

    constructor () {
        zoom.scaleExtent([1, 8])
            .on("zoom", this.zoomed);
            
        svg.attr("viewBox", [0, 0, width, height])
            .on("click", this.reset);
    }
    
    reset() {
        svg.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity,
            d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
        );
    }

    clicked(d) {
        const [[x0, y0], [x1, y1]] = path.bounds(d);
        d3.event.stopPropagation();
        svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.mouse(svg.node())
        );
    }

    zoomed() {
        const {transform} = d3.event;
        g.attr("transform", transform);
        g.attr("stroke-width", 1 / transform.k);
    }

    async makemap () {
        
        var us = await d3.json('./../../datas/states-topo.json');
    
        g.append("g")
            .attr("fill", "#444")
            .attr("cursor", "pointer")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .join("path")
            .on("click", this.clicked)
            .attr("d", path)
        .append("title")
            .text(d => d.properties.name);
    
        g.append("path")
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-linejoin", "round")
            .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));
    
        svg.call(zoom);
        var anchor = document.getElementById("map-container");
        anchor.append(svg.node());

    }
}

export default DoMaptwo;