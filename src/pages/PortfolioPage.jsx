import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MapPin, Star, Compass, DollarSign, Award, Grid, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import PageHero from '../components/PageHero/PageHero';
import '../components/Portfolio/Portfolio.css';

const quizQuestions = [
  {
    step: 1,
    question: "What color palette makes you feel most at home?",
    options: [
      { key: 'A', text: "Soft neutral creams, warm oak, and clay beige", style: "Japandi Minimalism" },
      { key: 'B', text: "Deep charcoal, rich marble patterns, and brushed gold", style: "Modern Luxury" },
      { key: 'C', text: "Warm walnut wood, forest green, and mustard accents", style: "Mid-Century Organic" },
      { key: 'D', text: "Pristine white moldings, soft velvet pinks, and vintage gold mirrors", style: "Classic Parisian" }
    ]
  },
  {
    step: 2,
    question: "What is your preferred living room layout structure?",
    options: [
      { key: 'A', text: "Low-profile furniture with plenty of open, clean floor space", style: "Japandi Minimalism" },
      { key: 'B', text: "Grand ceilings, integrated smart lighting, and marble columns", style: "Modern Luxury" },
      { key: 'C', text: "Organic curves, retro wood cabinetry, and leafy indoor plants", style: "Mid-Century Organic" },
      { key: 'D', text: "Elegant crown panels, tall glass windows, and a decorative mantle", style: "Classic Parisian" }
    ]
  },
  {
    step: 3,
    question: "Select your favorite decorative accessory:",
    options: [
      { key: 'A', text: "Handmade ceramic vases and simple dried reeds", style: "Japandi Minimalism" },
      { key: 'B', text: "A large backlit marble feature wall and sleek sculpture", style: "Modern Luxury" },
      { key: 'C', text: "A classic mid-century lounge chair and fiddle-leaf fig", style: "Mid-Century Organic" },
      { key: 'D', text: "An ornate carved mirror frame and crystal chandelier", style: "Classic Parisian" }
    ]
  }
];

export default function PortfolioPage() {
  const { designersList } = useAuth();
  const location = useLocation();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [sortBy, setSortBy] = useState('rating'); // rating, price-low, price-high
  
  // Quiz State
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [hoveredOpt, setHoveredOpt] = useState(null);

  // Designer Comparison State
  const [comparedDesignerIds, setComparedDesignerIds] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleCompareToggle = (designerId) => {
    if (comparedDesignerIds.includes(designerId)) {
      setComparedDesignerIds(comparedDesignerIds.filter(id => id !== designerId));
    } else {
      if (comparedDesignerIds.length >= 3) {
        alert("You can compare up to 3 designers at a time.");
        return;
      }
      setComparedDesignerIds([...comparedDesignerIds, designerId]);
    }
  };

  const handleQuizAnswer = (questionKey, styleValue) => {
    const newAnswers = { ...quizAnswers, [questionKey]: styleValue };
    setQuizAnswers(newAnswers);

    if (quizStep < 3) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate result based on style frequency
      const counts = {};
      let matchedStyle = 'Japandi Minimalism';
      let maxCount = 0;

      Object.values(newAnswers).forEach((style) => {
        counts[style] = (counts[style] || 0) + 1;
        if (counts[style] > maxCount) {
          maxCount = counts[style];
          matchedStyle = style;
        }
      });

      setSelectedStyle(matchedStyle);
      setQuizStep(4); // Match complete
    }
  };

  // Set initial filters from Home page search state if navigated with state
  useEffect(() => {
    if (location.state) {
      if (location.state.city) setSelectedCity(location.state.city);
      if (location.state.style) setSelectedStyle(location.state.style);
    }
  }, [location.state]);

  // Filter and Sort logic
  const getFilteredDesigners = () => {
    let list = [...designersList];

    if (selectedCity) {
      list = list.filter(d => d.city.toLowerCase() === selectedCity.toLowerCase());
    }

    if (selectedStyle) {
      list = list.filter(d => d.style.toLowerCase() === selectedStyle.toLowerCase());
    }

    if (selectedPriceRange) {
      if (selectedPriceRange === 'budget') {
        list = list.filter(d => d.startingRate <= 15000);
      } else if (selectedPriceRange === 'moderate') {
        list = list.filter(d => d.startingRate > 15000 && d.startingRate <= 20000);
      } else if (selectedPriceRange === 'luxury') {
        list = list.filter(d => d.startingRate > 20000);
      }
    }

    if (selectedExperience) {
      if (selectedExperience === 'rising') {
        list = list.filter(d => parseInt(d.experience) < 8);
      } else if (selectedExperience === 'mid') {
        list = list.filter(d => {
          const yrs = parseInt(d.experience);
          return yrs >= 8 && yrs <= 10;
        });
      } else if (selectedExperience === 'senior') {
        list = list.filter(d => parseInt(d.experience) > 10);
      }
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
        title={<>Find Verified <em>Designers</em></>} 
        subtitle="Compare expert stylists, view visual concepts, and schedule consultations." 
        bgImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85&auto=format&fit=crop" 
        theme="portfolio"
        breadcrumb="Find Designers"
      />

      {/* Directory Filter Bar Section */}
      <section className="marketplace-directory" style={{ padding: '4rem 0 6rem', background: 'var(--bg-dark)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* Style Finder Banner */}
          <div className="portfolio__style-finder-banner">
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
              <span className="section-label" style={{ color: 'var(--gold-light)' }}>Style Finder</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', margin: '0.25rem 0 0.5rem', fontWeight: 400 }}>Not sure which design style suits your space?</h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', margin: 0 }}>
                Take our quick 3-step visual style personality quiz to discover your ideal interior aesthetic and instantly view matched specialists.
              </p>
            </div>
            <button 
              onClick={() => setIsQuizOpen(true)}
              className="btn-primary" 
              style={{ position: 'relative', zIndex: 2, background: 'var(--gold)', color: 'var(--white)', border: 'none', cursor: 'pointer' }}
            >
              <span>Match My Style</span>
              <ArrowRight size={14} />
            </button>
            <div style={{
              position: 'absolute', right: '-30px', top: '-30px',
              width: '150px', height: '150px', borderRadius: '50%',
              background: 'rgba(201, 169, 110, 0.06)', filter: 'blur(20px)'
            }} />
          </div>
          
          {/* Filters Panel */}
          <div className="portfolio__filter-bar">
            
            <div className="portfolio__filter-group">
              {/* City Filter */}
              <div className="portfolio__filter-item">
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
                  <option value="Jubilee Hills">Jubilee Hills</option>
                  <option value="Banjara Hills">Banjara Hills</option>
                </select>
              </div>

              {/* Style Filter */}
              <div className="portfolio__filter-item portfolio__filter-item--wide">
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

              {/* Price Range Filter */}
              <div className="portfolio__filter-item">
                <label style={{ fontSize: '0.65rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--stone-light)', letterSpacing: '0.05em' }}>Starting Fee</label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  style={{ padding: '0.6rem', border: '1px solid var(--cream-dark)', background: 'var(--cream)', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--charcoal)', outline: 'none' }}
                >
                  <option value="">All Budgets</option>
                  <option value="budget">Budget-Friendly (≤ ₹15k)</option>
                  <option value="moderate">Mid-Range (₹15k - ₹20k)</option>
                  <option value="luxury">Premium Tiers (&gt; ₹20k)</option>
                </select>
              </div>

              {/* Experience Filter */}
              <div className="portfolio__filter-item">
                <label style={{ fontSize: '0.65rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--stone-light)', letterSpacing: '0.05em' }}>Experience</label>
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  style={{ padding: '0.6rem', border: '1px solid var(--cream-dark)', background: 'var(--cream)', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--charcoal)', outline: 'none' }}
                >
                  <option value="">All Experience</option>
                  <option value="rising">Rising Talent (&lt; 8 Years)</option>
                  <option value="mid">Senior Specialist (8 - 10 Years)</option>
                  <option value="senior">Design Director (10+ Years)</option>
                </select>
              </div>
            </div>

            {/* Sort Panel */}
            <div className="portfolio__filter-item">
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

          <div style={{ fontSize: '0.9rem', color: 'var(--stone)' }}>
            Showing <strong>{filteredDesigners.length}</strong> matching designers
            {(selectedCity || selectedStyle || selectedPriceRange || selectedExperience) && (
              <span> for {selectedCity && <span><strong>{selectedCity}</strong></span>} {selectedStyle && <span><strong>{selectedStyle}</strong></span>} {selectedPriceRange && <span><strong>{selectedPriceRange} budget</strong></span>} {selectedExperience && <span><strong>{selectedExperience} experience</strong></span>}</span>
            )}
          </div>

          {/* Designers Directory Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {filteredDesigners.map(designer => (
              <div 
                key={designer.id}
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

                  {/* Compare Toggle */}
                  <div 
                    onClick={(e) => {
                      e.preventDefault();
                      handleCompareToggle(designer.id);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      marginTop: '0.4rem',
                      color: comparedDesignerIds.includes(designer.id) ? 'var(--gold-dark)' : 'var(--stone-light)',
                      fontWeight: comparedDesignerIds.includes(designer.id) ? '600' : 'normal',
                      transition: 'color 0.2s',
                      userSelect: 'none'
                    }}
                  >
                    <div style={{
                      width: '14px',
                      height: '14px',
                      border: '1.5px solid var(--stone-light)',
                      borderRadius: '3px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: comparedDesignerIds.includes(designer.id) ? 'var(--gold)' : 'transparent',
                      borderColor: comparedDesignerIds.includes(designer.id) ? 'var(--gold)' : 'var(--stone-light)',
                      flexShrink: 0
                    }}>
                      {comparedDesignerIds.includes(designer.id) && <Check size={8} color="var(--white)" />}
                    </div>
                    <span>{comparedDesignerIds.includes(designer.id) ? 'Added to Compare' : 'Compare Designer'}</span>
                  </div>

                  <Link to={`/designer/${designer.id}`} className="btn-primary" style={{ justifyContent: 'center', padding: '0.9rem', fontSize: '0.78rem', marginTop: '0.75rem' }}>
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
                    <div className="portfolio-thumbs-grid">
                      {designer.portfolio?.map((work, idx) => (
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
              <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                <Compass size={40} style={{ color: 'var(--gold)', marginBottom: '1rem' }} />
                <h3>No designers found matching these parameters</h3>
                <p style={{ color: 'var(--stone)', marginTop: '0.5rem' }}>Try clearing your filters or choosing a different city.</p>
                <button 
                  onClick={() => { setSelectedCity(''); setSelectedStyle(''); setSelectedPriceRange(''); setSelectedExperience(''); }}
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

      {/* Quiz Modal Overlay */}
      {isQuizOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(26, 24, 20, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '3rem 2.5rem',
            maxWidth: '550px',
            width: '100%',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button 
              onClick={() => { setIsQuizOpen(false); setQuizStep(1); setQuizAnswers({ q1: '', q2: '', q3: '' }); }}
              style={{
                position: 'absolute', top: '1.25rem', right: '1.5rem',
                border: 'none', background: 'transparent', fontSize: '1.75rem',
                cursor: 'pointer', color: 'var(--stone-light)', transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--charcoal)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--stone-light)'}
            >
              &times;
            </button>

            {quizStep <= 3 ? (
              <div>
                <span className="section-label" style={{ marginBottom: '0.75rem' }}>Question {quizStep} of 3</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--charcoal)', margin: '0 0 1.5rem', fontWeight: 400 }}>
                  {quizQuestions[quizStep - 1].question}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {quizQuestions[quizStep - 1].options.map((opt) => (
                    <div 
                      key={opt.key}
                      onClick={() => handleQuizAnswer(`q${quizStep}`, opt.style)}
                      onMouseEnter={() => setHoveredOpt(opt.key)}
                      onMouseLeave={() => setHoveredOpt(null)}
                      style={{
                        border: '1px solid var(--cream-dark)',
                        borderRadius: '4px',
                        padding: '1.1rem 1.25rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: hoveredOpt === opt.key ? 'rgba(124, 58, 237, 0.15)' : 'var(--bg-card-2)',
                        borderColor: hoveredOpt === opt.key ? 'var(--purple-light)' : 'var(--border)',
                        boxShadow: hoveredOpt === opt.key ? '0 4px 12px rgba(201, 169, 110, 0.15)' : 'none',
                        color: 'var(--charcoal)'
                      }}
                    >
                      <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{opt.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Compass size={48} style={{ color: 'var(--gold)', marginBottom: '1.5rem', animation: 'spin 10s linear infinite' }} />
                <span className="section-label" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}>Your Aesthetic Match</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: 'var(--charcoal)', margin: '0 0 1rem', fontWeight: 400 }}>
                  {selectedStyle}
                </h3>
                <p style={{ color: 'var(--stone)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '2rem', margin: '0 0 2rem' }}>
                  Based on your preferences, your design personality is heavily aligned with <strong>{selectedStyle}</strong>. We have updated your filters to highlight designers who specialize in this specific visual aesthetic.
                </p>
                <button 
                  onClick={() => { setIsQuizOpen(false); setQuizStep(1); setQuizAnswers({ q1: '', q2: '', q3: '' }); }}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Explore Matched Designers</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Compare Bar */}
      {comparedDesignerIds.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--charcoal)',
          color: 'var(--white)',
          padding: '1rem 2rem',
          borderRadius: '100px',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          zIndex: 900,
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          border: '1px solid rgba(201, 169, 110, 0.3)',
          animation: 'fadeInUp 0.3s ease-out',
          whiteSpace: 'nowrap'
        }}>
          <span style={{ fontSize: '0.85rem' }}>
            Selected <strong>{comparedDesignerIds.length}</strong> {comparedDesignerIds.length === 1 ? 'designer' : 'designers'}
          </span>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button 
              onClick={() => setShowComparison(true)}
              className="btn-primary" 
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.72rem', background: 'var(--gold)', border: 'none', cursor: 'pointer', opacity: comparedDesignerIds.length < 2 ? 0.6 : 1 }}
              disabled={comparedDesignerIds.length < 2}
            >
              <span>Compare Now</span>
            </button>
            <button 
              onClick={() => setComparedDesignerIds([])}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Comparison Modal Overlay */}
      {showComparison && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(26, 24, 20, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '3rem 2.5rem',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button 
              onClick={() => setShowComparison(false)}
              style={{
                position: 'absolute', top: '1.25rem', right: '1.5rem',
                border: 'none', background: 'transparent', fontSize: '1.75rem',
                cursor: 'pointer', color: 'var(--stone-light)', transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--charcoal)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--stone-light)'}
            >
              &times;
            </button>

            <span className="section-label" style={{ marginBottom: '0.5rem' }}>Compare Specialists</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--charcoal)', margin: '0 0 2rem', fontWeight: 400 }}>
              Side-by-Side Comparison
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--cream-dark)' }}>
                    <th style={{ padding: '1rem', color: 'var(--stone-light)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Criteria</th>
                    {comparedDesignerIds.map(id => {
                      const d = designersList.find(designer => designer.id === id);
                      return (
                        <th key={id} style={{ padding: '1rem', minWidth: '180px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img src={d?.avatar} alt={d?.name} style={{ width: '3rem', height: '3rem', borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                              <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--charcoal)' }}>{d?.name}</strong>
                              <span style={{ fontSize: '0.72rem', color: 'var(--stone-light)' }}>{d?.role}</span>
                            </div>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--cream-dark)' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--stone)' }}>Design Aesthetic</td>
                    {comparedDesignerIds.map(id => {
                      const d = designersList.find(designer => designer.id === id);
                      return <td key={id} style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--gold-dark)', fontWeight: 'bold' }}>{d?.style}</td>;
                    })}
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--cream-dark)' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--stone)' }}>Experience</td>
                    {comparedDesignerIds.map(id => {
                      const d = designersList.find(designer => designer.id === id);
                      return <td key={id} style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--charcoal)' }}>{d?.experience}</td>;
                    })}
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--cream-dark)' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--stone)' }}>Location</td>
                    {comparedDesignerIds.map(id => {
                      const d = designersList.find(designer => designer.id === id);
                      return <td key={id} style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--charcoal)' }}>{d?.city}</td>;
                    })}
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--cream-dark)' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--stone)' }}>Client Rating</td>
                    {comparedDesignerIds.map(id => {
                      const d = designersList.find(designer => designer.id === id);
                      return (
                        <td key={id} style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--charcoal)' }}>
                          <span style={{ color: 'var(--gold)' }}>★</span> {d?.rating} ({d?.reviewsCount} reviews)
                        </td>
                      );
                    })}
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--cream-dark)' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--stone)' }}>Starting Rate</td>
                    {comparedDesignerIds.map(id => {
                      const d = designersList.find(designer => designer.id === id);
                      return <td key={id} style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--charcoal)', fontWeight: 'bold' }}>₹{d?.startingRate.toLocaleString('en-IN')}</td>;
                    })}
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--cream-dark)' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--stone)' }}>Essential Plan</td>
                    {comparedDesignerIds.map(id => {
                      const d = designersList.find(designer => designer.id === id);
                      const p = d?.packages.find(pkg => pkg.id === 'essential');
                      return <td key={id} style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--charcoal)' }}>₹{p?.price.toLocaleString('en-IN')} <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--stone-light)' }}>({p?.hours} hrs, {p?.designers} designer)</span></td>;
                    })}
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--cream-dark)' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--stone)' }}>Premium Plan</td>
                    {comparedDesignerIds.map(id => {
                      const d = designersList.find(designer => designer.id === id);
                      const p = d?.packages.find(pkg => pkg.id === 'premium');
                      return <td key={id} style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--charcoal)' }}>₹{p?.price.toLocaleString('en-IN')} <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--stone-light)' }}>({p?.hours} hrs, {p?.designers} designers)</span></td>;
                    })}
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--cream-dark)' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--stone)' }}>Luxury Plan</td>
                    {comparedDesignerIds.map(id => {
                      const d = designersList.find(designer => designer.id === id);
                      const p = d?.packages.find(pkg => pkg.id === 'luxury');
                      return <td key={id} style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--charcoal)' }}>₹{p?.price.toLocaleString('en-IN')} <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--stone-light)' }}>({p?.hours} hrs, {p?.designers} designers)</span></td>;
                    })}
                  </tr>
                  <tr>
                    <td style={{ padding: '1.5rem 1rem 1rem' }}></td>
                    {comparedDesignerIds.map(id => {
                      return (
                        <td key={id} style={{ padding: '1.5rem 1rem 1rem' }}>
                          <Link 
                            to={`/designer/${id}`} 
                            className="btn-primary" 
                            style={{ padding: '0.6rem 1rem', fontSize: '0.72rem', display: 'inline-flex', width: '100%', justifyContent: 'center' }}
                            onClick={() => setShowComparison(false)}
                          >
                            <span>Book Consultation</span>
                          </Link>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
