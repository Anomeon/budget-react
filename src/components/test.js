import * as d3 from 'd3';
import React from 'react';
import Faux from 'react-faux-dom';

export const Test = React.createClass({
  mixins: [
    Faux.mixins.core,
    Faux.mixins.anim
  ],

  getInitialState () {
    return {
      chart: 'loading...'
    }
  },

  componentDidMount () {
    const faux = this.connectFauxDOM('div.renderedD3', 'chart')

    d3.select(faux)
      .append('div')
      .html('Hello World!')

    this.animateFauxDOM(800)
  },

  render () {
    return (
      <div>
        <h2>Here is some fancy data:</h2>
        <div className='renderedD3'>
          {this.state.chart}
        </div>
      </div>
    )
  }
})
