import { create } from 'zustand'

import { Node, Connection, Viewport} from '@/types/editor.interfaces'
import type { EditorStore } from '@/types/editor.types'

export const useEditorStore = create<EditorStore>((set, get) => ({
  viewport: { x: 800, y: 425, scale: 1 },
  nodes: [],
  connections: [],
  showGrid: true,
  gridSize: 50,
  selectedNodeId: null,
  connectingNodeId: null,
  

  setViewport: (viewport) => set({ viewport }),
  updateViewport: (updates) => set((state) => ({
    viewport: { ...state.viewport, ...updates }
  })),
  
  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),
  clearSelection: () => set({ selectedNodeId: null }),
  
  addNode: (nodeData) => set((state) => {
    const newNode: Node = {
      ...nodeData,
      id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
    
    return {
      nodes: [...state.nodes, newNode]
    }
  }),
  
  deleteNode: (nodeId) => set((state) => ({
    nodes: state.nodes.filter(node => node.id !== nodeId),
    connections: state.connections.filter(
      conn => conn.sourceId !== nodeId && conn.targetId !== nodeId
    ),
    selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
    connectingNodeId: state.connectingNodeId === nodeId ? null : state.connectingNodeId
  })),
  
  updateNode: (nodeId, updates) => set((state) => ({
    nodes: state.nodes.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    )
  })),
  
  moveNodeLayer: (nodeId: string, targetIndex: number) => set((state) => {
    const nodes = [...state.nodes]
    const fromIndex = nodes.findIndex(n => n.id === nodeId)
    
    if (fromIndex === -1 || fromIndex === targetIndex) return state
    
    const [movedNode] = nodes.splice(fromIndex, 1)
    nodes.splice(targetIndex, 0, movedNode)
    
    return { nodes }
  }),
  
  bringNodeToFront: (nodeId) => set((state) => {
    const nodes = [...state.nodes]
    const nodeIndex = nodes.findIndex(n => n.id === nodeId)
    
    if (nodeIndex === -1 || nodeIndex === nodes.length - 1) return state
    
    const [node] = nodes.splice(nodeIndex, 1)
    nodes.push(node)
    
    return { nodes }
  }),
  
  sendNodeToBack: (nodeId) => set((state) => {
    const nodes = [...state.nodes]
    const nodeIndex = nodes.findIndex(n => n.id === nodeId)
    
    if (nodeIndex === -1 || nodeIndex === 0) return state
    
    const [node] = nodes.splice(nodeIndex, 1)
    nodes.unshift(node)
    
    return { nodes }
  }),
  
  addConnection: (connectionData) => set((state) => {
    const existingConnection = state.connections.find(
      conn => conn.sourceId === connectionData.sourceId && 
              conn.targetId === connectionData.targetId
    )
    
    if (existingConnection) {
      console.log('Connection already exists:', existingConnection)
      return state
    }
    
    const newConnection: Connection = {
      ...connectionData,
      id: `conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
    
    return {
      connections: [...state.connections, newConnection]
    }
  }),
  
  deleteConnection: (connectionId) => set((state) => ({
    connections: state.connections.filter(conn => conn.id !== connectionId)
  })),
  
  updateConnection: (connectionId, updates) => set((state) => ({
    connections: state.connections.map(conn => 
      conn.id === connectionId ? { ...conn, ...updates } : conn
    )
  })),
  
  startConnecting: (nodeId) => set({ 
    connectingNodeId: nodeId,
    selectedNodeId: nodeId 
  }),
  
  cancelConnecting: () => set({ 
    connectingNodeId: null 
  }),
  
  completeConnection: (targetNodeId) => set((state) => {
    if (!state.connectingNodeId || state.connectingNodeId === targetNodeId) {
      return { ...state, connectingNodeId: null }
    }

    const existingConnection = state.connections.find(
      conn => conn.sourceId === state.connectingNodeId && 
              conn.targetId === targetNodeId
    )
    
    if (existingConnection) {
      console.log('Connection already exists')
      return { ...state, connectingNodeId: null }
    }

    const newConnection: Connection = {
      id: `conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sourceId: state.connectingNodeId,
      targetId: targetNodeId,
      type: 'dependency'
    }
    
    return {
      connections: [...state.connections, newConnection],
      connectingNodeId: null
    }
  }),
  
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  setGridSize: (size) => set({ gridSize: size }),


  loadFromJSON: (jsonData: any) => {
    set((state) => {
      try {
        const nodes = jsonData.nodes || []
        const connections = jsonData.connections || []
        const viewport = jsonData.viewport || { scale: 1, x: 0, y: 0 }
        const title = jsonData.title || "Imported Roadmap"
  
        return {
          ...state,
          nodes: nodes.map((node: any) => ({
            ...node,
            id: node.id || `node-${Math.random().toString(36).substr(2, 9)}`,
            x: node.x || 0,
            y: node.y || 0,
            title: node.title || "Untitled Node",
            type: node.type || "Task",
            color: node.color || "#8b5cf6",
            progress: node.progress || 0,
            tags: node.tags || []
          })),
          connections: connections.map((conn: any) => ({
            ...conn,
            id: conn.id || `conn-${Math.random().toString(36).substr(2, 9)}`
          })),
          viewport,
          roadmapTitle: title
        }
      } catch (error) {
        console.error('Error loading JSON:', error)
        return state
      }
    })
  }
}))

