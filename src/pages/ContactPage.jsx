import { useState } from 'react';
import ProjectPlanner from '../components/ProjectPlanner/ProjectPlanner';
import PageHero from '../components/PageHero/PageHero';
import { Building, Phone, Mail, MapPin } from 'lucide-react';

const locations = [
  {
    city: 'Mumbai (HQ)',
    address: 'Level 5, Capital Tower, Bandra Kurla Complex, Mumbai, MH 400051',
    phone: '+91 98765 43210',
    email: 'mumbai@luxeinteriors.com',
    hours: 'Mon - Fri: 9:00 AM - 6:00 PM',
  },
  {
    city: 'Delhi Studio',
    address: 'First Floor, Gallery Block, Mehrauli-Gurgaon Rd, New Delhi, DL 110030',
    phone: '+91 98765 43211',
    email: 'delhi@luxeinteriors.com',
    hours: 'Mon - Sat: 10:00 AM - 7:00 PM',
  },
  {
    city: 'Bangalore Design Lab',
    address: '80 Feet Rd, Koramangala 4th Block, Bangalore, KA 560034',
    phone: '+91 98765 43212',
    email: 'blr@luxeinteriors.com',
    hours: 'Mon - Fri: 9:00 AM - 6:00 PM',
  },
];

export default function ContactPage() {
  const [activeLoc, setActiveLoc] = useState(0);
  const loc = locations[activeLoc];

  return (
    <div>
      <PageHero 
        title={<>Begin Your <em>Transformation</em></>} 
        subtitle="Visit our national studios or book a private consultation." 
        bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85&auto=format&fit=crop" 
        theme="contact"
        breadcrumb="Contact"
      />
      <ProjectPlanner />

      {/* Interactive Studio Branch Selector */}
      <section className="locations-selector" style={{ padding: 'var(--section-pad) 0', background: 'var(--charcoal)', color: 'var(--white)' }}>
        <div className="container locations-selector__grid">
          <div>
            <p className="section-label" style={{ color: 'var(--gold)' }}>Our Studios</p>
            <h2 className="section-title" style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>Visit <em>Luxe</em></h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', marginBottom: '2rem' }}>
              We have fully functional, immersive styling studios across major Indian cities. Choose a branch to inspect our local address and hours.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {locations.map((l, idx) => (
                <button
                  key={l.city}
                  onClick={() => setActiveLoc(idx)}
                  className="btn-outline"
                  style={{
                    justifyContent: 'flex-start',
                    background: activeLoc === idx ? 'var(--gold)' : 'transparent',
                    color: activeLoc === idx ? 'var(--white)' : 'var(--gold)',
                    border: '1px solid var(--gold)',
                    padding: '1rem',
                    textAlign: 'left'
                  }}
                >
                  <Building size={16} style={{ marginRight: '0.5rem' }} />
                  <span>{l.city}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--charcoal-2)', padding: '3rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--white)', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem', margin: 0 }}>
              {loc.city} Information
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <MapPin size={20} style={{ color: 'var(--gold)', marginTop: '3px' }} />
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>Address</span>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>{loc.address}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Phone size={20} style={{ color: 'var(--gold)', marginTop: '3px' }} />
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>Phone</span>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>{loc.phone}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Mail size={20} style={{ color: 'var(--gold)', marginTop: '3px' }} />
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>Email</span>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>{loc.email}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Building size={20} style={{ color: 'var(--gold)', marginTop: '3px' }} />
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>Hours</span>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>{loc.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
