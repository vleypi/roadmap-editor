import Link from "next/link"
import { Upload } from "@/components/Main/Elements/Upload/Upload"

export default function HomePage() {
  return (
    <div className="font-body bg-night-950 text-night-100 min-h-screen">
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-5 pointer-events-none"></div>
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <section className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium">No signup required • 100% free</span>
            </div>
            <h1 className="font-display text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              Visualize your
              <span className="relative">
                <span className="text-gradient"> roadmaps</span>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-blue-500/30 blur-xl opacity-60"></div>
              </span>
              <br />with elegance
            </h1>
            <p className="text-xl text-night-400 max-w-2xl mx-auto leading-relaxed">
              Upload a JSON file and get a stunning, interactive roadmap visualization. 
              Built for designers, product managers, and engineers.
            </p>
          </section>

          <section className="relative max-w-4xl mx-auto mb-24">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-blue-500/20 to-cyan-500/20 blur-3xl opacity-50 rounded-3xl"></div> 
            <div className="relative glass-panel rounded-3xl p-1">
              <div className="bg-gradient-to-br from-night-900 to-night-950 rounded-3xl p-10">
                <div className="text-center mb-10">
                  <div className="w-24 h-24 mx-auto mb-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full opacity-20 animate-spin-slow"></div>
                    <div className="absolute inset-4 bg-night-900 rounded-full flex items-center justify-center">
                      <i className="fas fa-file-code text-4xl text-gradient"></i>
                    </div>
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-4">Drop your JSON file here</h2>
                  <p className="text-night-400 mb-10">Any roadmap format supported • Secure local processing</p>
                </div>
                <Upload />
              </div>
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-purple-600/10 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-transparent rounded-full blur-2xl"></div>
          </section>

          <section className="mb-24">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card-hover glass-panel rounded-2xl p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <i className="fas fa-bolt text-2xl text-gradient"></i>
                </div>
                <h3 className="text-xl font-display font-bold mb-4">Instant Visualization</h3>
                <p className="text-night-400 leading-relaxed">
                  See your roadmap come to life immediately. No waiting, no processing queues.
                </p>
              </div>
              <div className="card-hover glass-panel rounded-2xl p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <i className="fas fa-shield-alt text-2xl text-gradient"></i>
                </div>
                <h3 className="text-xl font-display font-bold mb-4">Privacy First</h3>
                <p className="text-night-400 leading-relaxed">
                  Your data never leaves your browser. All processing happens locally.
                </p>
              </div>
              <div className="card-hover glass-panel rounded-2xl p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <i className="fas fa-infinity text-2xl text-gradient"></i>
                </div>
                <h3 className="text-xl font-display font-bold mb-4">No Limits</h3>
                <p className="text-night-400 leading-relaxed">
                  Unlimited roadmaps, unlimited exports. No watermarks, no paywalls.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="lg:w-1/2">
                <div className="sticky top-32">
                  <h2 className="font-display text-4xl font-bold mb-6">Interactive JSON format</h2>
                  <p className="text-night-400 mb-10 text-lg leading-relaxed">
                    Our JSON format supports nodes, connections, and visual positioning. 
                    Create interactive roadmaps with dependencies and custom styling.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600/20 to-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-gradient font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-lg mb-2">Nodes & Positions</h4>
                        <p className="text-night-400">Define nodes with titles, positions, colors and progress</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600/20 to-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-gradient font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-lg mb-2">Connections</h4>
                        <p className="text-night-400">Create dependencies between nodes with visual links</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600/20 to-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-gradient font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-lg mb-2">Viewport Control</h4>
                        <p className="text-night-400">Save zoom and pan positions for consistent viewing</p>
                      </div>
                    </div>
                  </div>
                  <button className="mt-10 relative group/btn">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl blur opacity-30 group-hover/btn:opacity-70 transition-opacity"></div>
                    <Link href="/editor">
                      <div className="relative bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3.5 rounded-xl font-medium hover:shadow-xl transition-all flex items-center">
                        <i className="fas fas fa-play mr-3"></i>
                        Try example
                      </div>
                    </Link>
                  </button>
                </div>
              </div>
    <div className="lg:w-1/2">
      <div className="bg-night-900 rounded-3xl overflow-hidden border border-night-800">
        <div className="bg-night-950 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-night-400 text-sm font-mono">roadmap.json</span>
            </div>
            <button className="text-night-400 hover:text-white transition-colors" aria-label="Copy code">
              <i className="far fa-copy text-lg"></i>
            </button>
          </div>
          
          <pre className="text-sm font-mono overflow-auto">
{`{
  "title": "Product Development Q4",
  "description": "Interactive roadmap with dependencies",
  "nodes": [
    {
      "id": "node-1",
      "title": "Project Setup",
      "description": "Initialize project structure",
      "type": "Task",
      "color": "#8b5cf6",
      "x": -29,
      "y": -256,
      "progress": 100,
      "tags": ["Frontend", "Setup"]
    },
    {
      "id": "node-2",
      "title": "UI Components",
      "description": "Create reusable UI components",
      "type": "Task",
      "color": "#3b82f6",
      "x": 233,
      "y": 12,
      "progress": 75,
      "tags": ["Frontend", "Components"]
    },
    {
      "id": "node-3",
      "title": "Backend API",
      "description": "Develop REST API endpoints",
      "type": "Task",
      "color": "#10b981",
      "x": -226,
      "y": 15,
      "progress": 50,
      "tags": ["Backend", "API"]
    }
  ],
  "connections": [
    {
      "id": "conn-1",
      "sourceId": "node-1",
      "targetId": "node-2",
      "type": "dependency"
    },
    {
      "id": "conn-2",
      "sourceId": "node-1",
      "targetId": "node-3",
      "type": "dependency"
    }
  ],
  "viewport": {
    "scale": 0.67,
    "x": 747,
    "y": 529
  }
}`}
          </pre>
        </div>
      </div>
    </div>
  </div>
</section>

          {/* CTA секция */}
          <section className="text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-500/20 to-cyan-500/20 blur-3xl rounded-3xl"></div>
              <div className="relative glass-panel rounded-3xl p-12">
                <h2 className="font-display text-4xl font-bold mb-6">Ready to visualize?</h2>
                <p className="text-xl text-night-400 mb-10 max-w-2xl mx-auto">
                Join RoadmapFlow to create beautiful, shareable roadmaps in minutes..
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/editor" className="relative group/btn">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl blur opacity-30 group-hover/btn:opacity-70 transition-opacity"></div>
                    <div className="relative bg-gradient-to-r from-purple-600 to-blue-500 text-white px-10 py-4 rounded-xl font-medium hover:shadow-xl transition-all flex items-center justify-center text-lg">
                      <i className="fas fa-play mr-3"></i>
                      Try Live Demo
                    </div>
                  </Link>
                  {/* <Link href="/docs" className="px-10 py-4 bg-white/5 border border-night-700 text-night-300 rounded-xl font-medium hover:bg-white/10 hover:text-white hover:border-night-600 transition-all text-lg flex items-center justify-center">
                    Read Documentation
                  </Link> */}
                </div>
                <p className="text-night-500 mt-10 text-sm">
                  <i className="fas fa-lock mr-2"></i>
                  No credit card required 
                  {/* • Privacy focused */}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}