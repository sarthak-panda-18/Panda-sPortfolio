import React from 'react';
import { footer, profile, nav } from '../data/content';
import { useLenis } from '../hooks/useLenis';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const { scrollTo } = useLenis();

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    scrollTo(href);
  };

  const handleBackToTop = (e) => {
    e.preventDefault();
    scrollTo('#hero', { offset: 0 });
  };

  return (
    <footer className="w-full bg-sand border-t border-hairline py-12 select-none">
      <div className="max-w-content mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Copyright */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <span className="font-serif text-xl text-forest">{profile.name}</span>
          <p className="text-xs text-forest-muted">{footer.copyright}</p>
        </div>

        {/* Middle: Navigation Links */}
        <div className="flex items-center space-x-6">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="text-xs text-forest-muted hover:text-forest transition-colors duration-fast"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right: Back to Top */}
        <a
          href="#hero"
          onClick={handleBackToTop}
          className="inline-flex items-center gap-1.5 text-xs text-forest-muted hover:text-clay transition-colors duration-fast"
          aria-label="Back to top"
        >
          <span>Back to top</span>
          <ArrowUp size={14} strokeWidth={1.5} />
        </a>
      </div>
    </footer>
  );
}
