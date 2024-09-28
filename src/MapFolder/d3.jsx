import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PartitionChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    // Test data
    const data = {
      name: 'Root',
      children: [
        {
          name: 'Group 1',
          value: 1000,
          children: [
            { name: 'Subgroup 1.1', value: 400 },
            { name: 'Subgroup 1.2', value: 600 },
          ],
        },
        {
          name: 'Group 2',
          value: 800,
          children: [
            { name: 'Subgroup 2.1', value: 300 },
            { name: 'Subgroup 2.2', value: 500 },
          ],
        },
        {
          name: 'Group 3',
          value: 1200,
          children: [
            {
              name: 'Subgroup 3.1',
              value: 700,
              children: [
                { name: 'Sub-subgroup 3.1.1', value: 300 },
                { name: 'Sub-subgroup 3.1.2', value: 400 },
              ],
            },
            { name: 'Subgroup 3.2', value: 500 },
          ],
        },
        {
          name: 'Group 4',
          value: 900,
          children: [
            { name: 'Subgroup 4.1', value: 450 },
            { name: 'Subgroup 4.2', value: 450 },
          ],
        },
        {
          name: 'Group 5',
          value: 1500,
          children: [
            {
              name: 'Subgroup 5.1',
              value: 1000,
              children: [
                { name: 'Sub-subgroup 5.1.1', value: 500 },
                { name: 'Sub-subgroup 5.1.2', value: 500 },
              ],
            },
            { name: 'Subgroup 5.2', value: 500 },
          ],
        },
      ],
    };

    // Chart dimensions
    const width = 928;
    const height = 1200;

    // Create the color scale.
    const color = d3.scaleOrdinal(
      d3.quantize(d3.interpolateRainbow, data.children.length + 1)
    );

    // Compute the layout.
    const hierarchy = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value);

    const root = d3
      .partition()
      .size([height, ((hierarchy.height + 1) * width) / 3])(hierarchy);

    // Create the SVG container.
    const svg = d3
      .select(chartRef.current)
      .attr('viewBox', [0, 0, width, height])
      .attr('width', width)
      .attr('height', height)
      .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;');

    // Append cells.
    const cell = svg
      .selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr('transform', (d) => `translate(${d.y0},${d.x0})`);

    const rect = cell
      .append('rect')
      .attr('width', (d) => d.y1 - d.y0 - 1)
      .attr('height', (d) => rectHeight(d))
      .attr('fill-opacity', 0.6)
      .attr('fill', (d) => {
        if (!d.depth) return '#ccc';
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      })
      .style('cursor', 'pointer')
      .on('click', clicked);

    const text = cell
      .append('text')
      .style('user-select', 'none')
      .attr('pointer-events', 'none')
      .attr('x', 4)
      .attr('y', 13)
      .attr('fill-opacity', (d) => +labelVisible(d));

    text.append('tspan').text((d) => d.data.name);

    const format = d3.format(',d');
    const tspan = text
      .append('tspan')
      .attr('fill-opacity', (d) => labelVisible(d) * 0.7)
      .text((d) => ` ${format(d.value)}`);

    cell.append('title').text(
      (d) =>
        `${d
          .ancestors()
          .map((d) => d.data.name)
          .reverse()
          .join('/')}\n${format(d.value)}`
    );

    let focus = root;

    function clicked(event, p) {
      focus = focus === p ? (p = p.parent) : p;

      root.each(
        (d) =>
          (d.target = {
            x0: ((d.x0 - p.x0) / (p.x1 - p.x0)) * height,
            x1: ((d.x1 - p.x0) / (p.x1 - p.x0)) * height,
            y0: d.y0 - p.y0,
            y1: d.y1 - p.y0,
          })
      );

      const t = cell
        .transition()
        .duration(750)
        .attr('transform', (d) => `translate(${d.target.y0},${d.target.x0})`);

      rect.transition(t).attr('height', (d) => rectHeight(d.target));
      text.transition(t).attr('fill-opacity', (d) => +labelVisible(d.target));
      tspan
        .transition(t)
        .attr('fill-opacity', (d) => labelVisible(d.target) * 0.7);
    }

    function rectHeight(d) {
      return d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2);
    }

    function labelVisible(d) {
      return d.y1 <= width && d.y0 >= 0 && d.x1 - d.x0 > 16;
    }
  }, []);

  return (
    <div>
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default PartitionChart;
