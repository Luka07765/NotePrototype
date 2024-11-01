import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ForceDirectedTree = ({ structure }) => {
  const chartRef = useRef();

  useEffect(() => {
    // Clear any previous chart before rendering the new one
    d3.select(chartRef.current).selectAll('*').remove();

    // Convert the structure into a hierarchical format for D3
    const transformStructure = (folders) => {
      return {
        name: folders.name,
        filesCount: folders.files.length,
        subfoldersCount: folders.subfolders.length,
        children: [
          ...folders.files.map((file) => ({
            name: file.name,
            filesCount: 0,
            subfoldersCount: 0,
          })),
          ...folders.subfolders.map((subfolder) =>
            transformStructure(subfolder)
          ),
        ],
      };
    };

    const data = transformStructure(structure[0]);

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

    // Append nodes with dynamic circle size based on folder structure
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
      .attr('r', (d) =>
        Math.max(5, 5 + d.data.filesCount * 2 + d.data.subfoldersCount * 2)
      ) // Change the multiplier for size as needed
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
  }, [structure]); // Re-run useEffect when the structure changes

  return (
    <div>
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default ForceDirectedTree;
