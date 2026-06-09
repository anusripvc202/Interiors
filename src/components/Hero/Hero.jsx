import { ArrowRight, ChevronDown } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      {/* Background */}
      <div className="hero__bg">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90&auto=format&fit=crop"
          alt="Luxury interior living room"
          className="hero__bg-img"
        />
        <div className="hero__overlay" />
      </div>

      {/* Floating badge */}
      <div className="hero__badge">
        <span className="hero__badge-dot" />
        <span>Award-Winning Studio · Est. 2010</span>
      </div>

      {/* Content */}
      <div className="container hero__content">
        <div className="hero__text">
          <p className="section-label hero__label">Interior Design Excellence</p>
          <h1 className="hero__title">
            Where Every Space
            <br />
            Tells a <em>Story</em>
          </h1>
          <p className="hero__subtitle">
            We craft extraordinary living environments that reflect your personality,
            elevate your lifestyle, and stand the test of time.
          </p>
          <div className="hero__actions">
            <a href="#portfolio" className="btn-primary hero__btn" onClick={(e) => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span>Explore Our Work</span>
              <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn-outline" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span>Book Consultation</span>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="hero__stats">
          {[
            { num: '15+', label: 'Years Experience' },
            { num: '500+', label: 'Projects Delivered' },
            { num: '98%', label: 'Client Satisfaction' },
            { num: '40+', label: 'Design Awards' },
          ].map((s) => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-num">{s.num}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Featured In Brand Panel */}
        <div className="hero__featured">
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
      <button className="hero__scroll" onClick={scrollToAbout} aria-label="Scroll down">
        <ChevronDown size={20} />
      </button>

      {/* Side text */}
      <div className="hero__side-text">
        <span>Luxury · Elegance · Timeless Design</span>
      </div>
    </section>
  );
}
