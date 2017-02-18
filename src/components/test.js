import * as d3 from 'd3';
import React from 'react';
import Faux from 'react-faux-dom';
import {Piechart} from '../services';


export const Test = React.createClass({
  mixins: [
    Faux.mixins.core,
    Faux.mixins.anim
  ],

  getInitialState () {
    return {
      chart: ''
    }
  },

  componentDidMount () {
    const faux = this.connectFauxDOM('div.renderedD3', 'chart')
    new Piechart(faux);
  },

  render () {
    return (
      <div>
        <h2>Costs by categories:</h2>
        <div className='renderedD3'>
          {this.state.chart}
        </div>
      </div>
    )
  }
})
