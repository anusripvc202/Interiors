import { ArrowRight, ChevronDown, Phone, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const stats = [
  { num: '15+', label: 'Years Experience' },
  { num: '500+', label: 'Projects Delivered' },
  { num: '98%', label: 'Client Satisfaction' },
  { num: '40+', label: 'Design Awards' },
];

const trustBadges = [
  'Residential Homes',
  'Commercial Offices',
  'Luxury Hospitality',
  'Bespoke Renovations',
];

export default function Hero() {
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero" aria-label="Hero section">
      {/* Background */}
      <div className="hero__bg">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90&auto=format&fit=crop"
          alt="Luxury interior living room with premium furniture and natural lighting"
          className="hero__bg-img"
          fetchpriority="high"
        />
        <div className="hero__overlay" />
      </div>

      {/* Floating trust badge */}
      <div className="hero__badge" aria-label="Award-winning studio since 2010">
        <span className="hero__badge-dot" aria-hidden="true" />
        <span>Award-Winning Studio · Est. 2010</span>
      </div>

      {/* Content */}
      <div className="container hero__content">
        <div className="hero__text">

          {/* Tag line */}
          <p className="hero__eyebrow">
            <CheckCircle size={14} aria-hidden="true" />
            Premium Interior Design · India
          </p>

          {/* Main headline — clear what you do & who you serve */}
          <h1 className="hero__title">
            Luxury Interior Design
            <br />
            for <em>Modern Homes</em>
          </h1>

          {/* Sub-headline — why contact you */}
          <p className="hero__subtitle">
            Transforming spaces with elegant, customised interiors — tailored to your 
            personality, budget and lifestyle. From dream living rooms to full home 
            renovations, we bring your vision to life.
          </p>

          {/* What we do — quick scan items */}
          <ul className="hero__services-list" aria-label="Services offered">
            {trustBadges.map((b) => (
              <li key={b}>
                <CheckCircle size={14} aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>

          {/* Primary CTAs */}
          <div className="hero__actions">
            <Link
              to="/contact"
              className="btn-primary hero__btn-cta"
              aria-label="Get a free interior design consultation"
            >
              <span>Get Free Consultation</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>

            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20a%20free%20interior%20design%20consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__whatsapp-btn"
              aria-label="Chat on WhatsApp"
            >
              {/* WhatsApp Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.847L0 24l6.306-1.502A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894c-1.853 0-3.584-.505-5.074-1.385l-.362-.215-3.754.894.952-3.664-.235-.375A9.872 9.872 0 012.106 12C2.106 6.536 6.536 2.106 12 2.106S21.894 6.536 21.894 12 17.464 21.894 12 21.894z"/>
              </svg>
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Quick trust line */}
          <p className="hero__trust-line" aria-label="Trust indicators">
            <Star size={13} fill="currentColor" aria-hidden="true" />
            <Star size={13} fill="currentColor" aria-hidden="true" />
            <Star size={13} fill="currentColor" aria-hidden="true" />
            <Star size={13} fill="currentColor" aria-hidden="true" />
            <Star size={13} fill="currentColor" aria-hidden="true" />
            <span>4.9/5 rating · 200+ verified reviews</span>
          </p>
        </div>

        {/* Stats */}
        <div className="hero__stats" role="list" aria-label="Key statistics">
          {stats.map((s) => (
            <div key={s.label} className="hero__stat" role="listitem">
              <span className="hero__stat-num" aria-label={`${s.num} ${s.label}`}>{s.num}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Featured In Brand Panel */}
        <div className="hero__featured" aria-label="As featured in">
          <span className="hero__featured-label">As Featured In</span>
          <div className="hero__featured-logos">
            <span>Architectural Digest</span>
            <span>Vogue Living</span>
            <span>Elle Decor</span>
            <span>Dwell</span>
            <span>Luxe Magazine</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button className="hero__scroll" onClick={scrollToAbout} aria-label="Scroll down to learn more">
        <ChevronDown size={20} aria-hidden="true" />
      </button>

      {/* Side text */}
      <div className="hero__side-text" aria-hidden="true">
        <span>Luxury · Elegance · Timeless Design</span>
      </div>
    </section>
  );
}
