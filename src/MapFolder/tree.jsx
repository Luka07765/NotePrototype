import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ForceDirectedTree = () => {
  const chartRef = useRef();

  useEffect(() => {
    // Clear any previous chart before rendering the new one
    d3.select(chartRef.current).selectAll('*').remove();

    // Sample data for testing
    const data = {
      name: 'Root',
      children: [
        {
          name: 'Group 1',
          children: [{ name: 'Subgroup 1.1' }, { name: 'Subgroup 1.2' }],
        },
        {
          name: 'Group 2',
          children: [{ name: 'Subgroup 2.1' }, { name: 'Subgroup 2.2' }],
        },
        {
          name: 'Group 3',
          children: [
            {
              name: 'Subgroup 3.1',
              children: [
                { name: 'Sub-subgroup 3.1.1' },
                { name: 'Sub-subgroup 3.1.2' },
              ],
            },
            { name: 'Subgroup 3.2' },
          ],
        },
      ],
    };

    // Chart dimensions
    const width = 928;
    const height = 600;

    // Compute the graph and start the force simulation
    const root = d3.hierarchy(data);
    const links = root.links();
    const nodes = root.descendants();

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(50)
          .strength(1)
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('x', d3.forceX())
      .force('y', d3.forceY());

    // Create the container SVG
    const svg = d3
      .select(chartRef.current)
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .attr('width', width)
      .attr('height', height)
      .attr('style', 'max-width: 100%; height: auto;');

    // Append links
    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line');

    // Append nodes
    const node = svg
      .append('g')
      .attr('fill', '#fff')
      .attr('stroke', '#000')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('fill', (d) => (d.children ? '#555' : '#000'))
      .attr('stroke', (d) => (d.children ? '#555' : '#fff'))
      .attr('r', 5)
      .call(drag(simulation));

    // Add tooltip to show node names
    node.append('title').text((d) => d.data.name);

    // Update node and link positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    });

    // Define drag functionality for the nodes
    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
  }, []);

  return (
    <div>
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default ForceDirectedTree;
