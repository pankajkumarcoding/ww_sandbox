import * as d3 from "d3";

class DoMany {

    // constructor () {
        
    // }

    /**
     * Create Event
     * 
     */
    async createEvent() {
        const rectColors = [
        "yellowgreen",
        "cornflowerblue",
        "seagreen",
        "slateblue",
        ]
    
        // create and bind data to our rects
        const rects = d3.select("#svg")
        .selectAll(".rect")
        .data(rectColors)
        .enter().append("rect")
            .attr("height", 100)
            .attr("width", 100)
            .attr("x", (d,i) => i * 110)
            .attr("fill", "lightgrey")
    
        // create listeners
        // rect.on("mouseenter", function (datum) {
        rects
            .on("mousemove", function(datum) {
            d3.select(this).style("fill", datum)
            })
            .on("mouseout", function() {
            d3.select(this).style("fill", "lightgrey")
            })
    
        // destroy our events after 3 seconds
        // setTimeout(() => {
        //     rects
        //     .dispatch("mouseout")
        //     .on("mousemove", null)
        //     .on("mouseout", null)
        // }, 3000)

        
    }


    /**
     * Draw Bars
     * 
     */
    async  drawBars() {

        // 1. Access data
      
        const dataset = await d3.json("./../../datas/my_weather_data.json")
      
        // 2. Create chart dimensions
      
        const width = 600
        let dimensions = {
          width: width,
          height: width * 0.6,
          margin: {
            top: 30,
            right: 10,
            bottom: 50,
            left: 50,
          },
        }
        dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
        dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom
      
        // 3. Draw canvas
      
        const wrapper = d3.select("#bar-wrapper")
          .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height)
      
        const bounds = wrapper.append("g")
            .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)
      
        // init static elements
        bounds.append("g")
            .attr("class", "bins")
        bounds.append("line")
            .attr("class", "mean")
        bounds.append("g")
            .attr("class", "x-axis")
            .style("transform", `translateY(${dimensions.boundedHeight}px)`)
          .append("text")
            .attr("class", "x-axis-label")
      
        const metricAccessor = d => d.humidity
        const yAccessor = d => d.length
      
        // 4. Create scales
      
        const xScale = d3.scaleLinear()
          .domain(d3.extent(dataset, metricAccessor))
          .range([0, dimensions.boundedWidth])
          .nice()
      
        const binsGenerator = d3.histogram()
          .domain(xScale.domain())
          .value(metricAccessor)
          .thresholds(12)
      
        const bins = binsGenerator(dataset)
      
        const yScale = d3.scaleLinear()
          .domain([0, d3.max(bins, yAccessor)])
          .range([dimensions.boundedHeight, 0])
          .nice()
      
        // 5. Draw data
      
        const barPadding = 1
      
        let binGroups = bounds.select(".bins")
          .selectAll(".bin")
          .data(bins)
      
        binGroups.exit()
            .remove()
      
        const newBinGroups = binGroups.enter().append("g")
            .attr("class", "bin")
      
        newBinGroups.append("rect")
        newBinGroups.append("text")
      
        // update binGroups to include new points
        binGroups = newBinGroups.merge(binGroups)
      
        const barRects = binGroups.select("rect")
            .attr("x", d => xScale(d.x0) + barPadding)
            .attr("y", d => yScale(yAccessor(d)))
            .attr("height", d => dimensions.boundedHeight - yScale(yAccessor(d)))
            .attr("width", d => d3.max([
              0,
              xScale(d.x1) - xScale(d.x0) - barPadding
            ]))
      
        const mean = d3.mean(dataset, metricAccessor)
      
        const meanLine = bounds.selectAll(".mean")
            .attr("x1", xScale(mean))
            .attr("x2", xScale(mean))
            .attr("y1", -20)
            .attr("y2", dimensions.boundedHeight)
      
        // 6. Draw peripherals
      
        const xAxisGenerator = d3.axisBottom()
          .scale(xScale)
      
        const xAxis = bounds.select(".x-axis")
          .call(xAxisGenerator)
      
      
        const xAxisLabel = xAxis.select(".x-axis-label")
            .attr("x", dimensions.boundedWidth / 2)
            .attr("y", dimensions.margin.bottom - 10)
            .text("Humidity")
      
        // 7. Set up interactions
      
        binGroups.select("rect")
            .on("mouseenter", onMouseEnter)
            .on("mouseleave", onMouseLeave)
      
        const tooltip = d3.select("#bar-tooltip")
        function onMouseEnter(datum) {
          tooltip.select("#bar-count")
              .text(yAccessor(datum))
      
          const formatHumidity = d3.format(".2f")
          tooltip.select("#bar-range")
              .text([
                formatHumidity(datum.x0),
                formatHumidity(datum.x1)
              ].join(" - "))
      
          const x = xScale(datum.x0)
            + (xScale(datum.x1) - xScale(datum.x0)) / 2
            + dimensions.margin.left
          const y = yScale(yAccessor(datum))
            + dimensions.margin.top
      
          tooltip.style("transform", `translate(`
            + `calc( -50% + ${x}px),`
            + `calc(-100% + ${y}px)`
            + `)`)
      
          tooltip.style("opacity", 1)
        }
      
        function onMouseLeave() {
          tooltip.style("opacity", 0)
        }

        
      }


      /**
       * Draw Scatter
       * 
       */
    //   async drawScatter() {

    //     // 1. Access data
      
    //     const dataset = await d3.json("./../../datas/my_weather_data.json")
      
    //     const xAccessor = d => d.dewPoint
    //     const yAccessor = d => d.humidity
      
    //     // 2. Create chart dimensions
      
    //     const width = d3.min([
    //       window.innerWidth * 0.9,
    //       window.innerHeight * 0.9,
    //     ])
    //     let dimensions = {
    //       width: width,
    //       height: width,
    //       margin: {
    //         top: 10,
    //         right: 10,
    //         bottom: 50,
    //         left: 50,
    //       },
    //     }
    //     dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
    //     dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom
      
    //     // 3. Draw canvas
      
    //     const wrapper = d3.select("#scatter-wrapper")
    //       .append("svg")
    //         .attr("width", dimensions.width)
    //         .attr("height", dimensions.height)
      
    //     const bounds = wrapper.append("g")
    //       .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)
      
    //     // 4. Create scales
      
    //     const xScale = d3.scaleLinear()
    //       .domain(d3.extent(dataset, xAccessor))
    //       .range([0, dimensions.boundedWidth])
    //       .nice()
      
    //     const yScale = d3.scaleLinear()
    //       .domain(d3.extent(dataset, yAccessor))
    //       .range([dimensions.boundedHeight, 0])
    //       .nice()
      
    //     const drawDots = (dataset) => {
      
    //       // 5. Draw data
      
    //       const dots = bounds.selectAll("circle")
    //         .data(dataset, d => d[0])
      
    //       const newDots = dots.enter().append("circle")
      
    //       const allDots = newDots.merge(dots)
    //           .attr("cx", d => xScale(xAccessor(d)))
    //           .attr("cy", d => yScale(yAccessor(d)))
    //           .attr("r", 4)
      
    //       const oldDots = dots.exit()
    //           .remove()
    //     }
    //     drawDots(dataset)
      
    //     // 6. Draw peripherals
      
    //     const xAxisGenerator = d3.axisBottom()
    //       .scale(xScale)
      
    //     const xAxis = bounds.append("g")
    //       .call(xAxisGenerator)
    //         .style("transform", `translateY(${dimensions.boundedHeight}px)`)
      
    //     const xAxisLabel = xAxis.append("text")
    //         .attr("class", "x-axis-label")
    //         .attr("x", dimensions.boundedWidth / 2)
    //         .attr("y", dimensions.margin.bottom - 10)
    //         .html("dew point (&deg;F)")
      
    //     const yAxisGenerator = d3.axisLeft()
    //       .scale(yScale)
    //       .ticks(4)
      
    //     const yAxis = bounds.append("g")
    //         .call(yAxisGenerator)
      
    //     const yAxisLabel = yAxis.append("text")
    //         .attr("class", "y-axis-label")
    //         .attr("x", -dimensions.boundedHeight / 2)
    //         .attr("y", -dimensions.margin.left + 10)
    //         .text("relative humidity")
      
    //     // 7. Set up interactions
      
    //     const delaunay = d3.Delaunay.from(
    //       dataset,
    //       d => xScale(xAccessor(d)),
    //       d => yScale(yAccessor(d)),
    //     )
    //     const voronoi = delaunay.voronoi()
    //     voronoi.xmax = dimensions.boundedWidth
    //     voronoi.ymax = dimensions.boundedHeight
      
    //     bounds.selectAll(".voronoi")
    //       .data(dataset)
    //       .enter().append("path")
    //         .attr("class", "voronoi")
    //         .attr("d", (d,i) => voronoi.renderCell(i))
    //         // .attr("stroke", "salmon")
    //         .on("mouseenter", onMouseEnter)
    //         .on("mouseleave", onMouseLeave)
      
    //     const tooltip = d3.select("#tooltip")
    //     function onMouseEnter(datum) {
    //       const dayDot = bounds.append("circle")
    //           .attr("class", "tooltipDot")
    //           .attr("cx", xScale(xAccessor(datum)))
    //           .attr("cy", yScale(yAccessor(datum)))
    //           .attr("r", 7)
    //           .style("fill", "maroon")
    //           .style("pointer-events", "none")
      
    //       const formatHumidity = d3.format(".2f")
    //       tooltip.select("#humidity")
    //           .text(formatHumidity(yAccessor(datum)))
      
    //       const formatDewPoint = d3.format(".2f")
    //       tooltip.select("#dew-point")
    //           .text(formatDewPoint(xAccessor(datum)))
      
    //       const dateParser = d3.timeParse("%Y-%m-%d")
    //       const formatDate = d3.timeFormat("%B %A %-d, %Y")
    //       tooltip.select("#date")
    //           .text(formatDate(dateParser(datum.date)))
      
    //       const x = xScale(xAccessor(datum))
    //         + dimensions.margin.left
    //       const y = yScale(yAccessor(datum))
    //         + dimensions.margin.top
      
    //       tooltip.style("transform", `translate(`
    //         + `calc( -50% + ${x}px),`
    //         + `calc(-100% + ${y}px)`
    //         + `)`)
      
    //       tooltip.style("opacity", 1)
    //     }
      
    //     function onMouseLeave() {
    //       d3.selectAll(".tooltipDot")
    //         .remove()
      
    //       tooltip.style("opacity", 0)
    //     }

    //     
    //   }


      /**
       * Draw Line Chart
       *
       */
      async drawLineChart() {

        // 1. Access data
      
        let dataset = await d3.json("./../../datas/my_weather_data.json")
      
        const yAccessor = d => d.temperatureMax
        const dateParser = d3.timeParse("%Y-%m-%d")
        const xAccessor = d => dateParser(d.date)
        dataset = dataset.sort((a,b) => xAccessor(a) - xAccessor(b)).slice(0, 100)
      
        // 2. Create chart dimensions
      
        let dimensions = {
          width: window.innerWidth * 0.8,
          height: 400,
          margin: {
            top: 15,
            right: 15,
            bottom: 40,
            left: 60,
          },
        }
        dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
        dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom
      
        // 3. Draw canvas
      
        const wrapper = d3.select("#line-wrapper")
          .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height)
      
        const bounds = wrapper.append("g")
            .attr("transform", `translate(${
              dimensions.margin.left
            }, ${
              dimensions.margin.top
            })`)
      
        bounds.append("defs").append("clipPath")
            .attr("id", "bounds-clip-path")
          .append("rect")
            .attr("width", dimensions.boundedWidth)
            .attr("height", dimensions.boundedHeight)
      
        const clip = bounds.append("g")
          .attr("clip-path", "url(#bounds-clip-path)")
      
        // 4. Create scales
      
        const yScale = d3.scaleLinear()
          .domain(d3.extent(dataset, yAccessor))
          .range([dimensions.boundedHeight, 0])
      
        const freezingTemperaturePlacement = yScale(32)
        const freezingTemperatures = clip.append("rect")
            .attr("class", "freezing")
            .attr("x", 0)
            .attr("width", d3.max([0, dimensions.boundedWidth]))
            .attr("y", freezingTemperaturePlacement)
            .attr("height", d3.max([0, dimensions.boundedHeight - freezingTemperaturePlacement]))
      
        const xScale = d3.scaleTime()
          .domain(d3.extent(dataset, xAccessor))
          .range([0, dimensions.boundedWidth])
      
        // 5. Draw data
      
        const lineGenerator = d3.line()
          .x(d => xScale(xAccessor(d)))
          .y(d => yScale(yAccessor(d)))
      
        const line = clip.append("path")
            .attr("class", "line")
            .attr("d", lineGenerator(dataset))
      
        // 6. Draw peripherals
      
        const yAxisGenerator = d3.axisLeft()
          .scale(yScale)
      
        const yAxis = bounds.append("g")
            .attr("class", "y-axis")
          .call(yAxisGenerator)
      
        const yAxisLabel = yAxis.append("text")
            .attr("class", "y-axis-label")
            .attr("x", -dimensions.boundedHeight / 2)
            .attr("y", -dimensions.margin.left + 10)
            .html("Minimum Temperature (&deg;F)")
      
        const xAxisGenerator = d3.axisBottom()
          .scale(xScale)
      
        const xAxis = bounds.append("g")
            .attr("class", "x-axis")
            .style("transform", `translateY(${dimensions.boundedHeight}px)`)
          .call(xAxisGenerator)
      
        // 7. Set up interactions
      
        const listeningRect = bounds.append("rect")
          .attr("class", "listening-rect")
          .attr("width", dimensions.boundedWidth)
          .attr("height", dimensions.boundedHeight)
          .on("mousemove", onMouseMove)
          .on("mouseleave", onMouseLeave)
      
        const tooltip = d3.select("#line-tooltip")
        const tooltipCircle = bounds.append("circle")
            .attr("class", "tooltip-circle")
            .attr("r", 4)
            .attr("stroke", "#af9358")
            .attr("fill", "white")
            .attr("stroke-width", 2)
            .style("opacity", 0)
      
        function onMouseMove() {
          const mousePosition = d3.mouse(this)
          const hoveredDate = xScale.invert(mousePosition[0])
      
          const getDistanceFromHoveredDate = d => Math.abs(xAccessor(d) - hoveredDate)
          const closestIndex = d3.scan(dataset, (a, b) => (
            getDistanceFromHoveredDate(a) - getDistanceFromHoveredDate(b)
          ))
          const closestDataPoint = dataset[closestIndex]
      
          const closestXValue = xAccessor(closestDataPoint)
          const closestYValue = yAccessor(closestDataPoint)
      
          const formatDate = d3.timeFormat("%B %A %-d, %Y")
          tooltip.select("#line-date")
              .text(formatDate(closestXValue))
      
          const formatTemperature = d => `${d3.format(".1f")(d)}°F`
          tooltip.select("#line-temperature")
              .html(formatTemperature(closestYValue))
      
          const x = xScale(closestXValue)
            + dimensions.margin.left
          const y = yScale(closestYValue)
            + dimensions.margin.top
      
          tooltip.style("transform", `translate(`
            + `calc( -50% + ${x}px),`
            + `calc(-100% + ${y}px)`
            + `)`)
      
          tooltip.style("opacity", 1)
      
          tooltipCircle
              .attr("cx", xScale(closestXValue))
              .attr("cy", yScale(closestYValue))
              .style("opacity", 1)
        }
      
        function onMouseLeave() {
          tooltip.style("opacity", 0)
      
          tooltipCircle.style("opacity", 0)
        }

      }

}

export default DoMany;