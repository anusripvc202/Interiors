import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MapPin, Star, Compass, DollarSign, Award, Grid, ArrowRight } from 'lucide-react';
import { designersData } from '../data/designersData';
import PageHero from '../components/PageHero/PageHero';

export default function PortfolioPage() {
  const location = useLocation();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [sortBy, setSortBy] = useState('rating'); // rating, price-low, price-high

  // Set initial filters from Home page search state if navigated with state
  useEffect(() => {
    if (location.state) {
      if (location.state.city) setSelectedCity(location.state.city);
      if (location.state.style) setSelectedStyle(location.state.style);
    }
  }, [location.state]);

  // Filter and Sort logic
  const getFilteredDesigners = () => {
    let list = [...designersData];

    if (selectedCity) {
      list = list.filter(d => d.city.toLowerCase() === selectedCity.toLowerCase());
    }

    if (selectedStyle) {
      list = list.filter(d => d.style.toLowerCase() === selectedStyle.toLowerCase());
    }

    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      list.sort((a, b) => a.startingRate - b.startingRate);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.startingRate - a.startingRate);
    }

    return list;
  };

  const filteredDesigners = getFilteredDesigners();

  return (
    <div>
      <PageHero 
        title="Find Verified Designers" 
        subtitle="Compare expert stylists, view visual concepts, and schedule consultations." 
        bgImage="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=85&auto=format&fit=crop" 
      />

      {/* Directory Filter Bar Section */}
      <section className="marketplace-directory" style={{ padding: '4rem 0 6rem', background: 'var(--cream)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* Filters Panel */}
          <div style={{ 
            background: 'var(--white)', 
            padding: '1.5rem', 
            borderRadius: '6px', 
            border: '1px solid rgba(201, 169, 110, 0.2)',
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            boxShadow: '0 8px 30px rgba(0,0,0,0.02)'
          }}>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', flexGrow: 1 }}>
              {/* City Filter */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minWidth: '180px' }}>
                <label style={{ fontSize: '0.65rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--stone-light)', letterSpacing: '0.05em' }}>Location</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  style={{ padding: '0.6rem', border: '1px solid var(--cream-dark)', background: 'var(--cream)', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--charcoal)', outline: 'none' }}
                >
                  <option value="">All Locations</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>

              {/* Style Filter */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minWidth: '220px' }}>
                <label style={{ fontSize: '0.65rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--stone-light)', letterSpacing: '0.05em' }}>Design Style</label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  style={{ padding: '0.6rem', border: '1px solid var(--cream-dark)', background: 'var(--cream)', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--charcoal)', outline: 'none' }}
                >
                  <option value="">All Styles</option>
                  <option value="Japandi Minimalism">Japandi Minimalism</option>
                  <option value="Modern Luxury">Modern Luxury</option>
                  <option value="Mid-Century Organic">Mid-Century Organic</option>
                  <option value="Classic Parisian">Classic Parisian</option>
                </select>
              </div>
            </div>

            {/* Sort Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minWidth: '180px' }}>
              <label style={{ fontSize: '0.65rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--stone-light)', letterSpacing: '0.05em' }}>Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '0.6rem', border: '1px solid var(--cream-dark)', background: 'var(--cream)', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--charcoal)', outline: 'none' }}
              >
                <option value="rating">Highest Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Results Summary */}
          <div style={{ fontSize: '0.9rem', color: 'var(--stone)' }}>
            Showing <strong>{filteredDesigners.length}</strong> matching designers
            {(selectedCity || selectedStyle) && (
              <span> for {selectedCity && <span><strong>{selectedCity}</strong></span>} {selectedStyle && <span><strong>{selectedStyle}</strong></span>}</span>
            )}
          </div>

          {/* Designers Directory Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {filteredDesigners.map(designer => (
              <div 
                key={designer.id}
                style={{
                  background: 'var(--white)',
                  border: '1px solid rgba(201, 169, 110, 0.2)',
                  borderRadius: '8px',
                  padding: '2.5rem',
                  display: 'grid',
                  gridTemplateColumns: '300px 1fr',
                  gap: '3rem',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
                  alignItems: 'start'
                }}
                className="directory-designer-card"
              >
                {/* Designer Profile Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    <img 
                      src={designer.avatar} 
                      alt={designer.name} 
                      style={{ width: '5.5rem', height: '5.5rem', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--cream-dark)' }} 
                    />
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--charcoal)', margin: '0 0 0.2rem' }}>{designer.name}</h3>
                      <span style={{ fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--stone-light)', letterSpacing: '0.05em' }}>{designer.role}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', borderTop: '1px solid var(--cream-dark)', borderBottom: '1px solid var(--cream-dark)', padding: '1rem 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                      <span style={{ color: 'var(--stone)' }}>Location</span>
                      <strong style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--charcoal)' }}>
                        <MapPin size={12} /> {designer.city}
                      </strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                      <span style={{ color: 'var(--stone)' }}>Design Style</span>
                      <strong style={{ color: 'var(--gold-dark)' }}>{designer.style}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                      <span style={{ color: 'var(--stone)' }}>Experience</span>
                      <strong style={{ color: 'var(--charcoal)' }}>{designer.experience}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', alignItems: 'center' }}>
                      <span style={{ color: 'var(--stone)' }}>Rating</span>
                      <strong style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--charcoal)' }}>
                        <Star size={12} fill="var(--gold)" color="var(--gold)" />
                        {designer.rating} ({designer.reviewsCount} reviews)
                      </strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--stone)' }}>Starting Rate</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--charcoal)' }}>
                      <strong style={{ color: 'var(--gold-dark)', fontSize: '1.5rem' }}>₹{designer.startingRate.toLocaleString('en-IN')}</strong> / project
                    </span>
                  </div>

                  <Link to={`/designer/${designer.id}`} className="btn-primary" style={{ justifyContent: 'center', padding: '0.9rem', fontSize: '0.78rem', marginTop: '0.5rem' }}>
                    <span>Book Consultation</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Designer Visual Bio & Portfolio Work */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--stone-light)', letterSpacing: '0.1em', margin: '0 0 0.5rem' }}>Professional Bio</h4>
                    <p style={{ color: 'var(--stone)', fontSize: '0.92rem', lineHeight: '1.7', margin: 0 }}>
                      "{designer.bio} Every design project starts with a detailed custom layout assessment and materials analysis to ensure full alignment with client requirements."
                    </p>
                  </div>

                  {/* Portfolio Gallery Thumbnails */}
                  <div>
                    <h4 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--stone-light)', letterSpacing: '0.1em', margin: '0 0 0.75rem' }}>Sample Designs</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                      {designer.portfolio.map((work, idx) => (
                        <div key={idx} style={{ position: 'relative', height: '160px', overflow: 'hidden', borderRadius: '4px' }} className="portfolio-thumb-card">
                          <img 
                            src={work.image} 
                            alt={work.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s var(--ease)' }} 
                          />
                          <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                            display: 'flex', alignItems: 'flex-end', padding: '0.75rem'
                          }}>
                            <span style={{ fontSize: '0.68rem', color: 'var(--white)', fontWeight: 500 }}>{work.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ))}

            {filteredDesigners.length === 0 && (
              <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--white)', border: '1px solid var(--cream-dark)', borderRadius: '6px' }}>
                <Compass size={40} style={{ color: 'var(--gold)', marginBottom: '1rem' }} />
                <h3>No designers found matching these parameters</h3>
                <p style={{ color: 'var(--stone)', marginTop: '0.5rem' }}>Try clearing your filters or choosing a different city.</p>
                <button 
                  onClick={() => { setSelectedCity(''); setSelectedStyle(''); }}
                  className="btn-outline" 
                  style={{ marginTop: '1.5rem' }}
                >
                  <span>Reset Filters</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
