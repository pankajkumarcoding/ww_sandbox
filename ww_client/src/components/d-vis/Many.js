import React, { Component } from 'react';
import DoMany from '../../charts/do-many';

import '../../styles/04-bars.css';
import '../../styles/04-lines.css';

  class SpinningPie extends Component {
  
      constructor (props) {
          super(props);
          this.state = {
              //
          }
         
      }
  
      componentDidMount () {
        let domany = new DoMany()
        domany.createEvent()
        domany.drawBars()
        domany.drawLineChart()
      }

      render() {
            return (
                <div id="many-wrapper">

                    <div id="evt-wrapper">
                        <svg height="200" width="800" id="svg"></svg>
                    </div>

                    <div id="bar-wrapper" className="bar-wrapper">    

                        <div id="bar-tooltip" className="bar-tooltip">

                            <div className="bar-tooltip-range">
                                Humidity: <span id="bar-range"></span>
                            </div>
                            <div className="bar-tooltip-value">
                                <span id="bar-count"></span> days
                            </div>

                        </div>

                    </div>

                    <div id="line-wrapper">
                        <div id="line-tooltip" className="line-tooltip">
                            <div className="line-tooltip-date">
                                <span id="line-date"></span>
                            </div>
                            <div className="tooltip-temperature">
                                Maximum Temperature: <span id="line-temperature"></span>
                            </div>
                        </div>
                    </div>

                </div>

          );
      }
  
  }
  
  export default SpinningPie;