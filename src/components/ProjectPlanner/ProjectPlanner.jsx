import { useState, useEffect } from 'react';
import { 
  Check, ChevronRight, ChevronLeft, Calendar as CalendarIcon, 
  User, DollarSign, Compass, Layers, Ruler, Phone, Mail, Award, Clock
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './ProjectPlanner.css';

const spaceOptions = [
  { id: 'living', label: 'Living Room / Lounge', baseRate: 1200, icon: '🛋️', desc: 'Bespoke entertainment zones and family relaxation spaces.' },
  { id: 'kitchen', label: 'Gourmet Kitchen', baseRate: 1800, icon: '🍳', desc: 'State-of-the-art culinary hubs with modular premium fits.' },
  { id: 'bedroom', label: 'Bedroom Sanctuary', baseRate: 1000, icon: '🛏️', desc: 'Cozy private retreats focused on comfort and aesthetics.' },
  { id: 'bathroom', label: 'Luxury Bathroom', baseRate: 1500, icon: '🛁', desc: 'Spa-like vanity setups and premium marble tiling.' },
  { id: 'office', label: 'Home Office / Studio', baseRate: 900, icon: '💼', desc: 'Productive, ergonomically designed modern workspaces.' },
  { id: 'residence', label: 'Full Residence / Penthouse', baseRate: 2000, icon: '🏠', desc: 'End-to-end luxury renovation with unified design theme.' }
];

const styleOptions = [
  { id: 'japandi', label: 'Japandi Minimalism', desc: 'A harmonious blend of Japanese simplicity and Scandinavian warmth.', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80' },
  { id: 'modern', label: 'Modern Luxury', desc: 'Sleek metal profiles, premium marbles, custom lighting, and bold accents.', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80' },
  { id: 'midcentury', label: 'Mid-Century Organic', desc: 'Warm organic woods, geometric patterns, and iconic furniture shapes.', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80' },
  { id: 'parisian', label: 'Classic Parisian', desc: 'Romantic crown moldings, high ceilings, vintage mirrors, and elegant curation.', image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&q=80' }
];

const tierOptions = [
  { id: 'premium', label: 'Premium Tier', multiplier: 1.0, desc: 'Bespoke custom styling, curated high-end local furniture, standard designer lighting layouts, and project contracting.' },
  { id: 'luxury', label: 'Ultra-Luxury Tier', multiplier: 1.8, desc: 'Imported European materials, smart-home automation, bespoke carpentry, exclusive designer brands, and director-level supervision.' }
];

const designers = [
  { id: 'aria', name: 'Aria Chen', role: 'Design Director', specialty: 'Japandi Minimalism', rating: '4.9', matchRate: '98%', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80', bio: 'Passionate about clean lines, sustainable timbers, and functional harmony.' },
  { id: 'julian', name: 'Julian Mercer', role: 'Principal Architect', specialty: 'Modern Luxury & Parisian', rating: '5.0', matchRate: '96%', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80', bio: 'Specialist in custom residential estates and classical restorations.' },
  { id: 'marcus', name: 'Marcus Sterling', role: 'Senior Stylist', specialty: 'Mid-Century & Commercial', rating: '4.8', matchRate: '93%', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80', bio: 'Focuses on integrating organic styling with active biophilic features.' }
];

// Helper to generate next 7 work days starting tomorrow
const getAvailableDates = () => {
  const dates = [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  let current = new Date();
  while (dates.length < 6) {
    current.setDate(current.getDate() + 1);
    if (current.getDay() !== 0) { // Skip Sunday
      dates.push({
        raw: new Date(current),
        dayName: days[current.getDay()],
        dayNum: current.getDate(),
        month: months[current.getMonth()],
        formatted: `${days[current.getDay()]}, ${current.getDate()} ${months[current.getMonth()]}`
      });
    }
  }
  return dates;
};

const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

export default function ProjectPlanner() {
  const { user, addBooking } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedSpaces, setSelectedSpaces] = useState([]);
  const [spaceSizes, setSpaceSizes] = useState({}); // spaceId -> sqft
  const [selectedStyle, setSelectedStyle] = useState('japandi');
  const [selectedTier, setSelectedTier] = useState('premium');
  const [selectedDesigner, setSelectedDesigner] = useState('aria');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const [clientInfo, setClientInfo] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    phone: '',
    notes: ''
  });

  useEffect(() => {
    if (user) {
      setClientInfo(prev => ({
        ...prev,
        name: prev.name || user.name,
        email: prev.email || user.email
      }));
    }
  }, [user]);

  const availableDates = getAvailableDates();

  const handleSpaceToggle = (spaceId) => {
    if (selectedSpaces.includes(spaceId)) {
      setSelectedSpaces(selectedSpaces.filter(id => id !== spaceId));
      const newSizes = { ...spaceSizes };
      delete newSizes[spaceId];
      setSpaceSizes(newSizes);
    } else {
      setSelectedSpaces([...selectedSpaces, spaceId]);
      setSpaceSizes({
        ...spaceSizes,
        [spaceId]: spaceId === 'residence' ? 1200 : 300 // Default sizes
      });
    }
  };

  const handleSizeChange = (spaceId, value) => {
    setSpaceSizes({
      ...spaceSizes,
      [spaceId]: Math.max(50, Number(value))
    });
  };

  const handleInputChange = (field, value) => {
    setClientInfo({
      ...clientInfo,
      [field]: value
    });
  };

  // Cost calculation formula
  const getCalculation = () => {
    let baseSum = 0;
    const items = [];
    const multiplier = tierOptions.find(t => t.id === selectedTier)?.multiplier || 1.0;

    selectedSpaces.forEach(spaceId => {
      const option = spaceOptions.find(s => s.id === spaceId);
      if (option) {
        const size = spaceSizes[spaceId] || 300;
        const rawCost = option.baseRate * size * multiplier;
        baseSum += rawCost;
        items.push({
          name: option.label,
          rate: option.baseRate,
          size,
          cost: rawCost
        });
      }
    });

    const designFee = Math.round(baseSum * 0.12); // 12% design fee
    const materialsCost = Math.round(baseSum * 0.60); // 60% materials
    const executionCost = Math.round(baseSum * 0.28); // 28% labor/contracting
    const total = designFee + materialsCost + executionCost;

    return {
      items,
      designFee,
      materialsCost,
      executionCost,
      total,
      duration: selectedSpaces.includes('residence') ? '12 - 16 Weeks' : `${Math.max(4, selectedSpaces.length * 3)} - ${Math.max(6, selectedSpaces.length * 4)} Weeks`
    };
  };

  const budget = getCalculation();

  const handleNext = () => {
    if (step === 1 && selectedSpaces.length === 0) return;
    if (step === 4 && (!selectedDate || !selectedTime)) return;
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!clientInfo.name || !clientInfo.email || !clientInfo.phone) return;

    // Save consultation to client profile
    const designerNameMap = {
      'aria': 'Aria Chen',
      'julian': 'Julian Mercer',
      'marcus': 'Marcus Sterling'
    };
    const designerIdMap = {
      'aria': 'aria-chen',
      'julian': 'julian-mercer',
      'marcus': 'marcus-sterling'
    };

    const calculation = getCalculation();

    addBooking({
      clientEmail: clientInfo.email,
      clientName: clientInfo.name,
      spaceType: selectedSpaces.map(spaceId => spaceOptions.find(s => s.id === spaceId)?.label).join(', '),
      designerId: designerIdMap[selectedDesigner] || 'aria-chen',
      designerName: designerNameMap[selectedDesigner] || 'Aria Chen',
      date: selectedDate,
      time: selectedTime,
      cost: `₹${calculation.total.toLocaleString('en-IN')}`
    });

    setStep(6); // Go to receipt/confirmation screen
  };

  const handleReset = () => {
    setSelectedSpaces([]);
    setSpaceSizes({});
    setSelectedStyle('japandi');
    setSelectedTier('premium');
    setSelectedDesigner('aria');
    setSelectedDate('');
    setSelectedTime('');
    setClientInfo({ name: '', email: '', phone: '', notes: '' });
    setStep(1);
  };

  // Progress Bar Steps
  const progressSteps = [
    { num: 1, label: 'Spaces' },
    { num: 2, label: 'Style & Scope' },
    { num: 3, label: 'Designer' },
    { num: 4, label: 'Schedule' },
    { num: 5, label: 'Book' }
  ];

  return (
    <section className="planner-section">
      <div className="container">
        
        {/* Progress Tracker */}
        {step < 6 && (
          <div className="planner__progress">
            <div className="planner__progress-line">
              <div 
                className="planner__progress-active" 
                style={{ width: `${((step - 1) / (progressSteps.length - 1)) * 100}%` }}
              />
            </div>
            {progressSteps.map(s => (
              <div 
                key={s.num} 
                className={`planner__progress-step ${step >= s.num ? 'active' : ''} ${step > s.num ? 'completed' : ''}`}
              >
                <span className="planner__progress-num">
                  {step > s.num ? <Check size={14} /> : s.num}
                </span>
                <span className="planner__progress-label">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="planner__container">
          
          {/* STEP 1: SELECT SPACES */}
          {step === 1 && (
            <div className="planner__step anim-fade-in">
              <div className="planner__header">
                <span className="section-label">Step 1 of 5</span>
                <h2 className="planner__title">Select the spaces to <em>redesign</em></h2>
                <p className="planner__subtitle">Select all the rooms or spaces you would like us to look at. You can pick multiple spaces.</p>
              </div>

              <div className="planner__spaces-grid">
                {spaceOptions.map(space => {
                  const isSelected = selectedSpaces.includes(space.id);
                  return (
                    <div 
                      key={space.id}
                      onClick={() => handleSpaceToggle(space.id)}
                      className={`planner__space-card ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="planner__space-icon">{space.icon}</div>
                      <h4 className="planner__space-title">{space.label}</h4>
                      <p className="planner__space-desc">{space.desc}</p>
                      <span className="planner__space-rate">Est. from ₹{space.baseRate.toLocaleString('en-IN')}/sqft</span>
                      <div className="planner__space-checkbox">
                        {isSelected && <Check size={12} className="check-icon" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="planner__footer">
                <div className="planner__footer-info">
                  <span>Selected: <strong>{selectedSpaces.length} Spaces</strong></span>
                </div>
                <button 
                  onClick={handleNext}
                  className="btn-primary"
                  disabled={selectedSpaces.length === 0}
                >
                  <span>Customize Budget</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: STYLE & BUDGET */}
          {step === 2 && (
            <div className="planner__step anim-fade-in planner__grid-layout">
              <div className="planner__main">
                
                {/* Style Selector */}
                <div className="planner__sub-section">
                  <div className="planner__header">
                    <span className="section-label">Step 2 of 5</span>
                    <h2 className="planner__title">Select your design <em>style</em></h2>
                  </div>
                  <div className="planner__styles-grid">
                    {styleOptions.map(style => (
                      <div 
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`planner__style-card ${selectedStyle === style.id ? 'selected' : ''}`}
                      >
                        <img src={style.image} alt={style.label} className="planner__style-img" />
                        <div className="planner__style-info">
                          <h4>{style.label}</h4>
                          <p>{style.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sizing inputs */}
                <div className="planner__sub-section" style={{ marginTop: '3rem' }}>
                  <h3 className="planner__sub-title"><Ruler size={18} /> Specify Space Sizes (Sq.Ft)</h3>
                  <div className="planner__sizes-list">
                    {selectedSpaces.map(spaceId => {
                      const space = spaceOptions.find(s => s.id === spaceId);
                      return (
                        <div key={spaceId} className="planner__size-item">
                          <span className="planner__size-item-label">{space?.icon} {space?.label}</span>
                          <div className="planner__size-slider-group">
                            <input 
                              type="range" 
                              min="100" 
                              max={spaceId === 'residence' ? 6000 : 1200} 
                              step="50"
                              value={spaceSizes[spaceId] || 300}
                              onChange={(e) => handleSizeChange(spaceId, e.target.value)}
                            />
                            <div className="planner__size-val">
                              <input 
                                type="number" 
                                value={spaceSizes[spaceId] || 300}
                                onChange={(e) => handleSizeChange(spaceId, e.target.value)}
                              />
                              <span>sq.ft</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Materials & Customization Level */}
                <div className="planner__sub-section" style={{ marginTop: '3rem' }}>
                  <h3 className="planner__sub-title"><Layers size={18} /> Materials & Craftsmanship Tier</h3>
                  <div className="planner__tiers-grid">
                    {tierOptions.map(tier => (
                      <div 
                        key={tier.id}
                        onClick={() => setSelectedTier(tier.id)}
                        className={`planner__tier-card ${selectedTier === tier.id ? 'selected' : ''}`}
                      >
                        <div className="planner__tier-header">
                          <h4>{tier.label}</h4>
                          <span className="planner__badge-small">{tier.id === 'premium' ? 'Standard' : 'Director Choice'}</span>
                        </div>
                        <p>{tier.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="planner__actions-row">
                  <button onClick={handleBack} className="btn-outline">
                    <ChevronLeft size={16} />
                    <span>Back</span>
                  </button>
                  <button onClick={handleNext} className="btn-primary">
                    <span>Match Designers</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Floating Live Estimator Sidebar */}
              <div className="planner__sidebar">
                <div className="planner__sticky-card">
                  <h3>Investment Estimate</h3>
                  <p className="planner__sticky-subtitle">Calculated in real-time based on selection</p>
                  
                  <div className="planner__sticky-total">
                    <span className="currency">₹</span>
                    <span className="total-val">{budget.total.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="planner__sticky-duration">
                    <Clock size={14} />
                    <span>Project Duration: <strong>{budget.duration}</strong></span>
                  </div>

                  <div className="planner__breakdown">
                    <h4>Breakdown</h4>
                    <div className="planner__breakdown-row">
                      <span>Design & Concept Fee (12%)</span>
                      <span>₹{budget.designFee.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="planner__breakdown-row">
                      <span>Materials & Fittings (60%)</span>
                      <span>₹{budget.materialsCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="planner__breakdown-row">
                      <span>Contracting & Execution (28%)</span>
                      <span>₹{budget.executionCost.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="planner__summary-pill">
                    <strong>{selectedSpaces.length} Spaces Selected</strong>
                    <div className="spaces-tags">
                      {selectedSpaces.map(spaceId => {
                        const space = spaceOptions.find(s => s.id === spaceId);
                        return <span key={spaceId} className="tag">{space?.icon} {space?.label}</span>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: MATCH WITH DESIGNER */}
          {step === 3 && (
            <div className="planner__step anim-fade-in">
              <div className="planner__header text-center">
                <span className="section-label">Step 3 of 5</span>
                <h2 className="planner__title">Select your matched <em>designer</em></h2>
                <p className="planner__subtitle">We matched these lead designers to your project based on your selected Japandi style and room selections.</p>
              </div>

              <div className="planner__designers-grid">
                {designers.map(designer => {
                  const isSelected = selectedDesigner === designer.id;
                  return (
                    <div 
                      key={designer.id}
                      onClick={() => setSelectedDesigner(designer.id)}
                      className={`planner__designer-card ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="planner__designer-header-row">
                        <img src={designer.image} alt={designer.name} className="planner__designer-avatar" />
                        <div className="planner__designer-meta">
                          <span className="designer-match-tag"><Award size={12} /> {designer.matchRate} Match</span>
                          <h4>{designer.name}</h4>
                          <span className="designer-role">{designer.role}</span>
                        </div>
                      </div>
                      <div className="planner__designer-body">
                        <p className="designer-specialty"><strong>Specialty:</strong> {designer.specialty}</p>
                        <p className="designer-bio">"{designer.bio}"</p>
                        <div className="designer-rating">
                          <span className="star">★</span> <span>{designer.rating} / 5.0 (Client Rating)</span>
                        </div>
                      </div>
                      <div className="planner__designer-select-btn">
                        <span className="btn-span">{isSelected ? 'Selected Designer' : 'Select Designer'}</span>
                        {isSelected && <Check size={14} />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="planner__actions-row justify-between">
                <button onClick={handleBack} className="btn-outline">
                  <ChevronLeft size={16} />
                  <span>Back</span>
                </button>
                <button onClick={handleNext} className="btn-primary">
                  <span>Choose Schedule</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SCHEDULE CONSULTATION */}
          {step === 4 && (
            <div className="planner__step anim-fade-in">
              <div className="planner__header">
                <span className="section-label">Step 4 of 5</span>
                <h2 className="planner__title">Choose a consultation <em>slot</em></h2>
                <p className="planner__subtitle">Select your preferred date and time for a virtual or in-studio consultation with your matched designer.</p>
              </div>

              <div className="planner__schedule-layout">
                {/* Date Grid */}
                <div className="planner__schedule-col">
                  <h3><CalendarIcon size={18} /> Select Date</h3>
                  <div className="planner__dates-grid">
                    {availableDates.map(date => (
                      <div 
                        key={date.formatted}
                        onClick={() => setSelectedDate(date.formatted)}
                        className={`planner__date-box ${selectedDate === date.formatted ? 'selected' : ''}`}
                      >
                        <span className="day-name">{date.dayName}</span>
                        <span className="day-num">{date.dayNum}</span>
                        <span className="month">{date.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Grid */}
                <div className="planner__schedule-col">
                  <h3><Clock size={18} /> Select Time</h3>
                  <div className="planner__times-grid">
                    {timeSlots.map(time => (
                      <div 
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`planner__time-box ${selectedTime === time ? 'selected' : ''}`}
                      >
                        <span>{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="planner__actions-row justify-between" style={{ marginTop: '3rem' }}>
                <button onClick={handleBack} className="btn-outline">
                  <ChevronLeft size={16} />
                  <span>Back</span>
                </button>
                <button 
                  onClick={handleNext} 
                  className="btn-primary"
                  disabled={!selectedDate || !selectedTime}
                >
                  <span>Enter Details</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: CLIENT DETAILS */}
          {step === 5 && (
            <div className="planner__step anim-fade-in planner__grid-layout">
              <div className="planner__main">
                <div className="planner__header">
                  <span className="section-label">Step 5 of 5</span>
                  <h2 className="planner__title">Almost <em>done</em></h2>
                  <p className="planner__subtitle">Enter your contact details to secure your slot. Your matched designer will review your space plan before the call.</p>
                </div>

                <form onSubmit={handleConfirm} className="planner__form">
                  <div className="planner__form-group">
                    <label htmlFor="client-name">Full Name</label>
                    <input 
                      type="text" 
                      id="client-name" 
                      required 
                      placeholder="e.g. John Doe"
                      value={clientInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>

                  <div className="planner__form-row">
                    <div className="planner__form-group">
                      <label htmlFor="client-email">Email Address</label>
                      <input 
                        type="email" 
                        id="client-email" 
                        required 
                        placeholder="name@example.com"
                        value={clientInfo.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                    <div className="planner__form-group">
                      <label htmlFor="client-phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="client-phone" 
                        required 
                        placeholder="e.g. +91 98765 43210"
                        value={clientInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="planner__form-group">
                    <label htmlFor="client-notes">Additional project details (Optional)</label>
                    <textarea 
                      id="client-notes" 
                      rows="4" 
                      placeholder="Describe your design goals, any special requirements, or questions you have..."
                      value={clientInfo.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                    />
                  </div>

                  <div className="planner__actions-row" style={{ marginTop: '2rem' }}>
                    <button type="button" onClick={handleBack} className="btn-outline">
                      <ChevronLeft size={16} />
                      <span>Back</span>
                    </button>
                    <button type="submit" className="btn-primary">
                      <span>Book Consultation</span>
                      <Check size={16} />
                    </button>
                  </div>
                </form>
              </div>

              {/* Sidebar Summary Panel */}
              <div className="planner__sidebar">
                <div className="planner__sticky-card planner__summary-card">
                  <h3>Project Summary</h3>
                  
                  <div className="planner__summary-section">
                    <span className="summary-title"><Compass size={14} /> Spaces & Area</span>
                    <div className="summary-body">
                      {selectedSpaces.map(spaceId => {
                        const space = spaceOptions.find(s => s.id === spaceId);
                        const size = spaceSizes[spaceId] || 300;
                        return (
                          <div key={spaceId} className="summary-row">
                            <span>{space?.icon} {space?.label}</span>
                            <span>{size} sq.ft</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="planner__summary-section">
                    <span className="summary-title"><Layers size={14} /> Style & Tier</span>
                    <div className="summary-body">
                      <div className="summary-row">
                        <span>Style:</span>
                        <span>{styleOptions.find(s => s.id === selectedStyle)?.label}</span>
                      </div>
                      <div className="summary-row">
                        <span>Tier:</span>
                        <span>{tierOptions.find(t => t.id === selectedTier)?.label}</span>
                      </div>
                    </div>
                  </div>

                  <div className="planner__summary-section">
                    <span className="summary-title"><User size={14} /> Assigned Designer</span>
                    <div className="summary-body">
                      <div className="summary-row">
                        <span>Lead:</span>
                        <span>{designers.find(d => d.id === selectedDesigner)?.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="planner__summary-section">
                    <span className="summary-title"><CalendarIcon size={14} /> Appt. Time</span>
                    <div className="summary-body">
                      <div className="summary-row">
                        <span>Date:</span>
                        <span>{selectedDate || 'Not selected'}</span>
                      </div>
                      <div className="summary-row">
                        <span>Time:</span>
                        <span>{selectedTime || 'Not selected'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="planner__summary-total-footer">
                    <span>Est. Total Investment</span>
                    <strong>₹{budget.total.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: BOOKING RECEIPT CONFIRMATION */}
          {step === 6 && (
            <div className="planner__step anim-fade-in text-center planner__receipt-step">
              <div className="planner__receipt-card">
                <div className="success-checkmark">
                  <Check size={48} />
                </div>
                <span className="section-label">Consultation Confirmed</span>
                <h2 className="receipt-title">Your interior design slot is <em>secured</em></h2>
                <p className="receipt-subtitle">A calendar invite and project estimation packet has been sent to <strong>{clientInfo.email}</strong>.</p>
                
                <div className="receipt__divider" />

                {/* Ticket Details */}
                <div className="receipt__details-grid">
                  <div className="receipt__col">
                    <span className="label">Client</span>
                    <span className="val">{clientInfo.name}</span>
                  </div>
                  <div className="receipt__col">
                    <span className="label">Designer Assigned</span>
                    <span className="val">{designers.find(d => d.id === selectedDesigner)?.name}</span>
                  </div>
                  <div className="receipt__col">
                    <span className="label">Date & Time</span>
                    <span className="val">{selectedDate} at {selectedTime}</span>
                  </div>
                  <div className="receipt__col">
                    <span className="label">Project Spaces</span>
                    <span className="val">
                      {selectedSpaces.map(spaceId => spaceOptions.find(s => s.id === spaceId)?.label).join(', ')}
                    </span>
                  </div>
                  <div className="receipt__col">
                    <span className="label">Materials Tier</span>
                    <span className="val">{tierOptions.find(t => t.id === selectedTier)?.label}</span>
                  </div>
                  <div className="receipt__col">
                    <span className="label">Est. Duration</span>
                    <span className="val">{budget.duration}</span>
                  </div>
                </div>

                <div className="receipt__divider" />

                <div className="receipt__total-panel">
                  <span>Estimated Total Investment</span>
                  <h3>₹{budget.total.toLocaleString('en-IN')}</h3>
                  <p>Estimated Design Fee portion: ₹{budget.designFee.toLocaleString('en-IN')} (due upon contract approval)</p>
                </div>

                <div className="receipt__footer-actions">
                  <button onClick={handleReset} className="btn-primary">
                    <span>Plan Another Project</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Traditional Contact Info Section for Backup */}
        {step < 6 && (
          <div className="planner__offline-info">
            <div className="offline-item">
              <Phone size={16} />
              <span>Direct Hotline: <strong>+91 98765 43210</strong></span>
            </div>
            <div className="offline-item">
              <Mail size={16} />
              <span>Direct Email: <strong>hello@luxeinteriors.com</strong></span>
            </div>
            <div className="offline-item">
              <Clock size={16} />
              <span>Studio Hours: <strong>Mon - Fri, 9:00 AM - 6:00 PM</strong></span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
