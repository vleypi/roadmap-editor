// components/editor/CanvasArea.tsx
'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { useEditorStore } from '@/store/editore.store'
import type { Node } from '@/types/editor.types' 
import GridButton from './GridButton'
import ViewportInfo from './ViewportInfo'
import ContextMenu from './ContextMenu'
import AddNodeModal from './AddNodeModal'

export default function CanvasArea() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [contextMenu, setContextMenu] = useState<{
    x: number
    y: number
    worldX?: number
    worldY?: number
    target?: 'canvas' | 'node'
    nodeId?: string
  } | null>(null)
  
  const [addNodeModal, setAddNodeModal] = useState<{
    isOpen: boolean
    worldX?: number
    worldY?: number
  }>({
    isOpen: false,
    worldX: 0,
    worldY: 0
  })
  
  const [isDraggingNode, setIsDraggingNode] = useState<string | null>(null)
  const [dragStart, setDragStart] = useState<{
    nodeX: number
    nodeY: number
    mouseWorldX: number
    mouseWorldY: number
  } | null>(null)
  
  const [connectionStart, setConnectionStart] = useState<{
    nodeId: string
    screenX: number
    screenY: number
  } | null>(null)
  
  const {
    viewport,
    nodes,
    connections,
    showGrid,
    gridSize,
    selectedNodeId,
    connectingNodeId,
    setViewport,
    updateViewport,
    selectNode,
    clearSelection,
    toggleGrid,
    addNode,
    deleteNode,
    updateNode,
    addConnection,
    startConnecting,
    cancelConnecting,
    completeConnection
  } = useEditorStore()

  // Обработчик начала перетаскивания узла
  const handleNodeMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    // Только левая кнопка мыши для перетаскивания узла
    if (e.button !== 0) return
    
    e.stopPropagation()
    e.preventDefault() // Предотвращаем выделение текста
    
    // Если мы в режиме соединения, начинаем соединение
    if (connectingNodeId) {
      if (connectingNodeId !== nodeId) {
        completeConnection(nodeId)
      } else {
        cancelConnecting()
      }
      return
    }
    
    selectNode(nodeId)
    
    const node = nodes.find(n => n.id === nodeId)
    if (!node) return
    
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top
    
    // Преобразуем координаты курсора в мировые координаты
    const mouseWorldX = (clientX - viewport.x) / viewport.scale
    const mouseWorldY = (clientY - viewport.y) / viewport.scale
    
    setIsDraggingNode(nodeId)
    setDragStart({
      nodeX: node.x,
      nodeY: node.y,
      mouseWorldX,
      mouseWorldY
    })
    
    // Блокируем выделение текста и меняем курсор
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'grabbing'
    
    // Закрываем контекстное меню и модальное окно если они открыты
    if (contextMenu) {
      setContextMenu(null)
    }
    if (addNodeModal.isOpen) {
      setAddNodeModal({ isOpen: false, worldX: 0, worldY: 0 })
    }
  }, [nodes, viewport, selectNode, contextMenu, addNodeModal, connectingNodeId, completeConnection, cancelConnecting])

  // Обработчик клика по точке соединения
  const handleConnectionPointClick = useCallback((e: React.MouseEvent, nodeId: string, pointType: 'in' | 'out') => {
    e.stopPropagation()
    
    if (connectingNodeId) {
      // Если уже есть начальная точка, завершаем соединение
      if (connectingNodeId !== nodeId) {
        completeConnection(nodeId)
      } else {
        cancelConnecting()
      }
    } else {
      // Начинаем новое соединение
      startConnecting(nodeId)
      
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const clientX = e.clientX - rect.left
      const clientY = e.clientY - rect.top
      
      setConnectionStart({
        nodeId,
        screenX: clientX,
        screenY: clientY
      })
      
      // Меняем курсор на crosshair
      document.body.style.cursor = 'crosshair'
    }
  }, [connectingNodeId, startConnecting, completeConnection, cancelConnecting])

  // Обработчик перемещения мыши (для перетаскивания узла и рисования соединения)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDraggingNode && dragStart) {
      e.preventDefault()
      
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const clientX = e.clientX - rect.left
      const clientY = e.clientY - rect.top
      
      // Преобразуем текущие координаты курсора в мировые
      const currentMouseWorldX = (clientX - viewport.x) / viewport.scale
      const currentMouseWorldY = (clientY - viewport.y) / viewport.scale
      
      // Вычисляем смещение курсора с момента начала перетаскивания
      const deltaX = currentMouseWorldX - dragStart.mouseWorldX
      const deltaY = currentMouseWorldY - dragStart.mouseWorldY
      
      // Новая позиция узла = начальная позиция + смещение курсора
      const newX = dragStart.nodeX + deltaX
      const newY = dragStart.nodeY + deltaY
      
      // Обновляем позицию узла
      updateNode(isDraggingNode, {
        x: newX,
        y: newY
      })
    }
  }, [isDraggingNode, dragStart, viewport, updateNode])

  // Обработчик отпускания мыши (окончание перетаскивания)
  const handleMouseUp = useCallback(() => {
    if (isDraggingNode) {
      setIsDraggingNode(null)
      setDragStart(null)
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }
  }, [isDraggingNode])

  // Обработчик начала перетаскивания viewport
  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    // Если открыто контекстное меню или модальное окно - закрываем их
    if (contextMenu) {
      setContextMenu(null)
    }
    if (addNodeModal.isOpen) {
      setAddNodeModal({ isOpen: false, worldX: 0, worldY: 0 })
    }
    
    // Если мы уже начали перетаскивать узел, не обрабатываем клик на canvas
    if (isDraggingNode) {
      return
    }
    
    // Если мы в режиме соединения, отменяем его при клике на canvas
    if (connectingNodeId) {
      cancelConnecting()
      document.body.style.cursor = ''
      setConnectionStart(null)
      return
    }
    
    // Проверяем, не кликнули ли мы на узел или точку соединения
    if ((e.target as HTMLElement).closest('[data-node], [data-connection-point]')) {
      return
    }
    
    // Запускаем перетаскивание viewport при ЛКМ (0) или ПКМ (2)
    if (e.button === 0 || e.button === 2) {
      e.preventDefault()
      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'grabbing'
      
      const startX = e.clientX - viewport.x
      const startY = e.clientY - viewport.y
      
      const handleMouseMove = (moveEvent: MouseEvent) => {
        updateViewport({
          x: moveEvent.clientX - startX,
          y: moveEvent.clientY - startY
        })
      }
      
      const handleMouseUp = () => {
        document.body.style.userSelect = ''
        document.body.style.cursor = ''
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
      
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
  }, [viewport, updateViewport, contextMenu, addNodeModal, isDraggingNode, connectingNodeId, cancelConnecting])

  // Zoom колесом мыши
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const zoomIntensity = 0.001
    const delta = e.deltaY
    
    const worldX = (mouseX - viewport.x) / viewport.scale
    const worldY = (mouseY - viewport.y) / viewport.scale
    
    const newScale = Math.max(0.1, Math.min(5, viewport.scale * Math.exp(-delta * zoomIntensity)))
    
    const newX = mouseX - worldX * newScale
    const newY = mouseY - worldY * newScale
    
    setViewport({
      scale: newScale,
      x: newX,
      y: newY
    })
  }, [viewport, setViewport])

  // Обработчик клика по узлу
  const handleNodeClick = useCallback((e: React.MouseEvent, nodeId: string) => {
    // Не обрабатываем клик если это было перетаскивание
    if (isDraggingNode) {
      e.stopPropagation()
      return
    }
    
    e.stopPropagation()
    
    // Если мы в режиме соединения, обрабатываем клик как соединение
    if (connectingNodeId) {
      if (connectingNodeId !== nodeId) {
        completeConnection(nodeId)
      }
      return
    }
    
    selectNode(nodeId)
    
    // Закрываем контекстное меню и модальное окно если они открыты
    if (contextMenu) {
      setContextMenu(null)
    }
    if (addNodeModal.isOpen) {
      setAddNodeModal({ isOpen: false, worldX: 0, worldY: 0 })
    }
  }, [selectNode, contextMenu, addNodeModal, isDraggingNode, connectingNodeId, completeConnection])

  // Обработчик клика по фону
  const handleBackgroundClick = useCallback(() => {
    // Не обрабатываем клик если это было перетаскивание
    if (isDraggingNode) {
      return
    }
    
    // Если мы в режиме соединения, отменяем его
    if (connectingNodeId) {
      cancelConnecting()
      document.body.style.cursor = ''
      setConnectionStart(null)
    }
    
    clearSelection()
    
    // Закрываем контекстное меню и модальное окно если они открыты
    if (contextMenu) {
      setContextMenu(null)
    }
    if (addNodeModal.isOpen) {
      setAddNodeModal({ isOpen: false, worldX: 0, worldY: 0 })
    }
  }, [clearSelection, contextMenu, addNodeModal, isDraggingNode, connectingNodeId, cancelConnecting])

  // Рисуем временную линию соединения при drag
  useEffect(() => {
    const handleConnectionMouseMove = (e: MouseEvent) => {
      if (!connectionStart || !containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const currentX = e.clientX - rect.left
      const currentY = e.clientY - rect.top
      
      // Обновляем линию предварительного просмотра соединения
      const previewLine = document.getElementById('connection-preview-line')
      if (previewLine) {
        previewLine.setAttribute('x1', connectionStart.screenX.toString())
        previewLine.setAttribute('y1', connectionStart.screenY.toString())
        previewLine.setAttribute('x2', currentX.toString())
        previewLine.setAttribute('y2', currentY.toString())
      }
    }
    
    if (connectionStart) {
      window.addEventListener('mousemove', handleConnectionMouseMove)
      return () => {
        window.removeEventListener('mousemove', handleConnectionMouseMove)
      }
    }
  }, [connectionStart])

  // Подписываемся на события мыши для перетаскивания узлов
  useEffect(() => {
    if (isDraggingNode) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDraggingNode, handleMouseMove, handleMouseUp])

  // Подписываемся на события колеса мыши
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

  // Обработчик контекстного меню (ПКМ) на холсте
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Преобразуем экранные координаты в мировые
    const worldX = (x - viewport.x) / viewport.scale
    const worldY = (y - viewport.y) / viewport.scale
    
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      worldX,
      worldY,
      target: 'canvas'
    })
    
    // Снимаем выделение с узлов при открытии контекстного меню на холсте
    clearSelection()
  }, [viewport, clearSelection])

  // Закрытие контекстного меню при клике вне его
  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu) {
        setContextMenu(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [contextMenu])

  // Преобразование мировых координат в экранные
  const worldToScreen = useCallback((worldX: number, worldY: number) => ({
    x: worldX * viewport.scale + viewport.x,
    y: worldY * viewport.scale + viewport.y
  }), [viewport])

  // Получаем выбранный узел
  const selectedNode = nodes.find(node => node.id === selectedNodeId)

  // Стили для сетки
  const gridStyles = showGrid ? {
    backgroundImage: `
      linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
    `,
    backgroundSize: `${gridSize * viewport.scale}px ${gridSize * viewport.scale}px`,
    transform: `translate(${viewport.x % (gridSize * viewport.scale)}px, ${viewport.y % (gridSize * viewport.scale)}px)`
  } : {}

  // Рендер узлов
  const renderNodes = nodes.map((node) => {
    const screenPos = worldToScreen(node.x, node.y)
    const isSelected = node.id === selectedNodeId
    const isConnecting = connectingNodeId === node.id
    const isDragging = node.id === isDraggingNode
    
    const nodeStyles = {
      left: `${screenPos.x}px`,
      top: `${screenPos.y}px`,
      transform: `translate(-50%, -50%) scale(${viewport.scale})`,
      transformOrigin: 'center center'
    }
    const progressBarStyle = {
      width: `${node.progress}%`,
      backgroundColor: node.color
    }
    const colorStyle = { backgroundColor: node.color }
    
    const hasDescription = !!node.description
    const hasTags = node.tags && node.tags.length > 0

    const nodeTags = hasTags ? node.tags!.map((tag, index) => (
      <span 
        key={index}
        className="px-2 py-1 bg-night-800 text-xs rounded"
      >
        {tag}
      </span>
    )) : null

    return (
      <div
        key={node.id}
        data-node="true"
        className="absolute"
        style={nodeStyles}
        onClick={(e) => handleNodeClick(e, node.id)}
        onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
        onContextMenu={(e) => {
          e.preventDefault()
          e.stopPropagation()
          selectNode(node.id)
          
          const rect = containerRef.current?.getBoundingClientRect()
          if (rect) {
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const worldX = (x - viewport.x) / viewport.scale
            const worldY = (y - viewport.y) / viewport.scale
            
            setContextMenu({
              x: e.clientX,
              y: e.clientY,
              worldX,
              worldY,
              target: 'node',
              nodeId: node.id
            })
          }
        }}
      >
        <div className={`relative group ${isSelected ? 'z-50' : 'z-10'} ${isDragging ? 'cursor-grabbing opacity-90' : 'cursor-grab'}`}>
          {/* Node */}
          <div className={`
  w-64 backdrop-blur-sm rounded-2xl p-5 shadow-xl
  border transition-colors duration-75
  ${isSelected 
    ? 'bg-purple-600/20 border-purple-500/30 shadow-2xl' 
    : 'bg-night-900/90 border-transparent hover:bg-night-800/90 hover:border-night-700/50'
  }
  ${isConnecting ? 'ring-2 ring-purple-500/50' : ''}
  ${isDragging ? 'shadow-2xl border-purple-500/50' : ''}
`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-3"
                  style={colorStyle}
                ></div>
                <span className="text-xs font-medium text-night-400 uppercase tracking-wider">
                  {node.type}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-xs text-night-500">
                  {isConnecting ? 'Connecting...' : isDragging ? 'Dragging...' : 'Drag to move'}
                </div>

              </div>
            </div>

            <h3 className="font-bold text-lg mb-3">{node.title}</h3>
            
            {hasDescription && (
              <p className="text-night-400 text-sm mb-4">{node.description}</p>
            )}
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-night-400">Progress</span>
                <span>{node.progress}%</span>
              </div>
              <div className="h-2 bg-night-800 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={progressBarStyle}
                ></div>
              </div>
            </div>

            {hasTags && (
              <div className="flex flex-wrap gap-2">
                {nodeTags}
              </div>
            )}
          </div>

          {/* Connection Points */}
          <div 
            data-connection-point="true"
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => handleConnectionPointClick(e, node.id, 'out')}
          >
            <div className={`
              w-6 h-6 rounded-full border-2 flex items-center justify-center 
              ${isConnecting ? 'border-purple-500 bg-purple-500/20' : 'border-night-700 bg-night-800 hover:border-purple-500 transition-colors'}
            `}>
              <div className={`
                w-2 h-2 rounded-full 
                ${isConnecting ? 'bg-purple-500' : 'bg-night-600 group-hover:bg-purple-500 transition-colors'}
              `}></div>
            </div>
          </div>
          <div 
            data-connection-point="true"
            className="absolute -left-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => handleConnectionPointClick(e, node.id, 'in')}
          >
            <div className={`
              w-6 h-6 rounded-full border-2 flex items-center justify-center 
              ${isConnecting ? 'border-purple-500 bg-purple-500/20' : 'border-night-700 bg-night-800 hover:border-purple-500 transition-colors'}
            `}>
              <div className={`
                w-2 h-2 rounded-full 
                ${isConnecting ? 'bg-purple-500' : 'bg-night-600 group-hover:bg-purple-500 transition-colors'}
              `}></div>
            </div>
          </div>
        </div>
      </div>
    )
  })

  // Рендер соединений
  const renderConnections = connections.map((connection) => {
    const sourceNode = nodes.find(n => n.id === connection.sourceId)
    const targetNode = nodes.find(n => n.id === connection.targetId)
    
    if (!sourceNode || !targetNode) return null
    
    // Преобразуем мировые координаты узлов в экранные
    const startPos = worldToScreen(sourceNode.x, sourceNode.y)
    const endPos = worldToScreen(targetNode.x, targetNode.y)
    
    // Вычисляем вектор направления от source к target
    const dx = endPos.x - startPos.x
    const dy = endPos.y - startPos.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    // 🔒 Защита 1: если ноды в одной точке — не рисуем ничего
    if (distance < 1) {
      return null
    }
    
    // Нормализуем вектор
    const nx = dx / distance
    const ny = dy / distance
    
    // Смещение от центра узла
    const nodeOffset = 128 * viewport.scale
    const effectiveOffset = Math.min(nodeOffset, distance / 2)
    
    // Вычисляем точки соединения
    const startX = startPos.x + nx * effectiveOffset
    const startY = startPos.y + ny * effectiveOffset
    const endX = endPos.x - nx * effectiveOffset
    const endY = endPos.y - ny * effectiveOffset
    
    // 🔒 Защита 2: проверяем, что координаты конечные и разумные
    if (!isFinite(startX) || !isFinite(startY) || !isFinite(endX) || !isFinite(endY)) {
      return null
    }
    
    // 🔒 Защита 3: если точки слишком близки после offset — не рисуем
    const finalDistance = Math.sqrt(
      Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
    )
    if (finalDistance < 2) {
      return null
    }
    
    const strokeColor = connection.type === 'dependency' ? '#8b5cf6' : 
                      connection.type === 'parent-child' ? '#10b981' : '#3b82f6'
    
    const strokeDasharray = connection.type === 'dependency' ? "4,4" : "none"
    
    // Вычисляем угол для стрелки
    const angle = Math.atan2(endY - startY, endX - startX)
    
    // Параметры стрелки
    const arrowLength = 8
    const arrowWidth = 5
    
    // Точки для стрелки
    const arrowX1 = endX - arrowLength * Math.cos(angle) + arrowWidth * Math.cos(angle - Math.PI / 2)
    const arrowY1 = endY - arrowLength * Math.sin(angle) + arrowWidth * Math.sin(angle - Math.PI / 2)
    const arrowX2 = endX - arrowLength * Math.cos(angle) + arrowWidth * Math.cos(angle + Math.PI / 2)
    const arrowY2 = endY - arrowLength * Math.sin(angle) + arrowWidth * Math.sin(angle + Math.PI / 2)
    
    // 🔒 Защита 4: проверяем координаты стрелки
    if (!isFinite(arrowX1) || !isFinite(arrowY1) || !isFinite(arrowX2) || !isFinite(arrowY2)) {
      return null
    }
    
    return (
      <g key={connection.id}>
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={strokeColor}
          strokeWidth="2"
          strokeDasharray={strokeDasharray}
          opacity="0.8"
        />
        <polygon
          points={`${endX},${endY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
          fill={strokeColor}
          opacity="0.8"
        />
      </g>
    )
  })

  // Обработчики действий контекстного меню
  const handleAddNodeClick = useCallback(() => {
    if (contextMenu?.worldX !== undefined && contextMenu?.worldY !== undefined) {
      // Закрываем контекстное меню
      setContextMenu(null)
      // Открываем модальное окно с координатами
      setTimeout(() => {
        setAddNodeModal({
          isOpen: true,
          worldX: contextMenu.worldX,
          worldY: contextMenu.worldY
        })
      }, 100)
    }
  }, [contextMenu])

  const handleAddConnectionClick = () => {
    if (selectedNode) {
      startConnecting(selectedNode.id)
      setContextMenu(null)
      
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const screenPos = worldToScreen(selectedNode.x, selectedNode.y)
      
      setConnectionStart({
        nodeId: selectedNode.id,
        screenX: screenPos.x,
        screenY: screenPos.y
      })
      
      document.body.style.cursor = 'crosshair'
    }
  }

  // const handleAddNodeSubmit = useCallback((nodeData: {
  //   title: string
  //   type: NodeTypeValue
  //   color: string
  //   x: number
  //   y: number
  //   description?: string
  //   progress?: number
  //   tags?: string[]
  // }) => {
  //   console.log('Adding node with data:', nodeData)
    
  //   addNode({
  //     ...nodeData,
  //     x: nodeData.x,
  //     y: nodeData.y,
  //     progress: nodeData.progress || 0
  //   })
    
  //   // Закрываем модальное окно
  //   setAddNodeModal({ isOpen: false, worldX: 0, worldY: 0 })
  // }, [addNode])

  const handleAddNodeSubmit = useCallback((nodeData: Omit<Node, 'id'>) => {
    console.log('Adding node with data:', nodeData)
    
    addNode(nodeData)
    
    // Закрываем модальное окно
    setAddNodeModal({ isOpen: false, worldX: 0, worldY: 0 })
  }, [addNode])

  const handleDeleteSelection = () => {
    if (selectedNode) {
      deleteNode(selectedNode.id)
    }
    setContextMenu(null)
  }

  const handleCenterView = useCallback(() => {
    if (!containerRef.current) {
      setContextMenu(null)
      return
    }

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Если есть выделенный узел - центрируем на нём
    if (selectedNode) {
      setViewport({
        scale: viewport.scale,
        x: centerX - selectedNode.x * viewport.scale,
        y: centerY - selectedNode.y * viewport.scale
      })
    } 
    // Иначе если контекстное меню было открыто на холсте - центрируем на точке клика
    else if (contextMenu?.worldX !== undefined && contextMenu?.worldY !== undefined) {
      setViewport({
        scale: viewport.scale,
        x: centerX - contextMenu.worldX * viewport.scale,
        y: centerY - contextMenu.worldY * viewport.scale
      })
    }
    // Иначе центрируем на (0, 0)
    else {
      setViewport({
        scale: viewport.scale,
        x: centerX,
        y: centerY
      })
    }
    
    setContextMenu(null)
  }, [selectedNode, contextMenu, viewport.scale, setViewport])

  const handleResetZoom = () => {
    if (!containerRef.current) {
      setContextMenu(null)
      return
    }

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Сброс масштаба и центрирование
    setViewport({
      scale: 1,
      x: centerX,
      y: centerY
    })
    setContextMenu(null)
  }

  const handleCenterOnSelection = () => {
    if (!selectedNode || !containerRef.current) {
      setContextMenu(null)
      return
    }

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    setViewport({
      scale: viewport.scale,
      x: centerX - selectedNode.x * viewport.scale,
      y: centerY - selectedNode.y * viewport.scale
    })
    
    setContextMenu(null)
  }

  return (
    <div className="flex-1 relative overflow-hidden bg-night-950">
      {/* Основной контейнер для canvas */}
      <div 
        ref={containerRef}
        onMouseDown={handleCanvasMouseDown}
        onClick={handleBackgroundClick}
        onContextMenu={handleContextMenu}
        className="absolute inset-0 cursor-grab"
      >
        {/* Grid Background - сетка в клеточку */}
        {showGrid && (
          <div 
            className="absolute inset-0"
            style={gridStyles}
          ></div>
        )}

        {/* Roadmap Nodes */}
        <div className="absolute inset-0">
          {renderNodes}

          {/* Connection Lines */}
          <svg className="absolute inset-0 pointer-events-none overflow-visible">
            {renderConnections}
            
            {/* Preview connection line */}
            {connectionStart && (
              <line
                id="connection-preview-line"
                x1={connectionStart.screenX}
                y1={connectionStart.screenY}
                x2={connectionStart.screenX}
                y2={connectionStart.screenY}
                stroke="#8b5cf6"
                strokeWidth="2"
                strokeDasharray="4,4"
                opacity="0.8"
              />
            )}
          </svg>
        </div>
      </div>

      {/* Информация о position и кнопка grid */}
      <div className="absolute bottom-6 right-6 flex flex-col items-end space-y-3">
        <GridButton 
          showGrid={showGrid}
          onToggle={toggleGrid}
        />
        
        <ViewportInfo 
          viewport={viewport}
          selectedNode={selectedNode}
        />
        
        {/* Индикатор режима соединения */}
        {connectingNodeId && (
          <div className="bg-purple-600/20 border border-purple-500/50 rounded-lg px-4 py-2 text-sm">
            <div className="flex items-center">
              <i className="fas fa-link mr-2 text-purple-400"></i>
              <span className="text-purple-300">Connecting mode</span>
              <button 
                onClick={() => {
                  cancelConnecting()
                  document.body.style.cursor = ''
                  setConnectionStart(null)
                }}
                className="ml-3 text-purple-400 hover:text-white"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="text-xs text-purple-500 mt-1">
              Click on another node to connect, or click anywhere to cancel
            </div>
          </div>
        )}
      </div>

      {/* Контекстное меню */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          target={contextMenu.target}
          hasSelection={!!selectedNode}
          onClose={() => setContextMenu(null)}
          onAddNode={handleAddNodeClick}
          onAddConnection={handleAddConnectionClick}
          onDeleteSelection={handleDeleteSelection}
          onCenterView={handleCenterView}
          onCenterOnSelection={handleCenterOnSelection}
          onResetZoom={handleResetZoom}
        />
      )}

      {/* Модальное окно добавления узла */}
      {addNodeModal.isOpen && (
        <AddNodeModal
          worldX={addNodeModal.worldX || 0}
          worldY={addNodeModal.worldY || 0}
          onClose={() => setAddNodeModal({ isOpen: false, worldX: 0, worldY: 0 })}
          onSubmit={handleAddNodeSubmit}
        />
      )}
    </div>
  )
}