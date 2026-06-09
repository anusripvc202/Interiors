import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* Top Footer */}
      <div className="container footer__top">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-icon">✦</span>
            <span className="footer__logo-text">Luxe<em>Interiors</em></span>
          </Link>
          <p className="footer__brand-desc">
            Crafting elegant, premium living environments since 2010. We turn standard spaces into architectural masterpieces.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h4>Explore</h4>
          <ul className="footer__links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/process">Our Process</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer__col">
          <h4>Services</h4>
          <ul className="footer__links">
            <li><Link to="/services">Residential Design</Link></li>
            <li><Link to="/services">Commercial Spaces</Link></li>
            <li><Link to="/services">Hospitality Design</Link></li>
            <li><Link to="/services">Space Planning</Link></li>
            <li><Link to="/services">Lighting Design</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer__col footer__newsletter">
          <h4>Newsletter</h4>
          <p>Subscribe to receive luxury design inspiration, project reveals, and studio updates.</p>
          <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit" className="footer__newsletter-btn">Join</button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="container footer__bottom">
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} Luxe Interiors. All rights reserved. Designed with precision & elegance.
        </p>
        <div className="footer__bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <button className="footer__scroll-top" onClick={handleScrollTop} aria-label="Scroll to top">
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}
