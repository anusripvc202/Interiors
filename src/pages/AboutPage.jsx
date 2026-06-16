import { useState } from 'react';
import About from '../components/About/About';
import PageHero from '../components/PageHero/PageHero';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ChevronDown, ChevronUp } from 'lucide-react';

const values = [
  {
    title: 'Ecological Sustainability',
    desc: 'We are committed to selecting materials that are locally and ethically sourced. We cooperate with eco-certified paint, plaster, and timber suppliers to minimize our carbon footprints and support indoor clean air standards.',
  },
  {
    title: 'Uncompromised Quality Controls',
    desc: 'From initial structural blueprints to the last thread on custom cushions, we execute multiple checks. Our supervisors stay on site during construction to guarantee premium masonry, electrical and plumbing finishes.',
  },
  {
    title: 'Bespoke Art Curation',
    desc: 'A room is incomplete without narrative art. We partner with local Indian and global fine art galleries to source unique, site-specific paintings, sculptures, and custom tapestries that capture the client\'s personality.',
  },
];

const milestones = [
  { year: '2010', title: 'Studio Founded', desc: 'Interiors Outfit starts in a boutique office in Mumbai with two designers.' },
  { year: '2015', title: 'Commercial Expansion', desc: 'Secured first corporate headquarters design project spanning over 20,000 sq.ft.' },
  { year: '2020', title: 'Global Recognition', desc: 'Awarded elite international residential design recognition in Milan.' },
  { year: '2026', title: 'Digital VR Studios', desc: 'Pioneered interactive Virtual Reality design walk-throughs across India.' },
];

export default function AboutPage() {
  const ref = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div>
      <PageHero 
        title={<>Our Curation <em>Story</em></>} 
        subtitle="Crafting bespoke, award-winning interiors since 2010." 
        bgImage="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1600&q=85&auto=format&fit=crop" 
        theme="about"
        breadcrumb="About Us"
      />
      <About />

      {/* Interactive Milestones Timeline */}
      <section className="milestones" ref={ref} style={{ padding: 'var(--section-pad) 0', background: 'var(--bg-card)', color: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p className="section-label" style={{ color: 'var(--gold)', WebkitTextFillColor: 'var(--gold)' }}>Our Journey</p>
            <h2 className="section-title" style={{ color: 'var(--white)' }}>Key <em>Milestones</em></h2>
          </div>
          <div className="milestones__grid">
            {milestones.map((m, i) => (
              <div key={m.year} className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '1px solid rgba(201, 169, 110, 0.4)', paddingLeft: '1.5rem', transitionDelay: `${i * 0.15}s` }}>
                <span style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--gold)', fontWeight: 'bold' }}>{m.year}</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '500' }}>{m.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Philosophy Accordion */}
      <section className="design-accordion" style={{ padding: 'var(--section-pad) 0', background: 'var(--cream-dark)' }}>
        <div className="container design-accordion__grid">
          <div>
            <p className="section-label">Core Principles</p>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>How We <em>Operate</em></h2>
            <p style={{ color: 'var(--stone)', lineHeight: '1.8' }}>
              We believe a premium design studio should provide complete operational transparency. 
              Here is how we maintain standards across all residential and commercial builds.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {values.map((v, i) => (
              <div key={v.title} style={{ background: 'var(--cream)', border: '1px solid rgba(201,169,110,0.25)', overflow: 'hidden' }}>
                <button
                  onClick={() => toggleAccordion(i)}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: '600',
                    fontSize: '1rem',
                    color: 'var(--charcoal)',
                    cursor: 'pointer'
                  }}
                >
                  <span>{v.title}</span>
                  {openIndex === i ? <ChevronUp size={18} style={{ color: 'var(--gold)' }} /> : <ChevronDown size={18} style={{ color: 'var(--gold)' }} />}
                </button>
                <div style={{
                  maxHeight: openIndex === i ? '200px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease',
                  padding: openIndex === i ? '0 1.5rem 1.5rem' : '0 1.5rem',
                  color: 'var(--stone)',
                  fontSize: '0.9rem',
                  lineHeight: '1.7'
                }}>
                  {v.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
