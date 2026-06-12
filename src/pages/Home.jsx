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
        position: 'relative',
        minHeight: '75vh', 
        justifyContent: 'center', 
        paddingTop: '10rem', 
        paddingBottom: '5rem',
        backgroundImage: 'linear-gradient(to bottom, rgba(243, 248, 245, 0.85) 0%, rgba(243, 248, 245, 0.98) 100%), url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'var(--white)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '2.5rem', alignItems: 'center', textAlign: 'center' }}>
          
          <div style={{ maxWidth: '850px' }}>
            <span className="section-label" style={{ justifyContent: 'center' }}>Book Verified Designers</span>
            <h1 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)', 
              fontWeight: '400', 
              lineHeight: '1.1', 
              color: 'var(--white)',
              marginTop: '1rem',
              marginBottom: '1.5rem' 
            }}>
              Find the Perfect Interior Designer for Every <em style={{ fontStyle: 'italic', background: 'var(--grad-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Space</em>
            </h1>
            <p style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', 
              color: 'var(--text-muted)',
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
              <label style={{ fontSize: '0.68rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Select Location</label>
              <select 
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                style={{ border: 'none', background: 'transparent', fontSize: '0.95rem', fontWeight: '500', color: 'var(--white)', cursor: 'pointer', outline: 'none', fontFamily: 'var(--font-sans)', width: '100%' }}
              >
                <option value="" style={{ background: '#ffffff', color: '#1a2b22' }}>All Cities (India)</option>
                <option value="Bangalore" style={{ background: '#ffffff', color: '#1a2b22' }}>Bangalore</option>
                <option value="Mumbai" style={{ background: '#ffffff', color: '#1a2b22' }}>Mumbai</option>
                <option value="Delhi" style={{ background: '#ffffff', color: '#1a2b22' }}>Delhi</option>
                <option value="Jubilee Hills" style={{ background: '#ffffff', color: '#1a2b22' }}>Jubilee Hills</option>
                <option value="Banjara Hills" style={{ background: '#ffffff', color: '#1a2b22' }}>Banjara Hills</option>
              </select>
            </div>

            <div className="search-divider" />

            {/* Style Selection */}
            <div className="search-group">
              <label style={{ fontSize: '0.68rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Design Style Specialty</label>
              <select
                value={searchStyle}
                onChange={(e) => setSearchStyle(e.target.value)}
                style={{ border: 'none', background: 'transparent', fontSize: '0.95rem', fontWeight: '500', color: 'var(--white)', cursor: 'pointer', outline: 'none', fontFamily: 'var(--font-sans)', width: '100%' }}
              >
                <option value="" style={{ background: '#ffffff', color: '#1a2b22' }}>All Styles</option>
                <option value="Japandi Minimalism" style={{ background: '#ffffff', color: '#1a2b22' }}>Japandi Minimalism</option>
                <option value="Modern Luxury" style={{ background: '#ffffff', color: '#1a2b22' }}>Modern Luxury</option>
                <option value="Mid-Century Organic" style={{ background: '#ffffff', color: '#1a2b22' }}>Mid-Century Organic</option>
                <option value="Classic Parisian" style={{ background: '#ffffff', color: '#1a2b22' }}>Classic Parisian</option>
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
      <section className="how-it-works" style={{ padding: 'var(--section-pad) 0', background: 'var(--bg-card)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <span className="section-label">Seamless Process</span>
            <h2 className="section-title">Book a Designer in 3 <em>Steps</em></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>We have standardized the interior design lifecycle so you can hire and plan transparently.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            gap: '4rem',
            alignItems: 'center'
          }} className="home__process-split">
            {/* Left Column: Premium Interior Image */}
            <div style={{ 
              position: 'relative', 
              borderRadius: '16px', 
              overflow: 'hidden', 
              height: '520px', 
              border: '1px solid rgba(27,154,89,0.15)', 
              boxShadow: 'var(--shadow-purple)' 
            }}>
              <img 
                src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&q=80" 
                alt="Oak & Clay Kitchen" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(27,154,89,0.15) 0%, transparent 100%)'
              }} />
            </div>

            {/* Right Column: Process Steps List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Step 1 */}
              <div style={{ 
                background: 'rgba(27,154,89,0.04)', 
                padding: '1.75rem 2rem', 
                borderRadius: '14px', 
                border: '1px solid rgba(27,154,89,0.12)',
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.5rem',
                textAlign: 'left',
                transition: 'all 0.3s'
              }}>
                <div style={{ background: 'rgba(27,154,89,0.08)', color: 'var(--purple-light)', padding: '1rem', borderRadius: '50%', border: '1px solid rgba(27,154,89,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Compass size={24} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--white)', margin: '0 0 0.3rem' }}>1. Search & Filter</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                    Explore portfolios of certified designers. Filter by layout specialty, style expertise, rating, and city location.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div style={{ 
                background: 'rgba(34,197,94,0.04)', 
                padding: '1.75rem 2rem', 
                borderRadius: '14px', 
                border: '1px solid rgba(34,197,94,0.12)',
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.5rem',
                textAlign: 'left',
                transition: 'all 0.3s'
              }}>
                <div style={{ background: 'rgba(34,197,94,0.08)', color: 'var(--blue-light)', padding: '1rem', borderRadius: '50%', border: '1px solid rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Shield size={24} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--white)', margin: '0 0 0.3rem' }}>2. Compare Packages</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                    Check individual designer packages, from basic layout concepts to 3D realistic visualizer builds and complete turnkey setup.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div style={{ 
                background: 'rgba(16,185,129,0.04)', 
                padding: '1.75rem 2rem', 
                borderRadius: '14px', 
                border: '1px solid rgba(16,185,129,0.12)',
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.5rem',
                textAlign: 'left',
                transition: 'all 0.3s'
              }}>
                <div style={{ background: 'rgba(16,185,129,0.08)', color: 'var(--teal-light)', padding: '1rem', borderRadius: '50%', border: '1px solid rgba(16,185,129,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Calendar size={24} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--white)', margin: '0 0 0.3rem' }}>3. Book Consultation</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                    Select a live schedule slot directly on your matched designer's calendar and secure your styling consultation in minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Designers section */}
      <section className="featured-designers" style={{ padding: 'var(--section-pad) 0', background: 'var(--bg-dark)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '600px' }}>
              <span className="section-label">Curated Matches</span>
              <h2 className="section-title">Top Rated <em>Specialists</em></h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>Work with award-winning architects and stylists matched directly from our localized panels.</p>
            </div>
            <div>
              <Link to="/portfolio" className="btn-outline">
                <span>View All Designers</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="awards-showcase__grid">
            {designersData.slice(0, 5).map((designer) => (
              <div 
                key={designer.id}
                style={{ 
                  border: '1px solid rgba(27,154,89,0.15)', 
                  borderRadius: '14px', 
                  background: '#ffffff',
                  boxShadow: 'var(--shadow-purple)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s var(--ease)',
                  backdropFilter: 'blur(10px)',
                }}
                className="designer-hover-card"
              >
                <div style={{ position: 'relative', height: '220px' }}>
                  <img src={designer.avatar} alt={designer.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.95) saturate(1.1)' }} />
                  <div style={{ 
                    position: 'absolute', top: '1rem', right: '1rem', 
                    background: 'rgba(27,154,89,0.85)', padding: '0.2rem 0.7rem', 
                    borderRadius: '100px', fontSize: '0.72rem', fontWeight: 'bold', 
                    color: '#fff', display: 'flex', alignItems: 'center', gap: '0.3rem',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    <Star size={11} fill="#fff" color="#fff" />
                    <span>{designer.rating}</span>
                  </div>
                </div>
                
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1 }}>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--white)', margin: '0 0 0.25rem' }}>{designer.name}</h4>
                    <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--purple-light)', fontWeight: 700, letterSpacing: '0.08em' }}>{designer.role}</span>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.55', margin: 0, flexGrow: 1 }}>
                    {designer.bio}
                  </p>

                  <div style={{ borderTop: '1px solid rgba(27,154,89,0.15)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      <MapPin size={12} />
                      <span>{designer.city}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-sub)' }}>
                      Starting at <strong style={{ color: 'var(--teal-light)', fontSize: '0.9rem' }}>₹{designer.startingRate.toLocaleString('en-IN')}</strong>
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
      <section className="styles-explore" style={{ padding: 'var(--section-pad) 0', background: 'var(--bg-card)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <span className="section-label">Explore Curation</span>
            <h2 className="section-title">Design Style <em>Guilds</em></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Select a design school to view matched specialists and conceptual layouts.</p>
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
                style={{ overflow: 'hidden', position: 'relative', height: '300px', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(27,154,89,0.15)' }}
                className="style-category-card"
              >
                <img src={styleItem.img} alt={styleItem.label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s var(--ease)', filter: 'brightness(0.8) saturate(1.1)' }} className="zoom-img" />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(27,154,89,0.95) 0%, rgba(27,154,89,0.45) 55%, transparent 100%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem'
                }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--white)', margin: '0 0 0.25rem' }}>{styleItem.label}</h4>
                  <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', margin: 0 }}>{styleItem.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Inspirations Gallery */}
      <section className="curated-inspirations" style={{ padding: 'var(--section-pad) 0', background: 'var(--bg-card-2)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <span className="section-label">Design Gallery</span>
            <h2 className="section-title">Bespoke Interior <em>Curations</em></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>A preview of our designers' premium work, showcasing signature styles and living environments.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem'
          }} className="home__inspirations-grid">
            {[
              { title: 'Minimalist Salon', img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&q=80', desc: 'Serene Japandi layouts focused on natural textures and balance.' },
              { title: 'Culinary Hearth', img: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&q=80', desc: 'Bespoke marble islands paired with functional oak storage cabinetry.' },
              { title: 'Suite Retreat', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80', desc: 'Luxurious organic mid-century bedrooms with integrated warm vanity layouts.' }
            ].map((item, index) => (
              <div 
                key={index}
                style={{ 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  background: '#ffffff',
                  border: '1px solid rgba(27,154,89,0.12)', 
                  boxShadow: 'var(--shadow-purple)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s var(--ease)'
                }}
                className="inspiration-card"
              >
                <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    className="zoom-img"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(27,154,89,0.03)' }} />
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--white)', margin: 0 }}>{item.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.55', margin: 0 }}>{item.desc}</p>
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
