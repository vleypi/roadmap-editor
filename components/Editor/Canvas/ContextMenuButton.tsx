// components/editor/ContextMenuItem.tsx
'use client'


import { ContextMenuButtonProps } from "@/types/editor.interfaces"

export default function ContextMenuButton({
  icon,
  label,
  danger = false,
  onClick
}: ContextMenuButtonProps) {
  const baseClasses =
    'w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors'
  const textAndBgClasses = danger
    ? 'text-red-400 hover:bg-red-900/20'
    : 'text-night-300 hover:bg-night-800/50'

  return (
    <button onClick={onClick} className={`${baseClasses} ${textAndBgClasses}`}>
      <i className={icon}></i>
      <span>{label}</span>
    </button>
  )
}