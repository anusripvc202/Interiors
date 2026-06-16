import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Find Designers', path: '/portfolio' },
  { label: 'Services', path: '/services' },
  { label: 'How It Works', path: '/process' },
  { label: 'Bookings', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [location]);

  // Dynamically compute navigation links
  const dynamicLinks = [...navLinks];
  if (user) {
    dynamicLinks.push({ label: 'Dashboard', path: '/login' });
  } else {
    dynamicLinks.push({ label: 'Log In', path: '/login' });
  }

  return (
    <header className={`navbar ${scrolled || menuOpen || location.pathname !== '/' ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img 
            src={`${import.meta.env.BASE_URL}logo.png`} 
            alt="Interiors Outfit Logo" 
            style={{ width: '2.5rem', height: '2.5rem', objectFit: 'contain' }} 
          />
          <span className="navbar__logo-text">
            Interiors<em>Outfit</em>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links">
          {dynamicLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA & Auth Profile */}
        <div className="navbar__actions">
          {user && (
            <div className="navbar__user-pill">
              <span className="navbar__user-name">Hi, {user.name ? user.name.split(' ')[0] : 'User'} ✦</span>
              <button onClick={logout} className="navbar__logout-btn" title="Log Out" aria-label="Log out">
                <LogOut size={13} />
              </button>
            </div>
          )}
          <Link to="/contact" className="navbar__cta btn-primary">
            <span>Book a Consultation</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="navbar__toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        {dynamicLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `navbar__mobile-link ${isActive ? 'navbar__link--active' : ''}`}
          >
            {link.label}
          </NavLink>
        ))}
        <Link to="/contact" className="btn-primary" style={{ marginTop: '1rem', textAlign: 'center' }}>
          <span>Book a Consultation</span>
        </Link>
        {user && (
          <button 
            onClick={logout} 
            className="btn-outline navbar__mobile-logout" 
            style={{ marginTop: '0.75rem', justifyContent: 'center', width: '100%' }}
          >
            <LogOut size={14} style={{ marginRight: '0.5rem' }} />
            <span>Sign Out</span>
          </button>
        )}
      </div>
    </header>
  );
}
