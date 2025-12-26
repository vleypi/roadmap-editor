import { FOOTER_SECTIONS } from "@/constants/layout.constant"
import { FOOTER_SOCIAL_LINKS } from "@/constants/layout.constant"
  
export function Footer() {
    // const renderFooterSections = () => {
    //   return FOOTER_SECTIONS.map((section, index) => (
    //     <div key={section.title + "_" + index}>
    //       <h4 className="font-display font-bold mb-6">{section.title}</h4>
    //       <ul className="space-y-3">
    //         {section.links.map((link) => (
    //           <li key={link.label}>
    //             <a href={link.href} className="text-night-400 hover:text-white transition-colors text-sm">
    //               {link.label}
    //             </a>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   ))
    // }
  
    const renderSocialLinks = () => {
      return FOOTER_SOCIAL_LINKS.map((social) => (
        <a 
          key={social.icon} 
          href={social.href} 
          aria-label={social.label}
          className="text-night-400 hover:text-white transition-colors"
        >
          <i className={social.icon}></i>
        </a>
      ))
    }
  
    return (
      <footer className="border-t border-night-800 mt-32">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
                  <i className="fas fa-map text-white"></i>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">RoadmapEditor</h3>
                  <p className="text-night-500 text-sm">Visualize with elegance</p>
                </div>
              </div>
              {/* <p className="text-night-500 text-sm leading-relaxed">
                A tool for designers, product managers, and engineers to create stunning roadmap visualizations.
              </p> */}
            </div>
            {/* {renderFooterSections()} */}
          </div>
          <div className="pt-8 border-t border-night-800 flex flex-col md:flex-row justify-between items-center">
            <div className="text-night-500 text-sm mb-4 md:mb-0">
              © 2025 RoadmapEditor.
            </div>
            <div className="flex items-center space-x-6">
              {renderSocialLinks()}
            </div>
          </div>
        </div>
      </footer>
    )
  }