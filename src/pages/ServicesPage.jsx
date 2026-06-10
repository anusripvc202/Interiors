import { useState } from 'react';
import Services from '../components/Services/Services';
import PageHero from '../components/PageHero/PageHero';

export default function ServicesPage() {
  const [roomType, setRoomType] = useState('Living Room');
  const [sqft, setSqft] = useState(300);

  // Simple cost estimator logic
  const calculateCosts = () => {
    let ratePerSqftPremium = 1200; // in INR
    let ratePerSqftLuxury = 2200;

    if (roomType === 'Kitchen') {
      ratePerSqftPremium = 1800;
      ratePerSqftLuxury = 3200;
    } else if (roomType === 'Commercial') {
      ratePerSqftPremium = 900;
      ratePerSqftLuxury = 1600;
    } else if (roomType === 'Hotel Suite') {
      ratePerSqftPremium = 1600;
      ratePerSqftLuxury = 2800;
    }

    const premiumEstimate = (sqft * ratePerSqftPremium).toLocaleString('en-IN');
    const luxuryEstimate = (sqft * ratePerSqftLuxury).toLocaleString('en-IN');

    return { premiumEstimate, luxuryEstimate };
  };

  const { premiumEstimate, luxuryEstimate } = calculateCosts();

  return (
    <div>
      <PageHero 
        title="Our Design Services" 
        subtitle="From turnkey management to custom lighting blueprints." 
        bgImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=85&auto=format&fit=crop" 
      />
      <Services />

      {/* Interactive Budget Estimator Widget */}
      <section className="estimator" style={{ padding: 'var(--section-pad) 0', background: 'var(--cream)' }}>
        <div className="container estimator__grid">
          <div>
            <p className="section-label">Interactive Tool</p>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Estimate Your <em>Investment</em></h2>
            <p style={{ color: 'var(--stone)', lineHeight: '1.8', marginBottom: '2rem' }}>
              Plan your renovation budget transparently. Select your project parameters below to get an estimated cost for Premium and Ultra-Luxury fit-outs.
            </p>
            <div style={{ background: 'var(--white)', padding: '2rem', border: '1px solid rgba(201, 169, 110, 0.25)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--stone)' }}>Select Space Type</label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  style={{ padding: '0.8rem', border: '1px solid var(--cream-dark)', background: 'var(--cream)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}
                >
                  <option value="Living Room">Living Room / Lounge</option>
                  <option value="Bedroom">Bedroom Sanctuary</option>
                  <option value="Kitchen">Gourmet Kitchen</option>
                  <option value="Commercial">Office / Commercial Space</option>
                  <option value="Hotel Suite">Boutique Hotel Suite</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--stone)' }}>Approximate Area (Sq.Ft)</label>
                <input
                  type="number"
                  min="100"
                  max="10000"
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  style={{ padding: '0.8rem', border: '1px solid var(--cream-dark)', background: 'var(--cream)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'var(--white)', padding: '2.5rem 2rem', borderLeft: '4px solid var(--gold)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '0.1em' }}>Premium Tier Estimate</span>
              <h3 style={{ fontSize: '2.5rem', fontWeight: '600', color: 'var(--charcoal)', margin: 0 }}>₹{premiumEstimate}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--stone)', lineHeight: '1.6' }}>
                Includes bespoke custom styling, handpicked high-end local furniture, standard designer lighting layouts, and expert contractor management.
              </p>
            </div>

            <div style={{ background: 'var(--charcoal)', color: 'var(--white)', padding: '2.5rem 2rem', borderLeft: '4px solid var(--gold-light)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '0.1em' }}>Ultra-Luxury Tier Estimate</span>
              <h3 style={{ fontSize: '2.5rem', fontWeight: '600', color: 'var(--gold)', margin: 0 }}>₹{luxuryEstimate}</h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>
                Includes fine imported Italian materials, premium architectural renovations, fully customized modular layout, automated smart lighting systems, and design director supervision.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
