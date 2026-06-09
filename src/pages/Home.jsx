import Hero from '../components/Hero/Hero';
import Testimonials from '../components/Testimonials/Testimonials';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { ArrowRight, Award } from 'lucide-react';

export default function Home() {
  const ref = useScrollAnimation();

  return (
    <div>
      <Hero />

      {/* Home Teaser Section */}
      <section className="about-teaser" ref={ref} style={{ padding: 'var(--section-pad) 0', background: 'var(--cream)' }}>
        <div className="container about-teaser__grid">
          <div className="anim-fade-up" style={{ position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80&auto=format&fit=crop" 
              alt="Bespoke Design Studio"
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', bottom: '1rem', right: '1rem',
              background: 'rgba(26, 24, 20, 0.85)', backdropFilter: 'blur(8px)',
              padding: '0.4rem 0.8rem', border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em',
              color: 'var(--gold-light)'
            }}>
              Project: The Emerald Villa, Bangalore
            </div>
          </div>
          <div className="anim-fade-up anim-delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p className="section-label">Bespoke Design Studio</p>
            <h2 className="section-title">Crafting Spaces with <em>Distinction</em></h2>
            <p style={{ color: 'var(--stone)', lineHeight: '1.8', fontSize: '1rem' }}>
              Luxe Interiors designs refined residential, commercial, and hospitality environments. 
              Our work is defined by classical elegance, structural innovation, and an unwavering commitment to detail.
            </p>
            <div>
              <Link to="/about" className="btn-outline">
                <span>Learn Our Story</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Teaser Section */}
      <section className="portfolio-teaser" style={{ padding: 'var(--section-pad) 0', background: 'var(--charcoal)', color: 'var(--white)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <p className="section-label" style={{ color: 'var(--gold)' }}>Curated Collections</p>
            <h2 className="section-title" style={{ color: 'var(--white)' }}>Selected <em>Works</em></h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>A glimpse into our portfolio of award-winning interior architecture projects.</p>
          </div>
          <div className="portfolio-teaser__grid">
            {[
              { title: 'The Marble House', category: 'Residential', img: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&q=80' },
              { title: 'The Grove Restaurant', category: 'Hospitality', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80' },
              { title: 'Vertex HQ', category: 'Commercial', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80' }
            ].map((p) => (
              <div key={p.title} style={{ overflow: 'hidden', position: 'relative', height: '320px' }}>
                <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem'
                }}>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '0.15em' }}>{p.category}</span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', margin: '0.25rem 0 0.5rem' }}>{p.title}</h4>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <Link to="/portfolio" className="btn-primary">
              <span>View All Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <Testimonials />

      {/* Awards Showcase Section */}
      <section className="awards-showcase" style={{ padding: 'var(--section-pad) 0', background: 'var(--cream)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <p className="section-label">Distinctions</p>
            <h2 className="section-title">Industry <em>Recognition</em></h2>
            <p style={{ color: 'var(--stone)', fontSize: '0.95rem' }}>Proud recipients of national and global interior design awards.</p>
          </div>
          <div className="awards-showcase__grid">
            {[
              { year: '2025', title: 'Luxury Design Studio of the Year', body: 'National Architecture Awards' },
              { year: '2024', title: 'Best Residential Interior', body: 'Design India Magazine Awards' },
              { year: '2023', title: 'Innovative Workspace Design', body: 'Commercial Builders Guild' },
              { year: '2021', title: 'Bespoke Lighting Design', body: 'International Decors Panel' }
            ].map((award) => (
              <div key={award.title} style={{
                background: 'var(--cream-dark)',
                padding: '2rem',
                borderTop: '2px solid var(--gold)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--gold)' }}>{award.year}</span>
                  <Award size={20} style={{ color: 'var(--gold)', opacity: 0.8 }} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--charcoal)', lineHeight: '1.4' }}>{award.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--stone)' }}>{award.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
