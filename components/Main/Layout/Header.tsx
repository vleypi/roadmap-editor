'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HEADER_LINKS } from '@/constants/layout.constant'


export function Header() {
  const pathname = usePathname()

  const renderNavLinks = HEADER_LINKS.map((link) => {
    const isActive = link.href === '/'
      ? pathname === '/' 
      : pathname?.startsWith(link.href) 
    return (
      <Link
        key={link.href}
        href={link.href}
        className={`px-4 py-2 rounded-xl transition-all ${isActive ? 'text-white bg-white/5' : 'text-night-300 hover:text-white hover:bg-white/5'}`}
      >
        {link.label}
      </Link>
    )
  })

  return (
    <nav className="fixed w-full z-50 px-6 py-5">
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel rounded-2xl px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
                <i className="fas fa-map text-white text-lg"></i>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl blur opacity-30"></div>
            </div>
            <span className="font-display text-xl font-bold tracking-tight">Roadmap<span className="text-gradient">Editor</span></span>    
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {renderNavLinks}
          </div>
          
          <Link href="/editor" className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition-opacity"></div>
            <div className="relative bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-xl transition-all">
              Get Started
            </div>
          </Link>

        </div>
      </div>
    </nav>
  )
}