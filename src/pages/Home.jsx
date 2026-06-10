import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Compass, Shield, Calendar, Star, MapPin, ArrowRight } from 'lucide-react';
import { designersData } from '../data/designersData';
import Testimonials from '../components/Testimonials/Testimonials';

export default function Home() {
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState('');
  const [searchStyle, setSearchStyle] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirect to the designers marketplace (/portfolio) with query states
    navigate('/portfolio', { 
      state: { 
        city: searchCity, 
        style: searchStyle 
      } 
    });
  };

  return (
    <div className="home-marketplace">
      
      {/* Hero Search Section */}
      <section className="hero" style={{ 
        minHeight: '85vh', 
        justifyContent: 'center', 
        paddingTop: '8rem', 
        paddingBottom: '5rem',
        backgroundImage: 'linear-gradient(to bottom, rgba(18, 16, 12, 0.6) 0%, rgba(18, 16, 12, 0.85) 100%), url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'var(--white)'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '2.5rem', alignItems: 'center', textAlign: 'center' }}>
          
          <div style={{ maxWidth: '850px' }}>
            <span className="section-label" style={{ color: 'var(--gold)', justifyContent: 'center' }}>Book Verified Designers</span>
            <h1 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)', 
              fontWeight: '400', 
              lineHeight: '1.1', 
              marginTop: '1rem',
              marginBottom: '1.5rem' 
            }}>
              Find the Perfect Interior Designer for Every <em>Space</em>
            </h1>
            <p style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', 
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 300,
              maxWidth: '650px',
              margin: '0 auto'
            }}>
              Compare design packages, view matching styles, and schedule live consultations with certified interior specialists.
            </p>
          </div>

          {/* Search Filter Widget */}
          <form onSubmit={handleSearch} className="home__search-form">
            {/* City Selection */}
            <div className="search-group">
              <label style={{ fontSize: '0.68rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--stone-light)', letterSpacing: '0.05em' }}>Select Location</label>
              <select 
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                style={{ border: 'none', background: 'transparent', fontSize: '0.95rem', fontWeight: '500', color: 'var(--charcoal)', cursor: 'pointer', outline: 'none', fontFamily: 'var(--font-sans)', width: '100%' }}
              >
                <option value="">All Cities (India)</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

            <div className="search-divider" />

            {/* Style Selection */}
            <div className="search-group">
              <label style={{ fontSize: '0.68rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--stone-light)', letterSpacing: '0.05em' }}>Design Style Specialty</label>
              <select
                value={searchStyle}
                onChange={(e) => setSearchStyle(e.target.value)}
                style={{ border: 'none', background: 'transparent', fontSize: '0.95rem', fontWeight: '500', color: 'var(--charcoal)', cursor: 'pointer', outline: 'none', fontFamily: 'var(--font-sans)', width: '100%' }}
              >
                <option value="">All Styles</option>
                <option value="Japandi Minimalism">Japandi Minimalism</option>
                <option value="Modern Luxury">Modern Luxury</option>
                <option value="Mid-Century Organic">Mid-Century Organic</option>
                <option value="Classic Parisian">Classic Parisian</option>
              </select>
            </div>

            {/* Search Button */}
            <button type="submit" className="btn-primary">
              <Search size={16} />
              <span>Search Designers</span>
            </button>
          </form>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" style={{ padding: 'var(--section-pad) 0', background: 'var(--cream)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <span className="section-label">Seamless Process</span>
            <h2 className="section-title">Book a Designer in 3 <em>Steps</em></h2>
            <p style={{ color: 'var(--stone)', fontSize: '0.95rem' }}>We have standardized the interior design lifecycle so you can hire and plan transparently.</p>
          </div>

          <div className="home__steps-grid">
            <div style={{ background: 'var(--white)', padding: '2.5rem', borderBottom: '3px solid var(--gold)', borderRadius: '4px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'rgba(201, 169, 110, 0.12)', color: 'var(--gold-dark)', padding: '1.25rem', borderRadius: '50%' }}>
                <Compass size={28} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--charcoal)', margin: 0 }}>1. Search & Filter</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--stone)', lineHeight: '1.6', margin: 0 }}>
                Explore portfolios of certified designers. Filter by layout specialty, style expertise, rating, and city location.
              </p>
            </div>

            <div style={{ background: 'var(--white)', padding: '2.5rem', borderBottom: '3px solid var(--gold)', borderRadius: '4px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'rgba(201, 169, 110, 0.12)', color: 'var(--gold-dark)', padding: '1.25rem', borderRadius: '50%' }}>
                <Shield size={28} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--charcoal)', margin: 0 }}>2. Compare Packages</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--stone)', lineHeight: '1.6', margin: 0 }}>
                Check individual designer packages, from basic layout concepts to 3D realistic visualizer builds and complete turkey setup.
              </p>
            </div>

            <div style={{ background: 'var(--white)', padding: '2.5rem', borderBottom: '3px solid var(--gold)', borderRadius: '4px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'rgba(201, 169, 110, 0.12)', color: 'var(--gold-dark)', padding: '1.25rem', borderRadius: '50%' }}>
                <Calendar size={28} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--charcoal)', margin: 0 }}>3. Book Consultation</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--stone)', lineHeight: '1.6', margin: 0 }}>
                Select a live schedule slot directly on your matched designer's calendar and secure your styling consultation in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Designers section */}
      <section className="featured-designers" style={{ padding: 'var(--section-pad) 0', background: 'var(--white)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '600px' }}>
              <span className="section-label">Curated Matches</span>
              <h2 className="section-title">Top Rated <em>Specialists</em></h2>
              <p style={{ color: 'var(--stone)', fontSize: '0.95rem', margin: 0 }}>Work with award-winning architects and stylists matched directly from our localized panels.</p>
            </div>
            <div>
              <Link to="/portfolio" className="btn-outline">
                <span>View All Designers</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="awards-showcase__grid">
            {designersData.map((designer) => (
              <div 
                key={designer.id}
                style={{ 
                  border: '1px solid var(--cream-dark)', 
                  borderRadius: '6px', 
                  background: 'var(--white)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s var(--ease)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.02)'
                }}
                className="designer-hover-card"
              >
                <div style={{ position: 'relative', height: '220px' }}>
                  <img src={designer.avatar} alt={designer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ 
                    position: 'absolute', top: '1rem', right: '1rem', 
                    background: 'rgba(255,255,255,0.95)', padding: '0.2rem 0.6rem', 
                    borderRadius: '100px', fontSize: '0.7rem', fontWeight: 'bold', 
                    color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', gap: '0.2rem' 
                  }}>
                    <Star size={12} fill="var(--gold)" color="var(--gold)" />
                    <span>{designer.rating}</span>
                  </div>
                </div>
                
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1 }}>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--charcoal)', margin: '0 0 0.2rem' }}>{designer.name}</h4>
                    <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--stone-light)', fontWeight: 600, letterSpacing: '0.05em' }}>{designer.role}</span>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--stone)', lineHeight: '1.5', margin: 0, flexGrow: 1 }}>
                    {designer.bio}
                  </p>

                  <div style={{ borderTop: '1px solid var(--cream-dark)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--stone)', fontSize: '0.75rem' }}>
                      <MapPin size={12} />
                      <span>{designer.city}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--charcoal)' }}>
                      Starting at <strong style={{ color: 'var(--gold-dark)', fontSize: '0.9rem' }}>₹{designer.startingRate.toLocaleString('en-IN')}</strong>
                    </span>
                  </div>

                  <Link to={`/designer/${designer.id}`} className="btn-primary" style={{ justifyContent: 'center', padding: '0.75rem', fontSize: '0.72rem', width: '100%' }}>
                    <span>Book Designer</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Browse by Design Styles */}
      <section className="styles-explore" style={{ padding: 'var(--section-pad) 0', background: 'var(--cream)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <span className="section-label">Explore Curation</span>
            <h2 className="section-title">Design Style <em>Guilds</em></h2>
            <p style={{ color: 'var(--stone)', fontSize: '0.95rem' }}>Select a design school to view matched specialists and conceptual layouts.</p>
          </div>

          <div className="portfolio-teaser__grid">
            {[
              { label: 'Japandi Minimalism', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80', desc: 'Japanese simplicity meets Nordic warmth.' },
              { label: 'Modern Luxury', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80', desc: 'Opulent metals, marbles, and integrations.' },
              { label: 'Mid-Century Organic', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80', desc: 'Warm structural teak woods and retro profiles.' },
              { label: 'Classic Parisian', img: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&q=80', desc: 'Crown moldings, vintage mirrors, and rich velvets.' }
            ].map((styleItem) => (
              <div 
                key={styleItem.label}
                onClick={() => navigate('/portfolio', { state: { style: styleItem.label } })}
                style={{ overflow: 'hidden', position: 'relative', height: '300px', borderRadius: '4px', cursor: 'pointer' }}
                className="style-category-card"
              >
                <img src={styleItem.img} alt={styleItem.label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s var(--ease)' }} className="zoom-img" />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(18,16,12,0.95) 0%, rgba(18,16,12,0.4) 60%, transparent 100%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem'
                }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--white)', margin: '0 0 0.25rem' }}>{styleItem.label}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>{styleItem.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

    </div>
  );
}
