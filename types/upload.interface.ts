export interface IUploadDropZoneProps {
    isDragging: boolean
    onDragOver: (e: React.DragEvent) => void
    onDragLeave: (e: React.DragEvent) => void
    onDrop: (e: React.DragEvent) => void
    children: React.ReactNode
}

export interface IUploadContentProps {
    isDragging: boolean
}

export interface IUploadActionsProps {
    onUploadClick: () => void
    onExampleClick: () => void
}


export interface IUseFileUploadReturn {
    handleFile: (file: File) => void
    handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleUploadClick: () => void
}

export interface IUseExampleRoadmapReturn {
    loadExample: () => void
}

export interface IUseDragAndDrop {
    isDragging: boolean
    handleDragOver: (e: React.DragEvent) => void
    handleDragLeave: (e: React.DragEvent) => void
    handleDrop: (e: React.DragEvent, onFile: (file: File) => void) => void
}
