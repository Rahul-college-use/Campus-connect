import { FOOTER_SECTIONS, SOCIAL_LINKS } from './footerData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-gray-900 text-gray-300 border-t border-gray-800"
      aria-labelledby="footer-heading"
    >
      {/* Hidden Accessible Screen-Reader Heading */}
      <h2 id="footer-heading" className="sr-only">
        Footer navigation and legal links
      </h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Overview & Newsletter Column (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <a href="/" className="flex items-center gap-2 font-bold text-xl text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md">
              <span className="text-blue-500">Campus</span>Connect
            </a>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Building accessible, modular, and responsive Web applications designed for fast iteration.
            </p>

            {/* Newsletter Subscription Box */}
            <form onSubmit={(e) => e.preventDefault()} className="mt-2 flex flex-col sm:flex-row gap-2 max-w-sm">
              <label htmlFor="footer-email" className="sr-only">
                Subscribe to newsletter
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Enter your email"
                className="px-3.5 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Dynamic Link Categories */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold text-gray-100 tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      className="text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {currentYear} Campus Connect. All rights reserved.</p>

          {/* Social Links with Screen-Reader Accessibility */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md p-1"
              >
                <span className="sr-only">{social.label}</span>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}