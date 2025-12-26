import Link from 'next/link'

export function TopBar({ title = "Untitled Roadmap" }) {
    return (
        <div className="h-16 border-b border-night-800 bg-night-900/90 backdrop-blur-sm flex items-center justify-between px-6">
            <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-map text-white text-lg"></i>
                </div>
                <h1 className="text-xl font-bold">Roadmap Editor</h1>
            </Link>
        </div>
    )
}
