import { useState } from 'react';
import Portfolio from '../components/Portfolio/Portfolio';
import PageHero from '../components/PageHero/PageHero';

export default function PortfolioPage() {
  const [showAfter, setShowAfter] = useState(true);

  // Unsplash photos for comparison: Before (concrete/empty) vs After (fully luxury furnished)
  const imgBefore = "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1000&q=80"; // industrial empty space
  const imgAfter = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80"; // fully furnished luxury lounge

  return (
    <div>
      <PageHero 
        title="Selected Works" 
        subtitle="A curated showcase of residential, commercial, and hospitality designs." 
        bgImage="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=85&auto=format&fit=crop" 
      />
      <Portfolio />

      {/* Interactive Before/After Renovation Slider */}
      <section className="before-after" style={{ padding: 'var(--section-pad) 0', background: 'var(--charcoal)', color: 'var(--white)' }}>
        <div className="container before-after__grid">
          
          {/* Visual Showcase */}
          <div style={{ position: 'relative', height: '450px', overflow: 'hidden', border: '1px solid rgba(201, 169, 110, 0.3)' }}>
            <img 
              src={showAfter ? imgAfter : imgBefore} 
              alt={showAfter ? "After Renovation" : "Before Renovation"} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.6s ease-in-out' }}
            />
            {/* Overlay label */}
            <div style={{
              position: 'absolute', top: '1.5rem', left: '1.5rem',
              background: 'var(--gold)', color: 'var(--charcoal)',
              fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase',
              letterSpacing: '0.1em', padding: '0.5rem 1rem'
            }}>
              {showAfter ? 'After Luxe Renovation' : 'Original Concrete Structure'}
            </div>
            {/* Context overlay */}
            <div style={{
              position: 'absolute', bottom: '1.5rem', right: '1.5rem',
              background: 'rgba(26, 24, 20, 0.85)', backdropFilter: 'blur(8px)',
              padding: '0.5rem 1rem', border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em',
              color: 'var(--white)'
            }}>
              Project: <span style={{ color: 'var(--gold)' }}>The Azure Lounge, Delhi</span>
            </div>
          </div>

          {/* Controls & Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p className="section-label" style={{ color: 'var(--gold)' }}>Design Transformation</p>
            <h2 className="section-title" style={{ color: 'var(--white)' }}>The Power of <em>Detail</em></h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.8' }}>
              We specialize in structural transformations. Toggle the button below to witness how we took a raw, concrete shell and sculpted it into a fully bespoke, luxury living pavilion.
            </p>
            <div>
              <button 
                onClick={() => setShowAfter(!showAfter)} 
                className="btn-primary"
                style={{ width: '220px', justifyContent: 'center' }}
              >
                <span>View {showAfter ? 'Before' : 'After'} State</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
