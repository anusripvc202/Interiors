import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Star, Compass, DollarSign, Award, Grid, ArrowLeft, 
  Check, Calendar as CalendarIcon, Clock, Mail, Phone, ChevronRight 
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import PageHero from '../components/PageHero/PageHero';

const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

const interiorAddOns = [
  { id: '3d-video', name: '3D Render Video Walkthrough', price: 8000, desc: 'A dynamic 60-second virtual walk-through of your future space.' },
  { id: 'material-board', name: 'Physical Swatch Box Delivery', price: 5000, desc: 'Paint swatches, wallpaper samples, and wood/fabric samples sent to your door.' },
  { id: 'vastu-consult', name: 'Vastu / Feng Shui Review', price: 3500, desc: 'Expert layout alignment guidance to ensure positive energy flow.' },
  { id: 'extra-revisions', name: '3 Extra Design Revisions', price: 4000, desc: 'Allows you to make additional updates to the conceptual layouts.' }
];

// Generate next 6 days starting tomorrow, skipping Sunday
const getAvailableDates = () => {
  const dates = [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  let current = new Date();
  while (dates.length < 6) {
    current.setDate(current.getDate() + 1);
    if (current.getDay() !== 0) { // Skip Sunday
      dates.push({
        dayName: days[current.getDay()],
        dayNum: current.getDate(),
        month: months[current.getMonth()],
        formatted: `${days[current.getDay()]}, ${current.getDate()} ${months[current.getMonth()]}`
      });
    }
  }
  return dates;
};

export default function DesignerProfilePage() {
  const { designersList } = useAuth();
  const { id } = useParams();
  const designer = designersList.find(d => d.id === id);

  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', phone: '', notes: '' });
  const [isBooked, setIsBooked] = useState(false);
  const [activeTab, setActiveTab] = useState('portfolio'); // portfolio, reviews

  const calculateTotal = () => {
    if (!selectedPackage) return 0;
    const addOnTotal = selectedAddOns.reduce((sum, addOnId) => {
      const item = interiorAddOns.find(a => a.id === addOnId);
      return sum + (item ? item.price : 0);
    }, 0);
    return selectedPackage.price + addOnTotal;
  };

  const handleAddOnToggle = (addOnId) => {
    if (selectedAddOns.includes(addOnId)) {
      setSelectedAddOns(selectedAddOns.filter(id => id !== addOnId));
    } else {
      setSelectedAddOns([...selectedAddOns, addOnId]);
    }
  };

  const sidebarRef = useRef(null);
  const availableDates = getAvailableDates();

  if (!designer) {
    return (
      <div style={{ padding: '10rem 0', textAlign: 'center', background: 'var(--cream)' }}>
        <div className="container">
          <h2>Designer Not Found</h2>
          <p style={{ margin: '1rem 0 2rem' }}>The requested designer profile does not exist.</p>
          <Link to="/portfolio" className="btn-primary">
            <span>Back to Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  const selectedPackage = designer.packages.find(p => p.id === selectedPackageId);

  const handlePackageSelect = (pkgId) => {
    setSelectedPackageId(pkgId);
    // Scroll smoothly to sidebar booking form on mobile/tablet
    if (window.innerWidth <= 1024 && sidebarRef.current) {
      sidebarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPackageId || !selectedDate || !selectedTime || !clientInfo.name || !clientInfo.email || !clientInfo.phone) return;
    setIsBooked(true);
  };

  const handleReset = () => {
    setSelectedPackageId('');
    setSelectedAddOns([]);
    setSelectedDate('');
    setSelectedTime('');
    setClientInfo({ name: '', email: '', phone: '', notes: '' });
    setIsBooked(false);
  };

  return (
    <div>
      {/* Cover Header Hero */}
      <section style={{ 
        position: 'relative', 
        height: '40vh', 
        minHeight: '320px', 
        backgroundImage: `linear-gradient(to bottom, rgba(26, 24, 20, 0.4) 0%, rgba(26, 24, 20, 0.8) 100%), url(${designer.portfolio[0].image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        color: 'var(--white)',
        paddingBottom: '2.5rem'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Link to="/portfolio" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            fontSize: '0.75rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em', 
            color: 'rgba(255,255,255,0.7)', 
            marginBottom: '2rem',
            transition: 'color 0.3s'
          }} className="back-link">
            <ArrowLeft size={14} />
            <span>Back to Directory</span>
          </Link>
          
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <img 
              src={designer.avatar} 
              alt={designer.name} 
              style={{ width: '7rem', height: '7rem', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--gold)', boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }} 
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 400, margin: 0 }}>{designer.name}</h1>
                <span className="designer-match-tag" style={{ background: 'var(--gold)', color: 'var(--white)', fontSize: '0.62rem', padding: '0.25rem 0.6rem', borderRadius: '100px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  <Award size={12} style={{ marginRight: '0.2rem' }} /> Verified Specialist
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-light)', margin: 0, fontWeight: 600 }}>{designer.role} · {designer.style}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section style={{ padding: '4rem 0 6rem', background: 'var(--cream)' }}>
        <div className="container planner__grid-layout">
          
          {/* LEFT COLUMN: ABOUT & DYNAMIC PACKAGES CATALOG */}
          <div>
            {/* About Card */}
            <div style={{ background: 'var(--white)', padding: '2.5rem', borderRadius: '6px', border: '1px solid rgba(201, 169, 110, 0.2)', marginBottom: '2.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: '0 0 1rem', color: 'var(--charcoal)' }}>About {designer.name}</h3>
              <p style={{ color: 'var(--stone)', fontSize: '0.95rem', lineHeight: '1.8', margin: 0 }}>
                {designer.bio} Based in <strong>{designer.city}</strong>, I have over {designer.experience} of experience transforming ordinary living environments into custom residential projects. My design philosophy is built on structural layout balance, material authenticity, and details that reflect the owner's lifestyle.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', borderTop: '1px solid var(--cream-dark)', marginTop: '2rem', paddingTop: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--stone-light)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Rating</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--charcoal)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Star size={16} fill="var(--gold)" color="var(--gold)" /> {designer.rating} / 5.0
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--stone-light)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Completed Projects</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--charcoal)' }}>120+ projects</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--stone-light)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Consultation Fee</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--gold-dark)' }}>₹{designer.startingRate.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Redesigned 3-Column Catalog Packages Section */}
            <div style={{ background: 'var(--white)', padding: '2.5rem', borderRadius: '6px', border: '1px solid rgba(201, 169, 110, 0.2)', marginBottom: '2.5rem' }}>
              <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <span className="section-label" style={{ justifyContent: 'center' }}>Design Catalog</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--charcoal)', margin: '0.5rem 0 0.25rem' }}>Choose Your Design Package</h3>
                <p style={{ color: 'var(--stone)', fontSize: '0.85rem', margin: 0 }}>Select a design tier to configure date and time for booking.</p>
              </div>

              <div className="packages-block-grid">
                {designer.packages.map((pkg) => {
                  const isSelected = selectedPackageId === pkg.id;
                  return (
                    <div 
                      key={pkg.id}
                      onClick={() => handlePackageSelect(pkg.id)}
                      style={{
                        border: isSelected ? '2px solid var(--gold)' : '1px solid var(--cream-dark)',
                        borderRadius: '6px',
                        padding: '1.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s var(--ease)',
                        background: isSelected ? 'rgba(248, 245, 240, 0.8)' : 'var(--white)',
                        boxShadow: isSelected ? '0 10px 25px rgba(201, 169, 110, 0.15)' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative'
                      }}
                      className={`package-card ${pkg.popular ? 'popular' : ''}`}
                    >
                      {pkg.popular && (
                        <span style={{
                          position: 'absolute',
                          top: '-10px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'var(--gold)',
                          color: 'var(--white)',
                          fontSize: '0.58rem',
                          fontWeight: '800',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '100px',
                          boxShadow: '0 4px 10px rgba(201, 169, 110, 0.3)'
                        }} className="popular-badge">
                          Most Popular
                        </span>
                      )}

                      <span style={{ 
                        fontSize: '0.7rem', 
                        fontWeight: '700', 
                        textTransform: 'uppercase', 
                        color: isSelected ? 'var(--gold-dark)' : 'var(--stone-light)', 
                        letterSpacing: '0.08em',
                        display: 'block',
                        marginBottom: '0.5rem'
                      }} className="package-tier">
                        {pkg.id === 'essential' ? 'Essential' : pkg.id === 'premium' ? 'Premium' : 'Luxury'}
                      </span>

                      <div style={{ 
                        fontSize: '1.65rem', 
                        fontWeight: '700', 
                        color: 'var(--charcoal)', 
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-sans)',
                        display: 'flex',
                        alignItems: 'baseline'
                      }} className="package-price">
                        <span style={{ fontSize: '1rem', marginRight: '0.1rem', fontWeight: 500 }}>₹</span>
                        {pkg.price.toLocaleString('en-IN')}
                      </div>

                      <ul style={{ 
                        listStyle: 'none', 
                        padding: 0, 
                        margin: '0 0 1.5rem', 
                        fontSize: '0.78rem', 
                        color: 'var(--stone)', 
                        lineHeight: '1.7',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        flexGrow: 1
                      }} className="package-features-list">
                        <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
                          <Check size={12} style={{ color: 'var(--gold-dark)', marginTop: '4px', flexShrink: 0 }} />
                          <span>{pkg.hours} Hours On-site Consultation</span>
                        </li>
                        <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
                          <Check size={12} style={{ color: 'var(--gold-dark)', marginTop: '4px', flexShrink: 0 }} />
                          <span>{pkg.designers} Certified Design Specialist(s)</span>
                        </li>
                        {pkg.id !== 'essential' && (
                          <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
                            <Check size={12} style={{ color: 'var(--gold-dark)', marginTop: '4px', flexShrink: 0 }} />
                            <span>Photorealistic 3D Renders</span>
                          </li>
                        )}
                        {pkg.id === 'luxury' && (
                          <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
                            <Check size={12} style={{ color: 'var(--gold-dark)', marginTop: '4px', flexShrink: 0 }} />
                            <span>Turnkey Coordinator Supervision</span>
                          </li>
                        )}
                        <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
                          <Check size={12} style={{ color: 'var(--gold-dark)', marginTop: '4px', flexShrink: 0 }} />
                          <span>Sourcing Specs & PDF Delivery</span>
                        </li>
                      </ul>

                      <button 
                        className={`btn ${isSelected ? 'btn-primary' : 'btn-outline-primary'}`}
                        style={{ 
                          marginTop: 'auto', 
                          width: '100%', 
                          padding: '0.6rem', 
                          fontSize: '0.7rem', 
                          background: isSelected ? 'var(--gold)' : 'transparent',
                          color: isSelected ? 'var(--white)' : 'var(--gold)',
                          border: '1px solid var(--gold)',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                      >
                        {isSelected ? 'Selected' : `Book ${pkg.id === 'essential' ? 'Essential' : pkg.id === 'premium' ? 'Premium' : 'Luxury'}`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Tabs (Portfolio / Reviews) */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--cream-dark)', paddingBottom: '0.5rem' }}>
              <button 
                onClick={() => setActiveTab('portfolio')}
                style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontWeight: '600', 
                  fontSize: '0.8rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em',
                  color: activeTab === 'portfolio' ? 'var(--gold-dark)' : 'var(--stone-light)',
                  borderBottom: activeTab === 'portfolio' ? '2px solid var(--gold)' : 'none',
                  paddingBottom: '0.5rem'
                }}
              >
                Portfolio Gallery
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontWeight: '600', 
                  fontSize: '0.8rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em',
                  color: activeTab === 'reviews' ? 'var(--gold-dark)' : 'var(--stone-light)',
                  borderBottom: activeTab === 'reviews' ? '2px solid var(--gold)' : 'none',
                  paddingBottom: '0.5rem'
                }}
              >
                Client Reviews ({designer.reviewsCount})
              </button>
            </div>

            {/* TAB CONTENT: PORTFOLIO */}
            {activeTab === 'portfolio' && (
              <div className="portfolio-teaser__grid">
                {designer.portfolio.map((work, idx) => (
                  <div key={idx} style={{ background: 'var(--white)', border: '1px solid var(--cream-dark)', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ height: '240px', overflow: 'hidden' }}>
                      <img src={work.image} alt={work.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '1.25rem' }}>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--charcoal)', margin: 0 }}>{work.title}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--stone)', marginTop: '0.25rem', margin: 0 }}>Style: {designer.style}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: REVIEWS */}
            {activeTab === 'reviews' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { user: 'Sarah Thompson', rating: 5, date: 'May 12, 2026', comment: 'Absolutely incredible work! Understood our requirements and layout preferences instantly.' },
                  { user: 'Rajesh Sharma', rating: 5, date: 'April 28, 2026', comment: 'Prompt, professional, and has an outstanding eye for textures. The renders provided were spot-on.' },
                  { user: 'Emily Cole', rating: 4, date: 'March 15, 2026', comment: 'Highly creative designs. Sophia helped us source beautiful vintage items that customized our living space.' }
                ].map((review, idx) => (
                  <div key={idx} style={{ background: 'var(--white)', padding: '1.5rem', borderRadius: '6px', border: '1px solid rgba(201, 169, 110, 0.15)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--charcoal)' }}>{review.user}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--stone-light)' }}>{review.date}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.2rem', color: 'var(--gold)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                      {Array.from({ length: review.rating }).map((_, i) => <Star key={i} size={12} fill="var(--gold)" color="var(--gold)" />)}
                    </div>
                    <p style={{ color: 'var(--stone)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>"{review.comment}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: INTERACTIVE BOOKING CALENDAR & SLOTS */}
          <div className="planner__sidebar" ref={sidebarRef}>
            {isBooked ? (
              /* Receipt Confirmation Ticket */
              <div className="planner__sticky-card planner__receipt-card text-center" style={{ borderTop: '6px solid var(--gold)', padding: '2.5rem 2rem' }}>
                <div className="success-checkmark" style={{ width: '4rem', height: '4rem', background: 'rgba(201,169,110,0.1)', color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', margin: '0 auto 1.5rem' }}>
                  <Check size={36} />
                </div>
                <span className="section-label" style={{ justifyContent: 'center' }}>Consultation Confirmed</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', margin: '0.5rem 0' }}>Booking Secured!</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--stone)', lineHeight: '1.6' }}>We sent a calendar invite and details packet to <strong>{clientInfo.email}</strong>.</p>
                
                <div style={{ borderTop: '1px dashed rgba(201, 169, 110, 0.3)', margin: '1.5rem 0', height: '1px' }} />
                
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.82rem' }}>
                  <div>
                    <span style={{ color: 'var(--stone-light)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase' }}>Client Name</span>
                    <strong style={{ color: 'var(--charcoal)' }}>{clientInfo.name}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--stone-light)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase' }}>Designer</span>
                    <strong style={{ color: 'var(--charcoal)' }}>{designer.name} ({designer.role})</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--stone-light)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase' }}>Date & Time Slot</span>
                    <strong style={{ color: 'var(--charcoal)' }}>{selectedDate} at {selectedTime}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--stone-light)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase' }}>Selected Package</span>
                    <strong style={{ color: 'var(--charcoal)' }}>{selectedPackage?.name}</strong>
                  </div>
                  {selectedAddOns.length > 0 && (
                    <div>
                      <span style={{ color: 'var(--stone-light)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase' }}>Add-ons Selected</span>
                      <ul style={{ paddingLeft: '1rem', margin: '0.2rem 0', color: 'var(--stone)', fontSize: '0.8rem', listStyleType: 'disc' }}>
                        {selectedAddOns.map(addOnId => {
                          const item = interiorAddOns.find(a => a.id === addOnId);
                          return <li key={addOnId}>{item?.name} (+₹{item?.price.toLocaleString('en-IN')})</li>;
                        })}
                      </ul>
                    </div>
                  )}
                  <div>
                    <span style={{ color: 'var(--stone-light)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase' }}>Cost Summary</span>
                    <strong style={{ color: 'var(--gold-dark)', fontSize: '1.25rem' }}>₹{calculateTotal().toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <div style={{ borderTop: '1px dashed rgba(201, 169, 110, 0.3)', margin: '1.5rem 0', height: '1px' }} />

                <button onClick={handleReset} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>Schedule Another Slot</span>
                </button>
              </div>
            ) : selectedPackageId ? (
              /* Booking Steps Card */
              <div className="planner__sticky-card" style={{ background: 'var(--white)', border: '1px solid rgba(201,169,110,0.25)', borderRadius: '6px', padding: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--cream-dark)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--charcoal)', margin: 0 }}>
                      Book Schedule
                    </h3>
                    <p style={{ fontSize: '0.72rem', color: 'var(--stone)', margin: '0.2rem 0 0' }}>Assigning Lead: {designer.name}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.62rem', textTransform: 'uppercase', display: 'block', color: 'var(--stone-light)', fontWeight: 600 }}>Total Price</span>
                    <strong style={{ fontSize: '1.15rem', color: 'var(--gold-dark)' }}>₹{calculateTotal().toLocaleString('en-IN')}</strong>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                  {/* Project Add-ons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--stone-light)', letterSpacing: '0.05em' }}>Custom Project Add-ons (Optional)</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {interiorAddOns.map((addOn) => {
                        const isChecked = selectedAddOns.includes(addOn.id);
                        return (
                          <div 
                            key={addOn.id}
                            onClick={() => handleAddOnToggle(addOn.id)}
                            style={{
                              border: '1px solid var(--cream-dark)',
                              borderRadius: '4px',
                              padding: '0.75rem',
                              cursor: 'pointer',
                              background: isChecked ? 'rgba(201, 169, 110, 0.05)' : 'var(--white)',
                              borderColor: isChecked ? 'var(--gold)' : 'var(--cream-dark)',
                              transition: 'all 0.2s',
                              display: 'flex',
                              gap: '0.75rem',
                              alignItems: 'flex-start'
                            }}
                          >
                            <div style={{
                              width: '16px',
                              height: '16px',
                              border: '1.5px solid var(--stone-light)',
                              borderRadius: '3px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginTop: '2px',
                              background: isChecked ? 'var(--gold)' : 'transparent',
                              borderColor: isChecked ? 'var(--gold)' : 'var(--stone-light)',
                              flexShrink: 0
                            }}>
                              {isChecked && <Check size={10} color="var(--white)" />}
                            </div>
                            <div style={{ flexGrow: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <strong style={{ fontSize: '0.8rem', color: 'var(--charcoal)' }}>{addOn.name}</strong>
                                <span style={{ fontSize: '0.8rem', color: 'var(--gold-dark)', fontWeight: 'bold' }}>+₹{addOn.price.toLocaleString('en-IN')}</span>
                              </div>
                              <p style={{ fontSize: '0.7rem', color: 'var(--stone)', margin: '0.2rem 0 0', lineHeight: '1.4' }}>{addOn.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step A: Select Date */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--stone-light)', letterSpacing: '0.05em' }}>Select Consultation Date</label>
                    <div className="planner__dates-grid">
                      {availableDates.map((date) => (
                        <div
                          key={date.formatted}
                          onClick={() => setSelectedDate(date.formatted)}
                          style={{
                            border: '1px solid var(--cream-dark)',
                            borderRadius: '4px',
                            padding: '0.6rem 0.2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: selectedDate === date.formatted ? 'var(--gold)' : 'var(--white)',
                            color: selectedDate === date.formatted ? 'var(--white)' : 'var(--charcoal)',
                            borderColor: selectedDate === date.formatted ? 'var(--gold)' : 'var(--cream-dark)',
                            transition: 'all 0.3s'
                          }}
                        >
                          <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', display: 'block', opacity: 0.8 }}>{date.dayName}</span>
                          <strong style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', display: 'block', margin: '0.1rem 0' }}>{date.dayNum}</strong>
                          <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', display: 'block', opacity: 0.8 }}>{date.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step B: Select Time */}
                  {selectedDate && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--stone-light)', letterSpacing: '0.05em' }}>Select Time Slot</label>
                      <div className="planner__times-grid">
                        {timeSlots.map((time) => (
                          <div
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            style={{
                              border: '1px solid var(--cream-dark)',
                              borderRadius: '4px',
                              padding: '0.6rem',
                              textAlign: 'center',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              fontWeight: '500',
                              background: selectedTime === time ? 'var(--gold)' : 'var(--white)',
                              color: selectedTime === time ? 'var(--white)' : 'var(--charcoal)',
                              borderColor: selectedTime === time ? 'var(--gold)' : 'var(--cream-dark)',
                              transition: 'all 0.3s'
                            }}
                          >
                            {time}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step C: Contact Info */}
                  {selectedTime && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px dashed var(--cream-dark)', paddingTop: '1.25rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.68rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--stone-light)' }}>Your Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. John Doe"
                          value={clientInfo.name}
                          onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                          style={{ padding: '0.7rem', border: '1px solid var(--cream-dark)', borderRadius: '4px', background: 'var(--cream)', outline: 'none', fontSize: '0.85rem' }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.68rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--stone-light)' }}>Email Address</label>
                        <input 
                          type="email" 
                          required
                          placeholder="e.g. john@example.com"
                          value={clientInfo.email}
                          onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                          style={{ padding: '0.7rem', border: '1px solid var(--cream-dark)', borderRadius: '4px', background: 'var(--cream)', outline: 'none', fontSize: '0.85rem' }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.68rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--stone-light)' }}>Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={clientInfo.phone}
                          onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                          style={{ padding: '0.7rem', border: '1px solid var(--cream-dark)', borderRadius: '4px', background: 'var(--cream)', outline: 'none', fontSize: '0.85rem' }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={!selectedPackageId || !selectedDate || !selectedTime || !clientInfo.name || !clientInfo.email || !clientInfo.phone}
                    style={{ width: '100%', justifyContent: 'center', padding: '1rem', marginTop: '0.5rem', cursor: 'pointer' }}
                  >
                    <span>Request Booking</span>
                    <ChevronRight size={14} />
                  </button>

                </form>
              </div>
            ) : (
              /* Prompt to select package */
              <div className="planner__sticky-card text-center" style={{ background: 'var(--white)', border: '1px dashed rgba(201,169,110,0.3)', borderRadius: '6px', padding: '3rem 2rem' }}>
                <Compass size={36} style={{ color: 'var(--gold)', marginBottom: '1rem' }} />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--charcoal)', margin: '0 0 0.5rem' }}>Schedule Appointment</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--stone)', lineHeight: '1.6', margin: 0 }}>
                  Please select one of the design packages from the catalog on the left to unlock availability and reserve a consultation.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
