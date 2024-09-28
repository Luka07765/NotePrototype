import React, { useEffect, useRef, useCallback } from 'react';
import Sigma from 'sigma';
import { Graph } from 'graphology';
import circular from 'graphology-layout/circular';
import './Graph.css'; // Import the CSS file

const GraphView = ({ structure }) => {
  const containerRef = useRef(null);
  const graphRef = useRef(new Graph());

  const createNodesAndEdges = useCallback((folder, parentId = null) => {
    const nodeId = folder.id;

    if (!graphRef.current.hasNode(nodeId)) {
      // Add the folder as a node
      graphRef.current.addNode(nodeId, {
        label: folder.name,
        size: 10,
        color: '#4caf50',
      }); // Green nodes
    }

    if (parentId && !graphRef.current.hasEdge(parentId, nodeId)) {
      graphRef.current.addEdge(parentId, nodeId);
    }

    folder.subfolders.forEach((subfolder) =>
      createNodesAndEdges(subfolder, nodeId)
    );
    folder.files.forEach((file) => {
      const fileNodeId = file.id;

      if (!graphRef.current.hasNode(fileNodeId)) {
        graphRef.current.addNode(fileNodeId, {
          label: file.name,
          size: 8,
          color: '#2196f3',
        }); // Blue for files
      }

      if (!graphRef.current.hasEdge(nodeId, fileNodeId)) {
        graphRef.current.addEdge(nodeId, fileNodeId);
      }
    });
  }, []);

  useEffect(() => {
    const graph = graphRef.current;

    graph.clear();
    structure.forEach((folder) => createNodesAndEdges(folder));

    circular.assign(graph);

    const renderer = new Sigma(graph, containerRef.current, {
      settings: {
        dragNodes: true,
        defaultNodeColor: '#f39c12', // Default node color
        defaultEdgeColor: '#ccc', // Default edge color
      },
    });

    return () => {
      renderer.kill();
    };
  }, [structure, createNodesAndEdges]);

  return <div ref={containerRef} className="graph-container" />; // Apply the class to the container
};

export default GraphView;
