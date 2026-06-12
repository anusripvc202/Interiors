import { useState } from 'react';
import Services from '../components/Services/Services';
import PageHero from '../components/PageHero/PageHero';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqsList = [
  { q: "How does the Luxe Interiors marketplace match me with designers?", a: "We utilize your location, preferred aesthetic style (determined via our Style Quiz), and project scope to match you with verified independent designers who have portfolios aligning with your goals." },
  { q: "What is included in the Essential, Premium, and Luxury packages?", a: "Essential plans cover concept layouts and materials selection. Premium plans add photo-realistic 3D renders and electrical/lighting schematics. Luxury plans include European material sourcing, modular kitchen templates, and onsite director supervision." },
  { q: "Can I choose custom project add-ons later?", a: "Yes. You can select custom add-ons (like Vastu Reviews, 3D video walkthroughs, or extra revisions) directly on the designer's booking page, or request them during your initial slot review." },
  { q: "What is the rescheduling policy for consultation bookings?", a: "You can reschedule your booked consultation up to 24 hours before your slot free of charge. Cancellations within 24 hours may incur a small transaction fee to cover the designer's reserved slot." }
];

export default function ServicesPage() {
  const [roomType, setRoomType] = useState('Living Room');
  const [sqft, setSqft] = useState(300);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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
        title={<>Our Design <em>Services</em></>} 
        subtitle="From turnkey management to custom lighting blueprints." 
        bgImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=85&auto=format&fit=crop" 
        theme="services"
        breadcrumb="Services"
      />
      <Services />

      {/* Interactive Budget Estimator Widget */}
      <section className="estimator" style={{ padding: 'var(--section-pad) 0', background: 'var(--bg-dark)' }}>
        <div className="container estimator__grid">
          <div>
            <p className="section-label">Interactive Tool</p>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Estimate Your <em>Investment</em></h2>
            <p style={{ color: 'var(--stone)', lineHeight: '1.8', marginBottom: '2rem' }}>
              Plan your renovation budget transparently. Select your project parameters below to get an estimated cost for Premium and Ultra-Luxury fit-outs.
            </p>
            <div style={{ background: 'var(--bg-card)', padding: '2rem', border: '1px solid rgba(124, 58, 237, 0.25)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--stone)' }}>Select Space Type</label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  style={{ padding: '0.8rem', border: '1px solid var(--cream-dark)', background: 'var(--cream)', color: 'var(--white)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}
                >
                  <option value="Living Room" style={{ background: '#0F1220', color: '#fff' }}>Living Room / Lounge</option>
                  <option value="Bedroom" style={{ background: '#0F1220', color: '#fff' }}>Bedroom Sanctuary</option>
                  <option value="Kitchen" style={{ background: '#0F1220', color: '#fff' }}>Gourmet Kitchen</option>
                  <option value="Commercial" style={{ background: '#0F1220', color: '#fff' }}>Office / Commercial Space</option>
                  <option value="Hotel Suite" style={{ background: '#0F1220', color: '#fff' }}>Boutique Hotel Suite</option>
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
                  style={{ padding: '0.8rem', border: '1px solid var(--cream-dark)', background: 'var(--cream)', color: 'var(--white)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'var(--bg-card)', padding: '2.5rem 2rem', borderLeft: '4px solid var(--purple)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '0.1em' }}>Premium Tier Estimate</span>
              <h3 style={{ fontSize: '2.5rem', fontWeight: '600', color: 'var(--charcoal)', margin: 0 }}>₹{premiumEstimate}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--stone)', lineHeight: '1.6' }}>
                Includes bespoke custom styling, handpicked high-end local furniture, standard designer lighting layouts, and expert contractor management.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card-2)', color: 'var(--white)', padding: '2.5rem 2rem', borderLeft: '4px solid var(--teal)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '0.1em' }}>Ultra-Luxury Tier Estimate</span>
              <h3 style={{ fontSize: '2.5rem', fontWeight: '600', color: 'var(--gold)', margin: 0 }}>₹{luxuryEstimate}</h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>
                Includes fine imported Italian materials, premium architectural renovations, fully customized modular layout, automated smart lighting systems, and design director supervision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="faq-section" style={{ padding: '6rem 0', background: 'var(--bg-dark)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ justifyContent: 'center' }}>Help Center</span>
            <h2 className="section-title">Frequently Asked <em>Questions</em></h2>
            <p style={{ color: 'var(--stone)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Everything you need to know about our interior designer marketplace booking system.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqsList.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    background: 'var(--bg-card)',
                    transition: 'all 0.3s'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    style={{
                      width: '100%',
                      padding: '1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.15rem',
                      color: 'var(--charcoal)',
                      fontWeight: 500
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} style={{ color: 'var(--gold-dark)' }} /> : <ChevronDown size={18} style={{ color: 'var(--stone)' }} />}
                  </button>
                  {isOpen && (
                    <div style={{
                      padding: '0 1.5rem 1.5rem',
                      fontSize: '0.95rem',
                      color: 'var(--stone)',
                      lineHeight: '1.7'
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
