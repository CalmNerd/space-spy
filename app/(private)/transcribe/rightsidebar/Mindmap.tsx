import React from 'react';
import { ReactFlow, MiniMap, Controls, Background, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface MindmapNode {
  id: string;
  label: string;
  position: { x: number; y: number };
}
interface MindmapEdge {
  id?: string;
  source: string;
  target: string;
}
interface MindmapData {
  nodes: MindmapNode[];
  edges: MindmapEdge[];
}

const nodeStyle: React.CSSProperties = {
  background: '#11213A',
  color: '#E6F0FF',
  border: '2px solid #2456A6',
  borderRadius: 12,
  padding: 8,
  fontFamily: 'geomGraphy, sans-serif',
  fontSize: 14,
  minWidth: 120,
  textAlign: 'center',
};

function Node({ data }: { data: { label: string } }) {
  return <div style={nodeStyle}>{data.label}</div>;
}

const nodeTypes = { default: Node };

function ensureEdgeIds(edges: MindmapEdge[]): (MindmapEdge & { id: string })[] {
  return edges.map((e, i) => ({ ...e, id: e.id ? String(e.id) : `${e.source}-${e.target}-${i}` }));
}

export default function Mindmap({ data }: { data: MindmapData }) {
  if (!data || !data.nodes?.length) return <div className="text-[#6CA0F6] p-8">No mindmap data found.</div>;
  const edgesWithIds = ensureEdgeIds(data.edges || []);
  return (
    <div style={{ width: '100%', height: 600, background: '#0B1A2F', borderRadius: 16 }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={data.nodes.map(n => ({ ...n, data: { label: n.label }, type: 'default' }))}
          edges={edgesWithIds}
          nodeTypes={nodeTypes}
          fitView
          panOnDrag
          zoomOnScroll
          zoomOnPinch
          minZoom={0.5}
          maxZoom={2}
          style={{ background: '#0B1A2F' }}
        >
          <MiniMap nodeColor={() => '#2456A6'} nodeStrokeColor={() => '#6CA0F6'} maskColor="rgba(36,86,166,0.1)" />
          <Controls showInteractive={true} />
          <Background gap={16} color="#1B3B68" />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
} 