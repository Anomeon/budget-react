import * as d3 from 'd3';
import {ItemStorage} from './index'

export class Piechart {
  constructor(faux) {
    this.storage = new ItemStorage(localStorage);

    // Prepare data
    let categories = {};
    this.storage.getItems('items', true).forEach((item) => {
      let category = item.category;
      if (categories[category]) {
        categories[category] = categories[category] + parseFloat(item.sum);
      } else {
        categories[category] = parseFloat(item.sum);
      }
    })

    let data = [];
    for(let key in categories) {
      data.push({category: key, sum: categories[key]});
    }


    let width = 960,
        height = 500,
        radius = Math.min(width, height) / 2;

    let color = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    let arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    let labelArc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    let pie = d3  .pie()
        .sort(null)
        .value((d) => { return d.sum; });

    let svg = d3.select(faux).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

      g.append("path")
        .attr("d", arc)
        .style("fill", (d) => { return color(d.data.sum); });

      g.append("text")
        .attr("transform", (d) => { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text((d) => { return d.data.category; });

      g.append("text")
        .attr("transform", (d) => { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", "1.35em")
        .text((d) => { return d.data.sum; });
  }
}
