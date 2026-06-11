import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  User, Mail, Lock, LogOut, Compass, Calendar, Clock, Sparkles, 
  DollarSign, CheckCircle, AlertCircle, X, Check, Edit2, 
  CheckSquare, ShieldAlert, Award, Star, Activity, UserPlus,
  ChevronRight
} from 'lucide-react';
import './LoginPage.css';

export default function LoginPage() {
  const { 
    user, bookings, designersList, login, signup, logout, 
    cancelBooking, updateBookingStatus, updateDesignerProfile 
  } = useAuth();

  const details = (user && user.role === 'designer' && user.details) || {};

  // Login form state
  const [activeTab, setActiveTab] = useState('client'); // 'client' | 'designer'
  const [isSignUp, setIsSignUp] = useState(false);
  const [regRole, setRegRole] = useState('client'); // 'client' | 'designer'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [preferredStyle, setPreferredStyle] = useState('Japandi Minimalism');
  const [regCity, setRegCity] = useState('Bangalore');
  const [regStyleSpecialty, setRegStyleSpecialty] = useState('Japandi Minimalism');
  const [regExperience, setRegExperience] = useState('5 Years');
  const [regStartingRate, setRegStartingRate] = useState('15000');
  const [regBio, setRegBio] = useState('');
  const [regAvatarUrl, setRegAvatarUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Editing profile state (for designers)
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editBio, setEditBio] = useState('');
  const [editRate, setEditRate] = useState(0);
  const [editRole, setEditRole] = useState('');

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Filter client consultations
  const clientBookings = user && user.role === 'client' && Array.isArray(bookings)
    ? bookings.filter(b => b.clientEmail && b.clientEmail.toLowerCase() === (user.email && user.email.toLowerCase()))
    : [];

  // Filter designer consultations
  const designerBookings = user && user.role === 'designer' && Array.isArray(bookings)
    ? bookings.filter(b => b.designerId === user.designerId)
    : [];

  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size must be under 5MB.');
      return;
    }

    setUploadError('');
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:5000/api/auth/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.url) {
          setRegAvatarUrl(data.url);
          setIsUploading(false);
          return;
        }
      }
      
      console.warn('Backend image upload failed or server offline. Using local base64 fallback.');
      const reader = new FileReader();
      reader.onloadend = () => {
        setRegAvatarUrl(reader.result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);

    } catch (err) {
      console.warn('Error uploading to backend, falling back to base64: ', err);
      const reader = new FileReader();
      reader.onloadend = () => {
        setRegAvatarUrl(reader.result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password, activeTab);
    if (!result.success) {
      setError(result.message || 'Login failed. Please verify credentials.');
    } else {
      // Clear form
      setEmail('');
      setPassword('');
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    let result;
    if (regRole === 'designer') {
      if (!regCity || !regStyleSpecialty || !regExperience || !regStartingRate) {
        setError('Please fill in all designer profile fields.');
        return;
      }
      result = await signup(name, email, password, 'designer', '', {
        city: regCity,
        styleSpecialty: regStyleSpecialty,
        experience: regExperience,
        startingRate: Number(regStartingRate),
        bio: regBio,
        avatarUrl: regAvatarUrl
      });
    } else {
      result = await signup(name, email, password, 'client', preferredStyle, {});
    }

    if (!result.success) {
      setError(result.message || 'Signup failed.');
    } else {
      setSuccessMsg(
        regRole === 'designer' 
          ? 'Designer account registered successfully! Loading designer portal...' 
          : 'Account registered successfully! Loading your client dashboard...'
      );
      // Clear form
      setName('');
      setEmail('');
      setPassword('');
      setRegBio('');
      setRegAvatarUrl('');
      setIsSignUp(false);
    }
  };

  const fillDemoCredentials = (role, demoEmail) => {
    setError('');
    setActiveTab(role);
    setIsSignUp(false);
    setEmail(demoEmail);
    setPassword('password');
  };

  const handleEditProfileInit = () => {
    if (user && user.role === 'designer') {
      setEditBio(details.bio || '');
      setEditRate(details.startingRate || 0);
      setEditRole(details.role || '');
      setIsEditingProfile(true);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (user && user.role === 'designer') {
      updateDesignerProfile(user.designerId, {
        bio: editBio,
        startingRate: Number(editRate),
        role: editRole
      });
      setIsEditingProfile(false);
    }
  };

  // Get recommendations based on client style
  const getStyleAdvice = (styleId) => {
    switch (styleId) {
      case 'japandi':
        return {
          palette: ['#F3EFE0', '#E5DDC8', '#A2B5CD', '#4B5263'],
          materials: 'Light oak, clay plaster, organic linen, raw stone.',
          tips: 'Keep spaces clutter-free, focus on low-profile furniture, and let natural light dictate the room volume.'
        };
      case 'modern':
        return {
          palette: ['#FFFFFF', '#D9D9D9', '#2C3E50', '#1A1A1A'],
          materials: 'Polished marble, brass, smoked glass, velvet.',
          tips: 'Introduce recessed smart LED tracks, incorporate large accent metal structures, and prioritize custom cabinetry.'
        };
      case 'parisian':
        return {
          palette: ['#F9F6F0', '#EEDAC2', '#7E6B5A', '#2E2B2A'],
          materials: 'Plaster molding, gilded wood, crystal, velvet.',
          tips: 'Install crown moldings along ceiling perimeters, feature vintage frame mirrors above fire mantles, and focus on classic statement seating.'
        };
      case 'midcentury':
        return {
          palette: ['#E9C46A', '#F4A261', '#E76F51', '#264653'],
          materials: 'Teak wood, colored fiberglass, organic cotton, steel.',
          tips: 'Integrate active biophilic plant corners, place iconic hairpin leg sideboards, and select geometric patterned carpets.'
        };
      default:
        return {
          palette: ['#F8F5F0', '#C9A96E', '#1A1814', '#9C9590'],
          materials: 'Selected timbers, premium fabrics, decorative metals.',
          tips: 'Collaborate with your lead designer to build a personalized layout suited to your functional goals.'
        };
    }
  };

  return (
    <div className="login-page">
      {/* 1. GUEST FORM UI */}
      {!user && (
        <section className="login-section container">
          <div className="login-card anim-fade-up visible">
            
            {/* Header */}
            <div className="login-card__header">
              <span className="logo-spark">✦</span>
              <h2>Luxe<em>Portal</em></h2>
              <p>{isSignUp ? 'Create a premium client profile' : 'Sign in to access your luxury interior studio'}</p>
            </div>

            {/* Error & Success Messages */}
            {error && (
              <div className="auth-alert error">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
            {successMsg && (
              <div className="auth-alert success">
                <CheckCircle size={16} />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Tabs (Only if not signing up) */}
            {!isSignUp && (
              <div className="auth-tabs">
                <button 
                  onClick={() => { setActiveTab('client'); setError(''); }}
                  className={`auth-tab ${activeTab === 'client' ? 'active' : ''}`}
                >
                  <User size={14} />
                  <span>Client Login</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('designer'); setError(''); }}
                  className={`auth-tab ${activeTab === 'designer' ? 'active' : ''}`}
                >
                  <Award size={14} />
                  <span>Designer Login</span>
                </button>
              </div>
            )}

            {/* Form */}
            {isSignUp ? (
              // SIGN UP FORM (CLIENT OR DESIGNER)
              <form onSubmit={handleSignUpSubmit} className="auth-form">
                
                {/* Role Tabs for Sign Up */}
                <div className="auth-tabs" style={{ marginBottom: '1.5rem' }}>
                  <button 
                    type="button"
                    onClick={() => { setRegRole('client'); setError(''); }}
                    className={`auth-tab ${regRole === 'client' ? 'active' : ''}`}
                  >
                    <User size={14} />
                    <span>Client Signup</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => { setRegRole('designer'); setError(''); }}
                    className={`auth-tab ${regRole === 'designer' ? 'active' : ''}`}
                  >
                    <Award size={14} />
                    <span>Designer Signup</span>
                  </button>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-name">Full Name</label>
                  <div className="input-wrapper">
                    <User size={16} className="input-icon" />
                    <input 
                      type="text" 
                      id="reg-name" 
                      required 
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-email">Email Address</label>
                  <div className="input-wrapper">
                    <Mail size={16} className="input-icon" />
                    <input 
                      type="email" 
                      id="reg-email" 
                      required 
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-password">Password</label>
                  <div className="input-wrapper">
                    <Lock size={16} className="input-icon" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      id="reg-password" 
                      required 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      type="button"
                      className="pwd-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {regRole === 'client' ? (
                  /* Client Fields */
                  <div className="form-group">
                    <label htmlFor="reg-style">Preferred Design Theme</label>
                    <select 
                      id="reg-style"
                      value={preferredStyle}
                      onChange={(e) => setPreferredStyle(e.target.value)}
                      className="select-input"
                    >
                      <option value="Japandi Minimalism">Japandi Minimalism</option>
                      <option value="Modern Luxury">Modern Luxury</option>
                      <option value="Classic Parisian">Classic Parisian</option>
                      <option value="Mid-Century Organic">Mid-Century Organic</option>
                    </select>
                  </div>
                ) : (
                  /* Designer Fields */
                  <>
                    <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label htmlFor="reg-city">City / Location</label>
                        <select 
                          id="reg-city"
                          value={regCity}
                          onChange={(e) => setRegCity(e.target.value)}
                          className="select-input"
                        >
                          <option value="Bangalore">Bangalore</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Delhi">Delhi</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="reg-specialty">Specialty Style</label>
                        <select 
                          id="reg-specialty"
                          value={regStyleSpecialty}
                          onChange={(e) => setRegStyleSpecialty(e.target.value)}
                          className="select-input"
                        >
                          <option value="Japandi Minimalism">Japandi Minimalism</option>
                          <option value="Modern Luxury">Modern Luxury</option>
                          <option value="Classic Parisian">Classic Parisian</option>
                          <option value="Mid-Century Organic">Mid-Century Organic</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label htmlFor="reg-experience">Experience</label>
                        <input 
                          type="text" 
                          id="reg-experience" 
                          required 
                          placeholder="e.g. 5 Years"
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--cream-dark)', outline: 'none' }}
                          value={regExperience}
                          onChange={(e) => setRegExperience(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="reg-rate">Starting Rate (₹)</label>
                        <input 
                          type="number" 
                          id="reg-rate" 
                          required 
                          placeholder="e.g. 15000"
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--cream-dark)', outline: 'none' }}
                          value={regStartingRate}
                          onChange={(e) => setRegStartingRate(e.target.value)}
                        />
                      </div>
                    </div>

                     <div className="form-group">
                      <label>Profile Photo</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
                        <div style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--cream-light)',
                          border: '2px dashed var(--cream-dark)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          flexShrink: 0
                        }}>
                          {regAvatarUrl ? (
                            <img 
                              src={regAvatarUrl} 
                              alt="Preview" 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                          ) : (
                            <User size={24} style={{ color: 'var(--charcoal-light)' }} />
                          )}
                        </div>
                        
                        <div style={{ flexGrow: 1 }}>
                          <label htmlFor="reg-avatar-file" style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            backgroundColor: 'var(--cream-dark)',
                            color: 'var(--charcoal)',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: '500',
                            transition: 'background-color 0.2s',
                            border: '1px solid transparent'
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#e2d4c5'}
                          onMouseOut={(e) => e.target.style.backgroundColor = 'var(--cream-dark)'}
                          >
                            Choose Photo
                          </label>
                          <input 
                            type="file" 
                            id="reg-avatar-file" 
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageFileChange}
                          />
                          <div style={{ fontSize: '0.75rem', color: 'var(--charcoal-light)', marginTop: '0.25rem' }}>
                            {isUploading ? (
                              <span style={{ color: 'var(--accent)' }}>Uploading photo...</span>
                            ) : uploadError ? (
                              <span style={{ color: 'red' }}>{uploadError}</span>
                            ) : regAvatarUrl ? (
                              <span style={{ color: 'green' }}>✓ Photo uploaded</span>
                            ) : (
                              <span>Upload profile photo (Max 5MB)</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="reg-bio">Professional Bio</label>
                      <textarea 
                        id="reg-bio"
                        placeholder="Describe your design background, philosophy, and special skills..."
                        value={regBio}
                        onChange={(e) => setRegBio(e.target.value)}
                        rows={3}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--cream-dark)', outline: 'none', fontFamily: 'inherit', fontSize: '0.85rem' }}
                      />
                    </div>
                  </>
                )}

                <button type="submit" className="btn-primary auth-submit">
                  <span>Register Premium Profile</span>
                  <UserPlus size={16} />
                </button>

                <div className="auth-toggle-link">
                  <span>Already have an account? </span>
                  <button type="button" onClick={() => setIsSignUp(false)}>Sign In Here</button>
                </div>
              </form>
            ) : (
              // LOGIN FORM (CLIENT OR DESIGNER)
              <form onSubmit={handleLoginSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="auth-email">Email Address</label>
                  <div className="input-wrapper">
                    <Mail size={16} className="input-icon" />
                    <input 
                      type="email" 
                      id="auth-email" 
                      required 
                      placeholder={activeTab === 'client' ? "client@luxe.com" : "aria@luxe.com"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="label-row">
                    <label htmlFor="auth-password">Password</label>
                  </div>
                  <div className="input-wrapper">
                    <Lock size={16} className="input-icon" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      id="auth-password" 
                      required 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      type="button"
                      className="pwd-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-primary auth-submit">
                  <span>Sign In To Portal</span>
                  <ChevronRight size={16} />
                </button>

                <div className="auth-toggle-link">
                  <span>New to LuxeInteriors? </span>
                  <button type="button" onClick={() => setIsSignUp(true)}>Create Client Profile</button>
                </div>
              </form>
            )}

            {/* Quick Demo Helper Pills */}
            <div className="demo-helper">
              <span className="demo-helper__title"><Sparkles size={12} /> Live Developer Demo Credentials</span>
              <div className="demo-helper__pills">
                <button 
                  onClick={() => fillDemoCredentials('client', 'client@luxe.com')}
                  className="demo-pill"
                >
                  Demo Client
                </button>
                <button 
                  onClick={() => fillDemoCredentials('designer', 'aria@luxe.com')}
                  className="demo-pill"
                >
                  Demo Designer (Aria)
                </button>
                <button 
                  onClick={() => fillDemoCredentials('designer', 'julian@luxe.com')}
                  className="demo-pill"
                >
                  Demo Designer (Julian)
                </button>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 2. AUTHENTICATED CLIENT DASHBOARD */}
      {user && user.role === 'client' && (
        <section className="dashboard container anim-fade-in">
          
          {/* Welcome Banner */}
          <div className="dashboard-banner">
            <div className="banner-details">
              <span className="badge-gold">Client Account</span>
              <h1>Welcome, {user.name}</h1>
              <p className="subtitle">Luxe client portal for custom design plans and bookings.</p>
            </div>
            <button onClick={logout} className="btn-logout">
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>

          <div className="dashboard-grid">
            
            {/* Left: Schedule and Estimations */}
            <div className="dashboard-main-col">
              
              {/* Consultations Card */}
              <div className="dash-card">
                <div className="dash-card__header">
                  <Calendar size={18} className="header-icon" />
                  <h3>My Studio Consultations</h3>
                </div>
                <div className="dash-card__body">
                  {clientBookings.length === 0 ? (
                    <div className="empty-state">
                      <Clock size={36} />
                      <p>You do not have any consultations scheduled at this moment.</p>
                      <a href="#/contact" className="btn-outline" style={{ marginTop: '1rem' }}>Book a Consultation</a>
                    </div>
                  ) : (
                    <div className="bookings-list">
                      {clientBookings.map(booking => (
                        <div key={booking.id} className="booking-row">
                          <div className="booking-main">
                            <span className={`booking-status-badge ${booking.status.toLowerCase()}`}>
                              {booking.status}
                            </span>
                            <h4>{booking.spaceType} Custom Consultation</h4>
                            <p className="booking-meta">
                              <span><strong>Designer:</strong> {booking.designerName}</span>
                              <span className="dot">•</span>
                              <span><Clock size={12} /> {booking.date} at {booking.time}</span>
                            </p>
                          </div>
                          <div className="booking-right">
                            <div className="booking-value">
                              <span className="label">Est. Investment</span>
                              <span className="val">{booking.cost || '₹4,50,000'}</span>
                            </div>
                            {booking.status === 'Scheduled' && (
                              <button 
                                onClick={() => {
                                  if (window.confirm('Are you sure you want to cancel this booking?')) {
                                    cancelBooking(booking.id);
                                  }
                                }}
                                className="btn-cancel"
                                aria-label="Cancel consultation"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* History estimates */}
              <div className="dash-card" style={{ marginTop: '2rem' }}>
                <div className="dash-card__header">
                  <DollarSign size={18} className="header-icon" />
                  <h3>Recent Interactive Estimates</h3>
                </div>
                <div className="dash-card__body">
                  <div className="table-responsive">
                    <table className="estimates-table">
                      <thead>
                        <tr>
                          <th>Space Type</th>
                          <th>Craftsmanship Tier</th>
                          <th>Approx Area</th>
                          <th>Est. Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>🛋️ Living Room / Lounge</td>
                          <td><span className="badge-luxury">Ultra-Luxury</span></td>
                          <td>450 Sq.Ft</td>
                          <td>₹11,66,400</td>
                        </tr>
                        <tr>
                          <td>🍳 Gourmet Kitchen</td>
                          <td><span className="badge-premium">Premium</span></td>
                          <td>300 Sq.Ft</td>
                          <td>₹6,04,800</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Profile details & styling recommendations */}
            <div className="dashboard-side-col">
              
              {/* Profile Card */}
              <div className="dash-card side-card">
                <div className="dash-card__header">
                  <User size={18} className="header-icon" />
                  <h3>My Design Profile</h3>
                </div>
                <div className="dash-card__body profile-detail">
                  <div className="detail-item">
                    <span className="label">Email Address</span>
                    <span className="val">{user.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Preferred Aesthetic Theme</span>
                    <span className="val theme-highlight">
                      <Compass size={14} />
                      {user.preferredStyle}
                    </span>
                  </div>
                </div>
              </div>

              {/* Aesthetic recommendation */}
              <div className="dash-card side-card advice-card" style={{ marginTop: '2rem' }}>
                <div className="dash-card__header">
                  <Sparkles size={18} className="header-icon" />
                  <h3>Style Recommendations</h3>
                </div>
                <div className="dash-card__body">
                  {(() => {
                    const advice = getStyleAdvice(user.styleId);
                    return (
                      <div className="advice-content">
                        <div className="advice-group">
                          <span className="label">Curated Palette Colors</span>
                          <div className="color-swatches">
                            {advice.palette.map((color, index) => (
                              <div 
                                key={index} 
                                className="swatch" 
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="advice-group">
                          <span className="label">Recommended Materials</span>
                          <p>{advice.materials}</p>
                        </div>
                        <div className="advice-group">
                          <span className="label">Pro Styling Tip</span>
                          <p className="tip-text">"{advice.tips}"</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

            </div>

          </div>

        </section>
      )}

      {/* 3. AUTHENTICATED DESIGNER DASHBOARD */}
      {user && user.role === 'designer' && (
        <section className="dashboard container anim-fade-in">
          
          {/* Welcome Banner */}
          <div className="dashboard-banner designer-banner">
            <div className="designer-info-wrap">
              <img 
                src={details.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80"} 
                alt={user.name} 
                className="designer-avatar-large"
              />
              <div className="banner-details">
                <span className="badge-gold">Lead Designer Account</span>
                <h1>{user.name}</h1>
                <p className="subtitle">{details.role || 'Lead Designer'} | {details.city || 'Luxe'} Studio</p>
              </div>
            </div>
            <button onClick={logout} className="btn-logout">
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>

          <div className="dashboard-grid">
            
            {/* Left: Client bookings table */}
            <div className="dashboard-main-col">
              
              <div className="dash-card">
                <div className="dash-card__header justify-between">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckSquare size={18} className="header-icon" />
                    <h3>Client Consultation Schedule</h3>
                  </div>
                  <span className="badge-small">{designerBookings.length} Active Slots</span>
                </div>
                <div className="dash-card__body">
                  {designerBookings.length === 0 ? (
                    <div className="empty-state">
                      <Clock size={36} />
                      <p>You do not have any assigned consultations scheduled at this moment.</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="designer-schedule-table">
                        <thead>
                          <tr>
                            <th>Client Name</th>
                            <th>Space Type</th>
                            <th>Date & Time</th>
                            <th>Est. Value</th>
                            <th>Status Control</th>
                          </tr>
                        </thead>
                        <tbody>
                          {designerBookings.map(booking => (
                            <tr key={booking.id}>
                              <td>
                                <div className="client-cell">
                                  <strong>{booking.clientName}</strong>
                                  <span>{booking.clientEmail}</span>
                                </div>
                              </td>
                              <td>{booking.spaceType}</td>
                              <td>
                                <div className="date-cell">
                                  <span>{booking.date}</span>
                                  <span>at {booking.time}</span>
                                </div>
                              </td>
                              <td className="cost-val">{booking.cost || '₹4,50,000'}</td>
                              <td>
                                <div className="status-controller">
                                  <span className={`status-badge-inline ${booking.status.toLowerCase()}`}>
                                    {booking.status}
                                  </span>
                                  <select 
                                    value={booking.status} 
                                    onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                                    className="status-dropdown"
                                  >
                                    <option value="Scheduled">Scheduled</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                  </select>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Designer bio editing section */}
              <div className="dash-card" style={{ marginTop: '2rem' }}>
                <div className="dash-card__header justify-between">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Edit2 size={18} className="header-icon" />
                    <h3>Profile Portfolio Settings</h3>
                  </div>
                  {!isEditingProfile && (
                    <button onClick={handleEditProfileInit} className="btn-edit-inline">
                      Edit Profile
                    </button>
                  )}
                </div>
                <div className="dash-card__body">
                  {isEditingProfile ? (
                    <form onSubmit={handleSaveProfile} className="profile-edit-form">
                      <div className="form-group">
                        <label htmlFor="edit-role">Design Title / Role</label>
                        <input 
                          type="text" 
                          id="edit-role"
                          required
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="edit-rate">Starting Consultation Rate (₹)</label>
                        <input 
                          type="number" 
                          id="edit-rate"
                          required
                          value={editRate}
                          onChange={(e) => setEditRate(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="edit-bio">Studio Biography</label>
                        <textarea 
                          id="edit-bio" 
                          rows="4" 
                          required
                          value={editBio}
                          onChange={(e) => setEditBio(e.target.value)}
                        />
                      </div>

                      <div className="btn-row-edit">
                        <button type="button" onClick={() => setIsEditingProfile(false)} className="btn-outline btn-sm">
                          Cancel
                        </button>
                        <button type="submit" className="btn-primary btn-sm">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="designer-profile-display">
                      <div className="display-row">
                        <span className="label">Public Role Title</span>
                        <span className="val">{details.role}</span>
                      </div>
                      <div className="display-row">
                        <span className="label">Studio Specialty</span>
                        <span className="val">{details.style}</span>
                      </div>
                      <div className="display-row">
                        <span className="label">Consultation Starting rate</span>
                        <span className="val">₹{(details.startingRate || 0).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="display-row">
                        <span className="label">Biography</span>
                        <p className="bio-display-text">"{details.bio}"</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right: Metrics & stats */}
            <div className="dashboard-side-col">
              
              {/* Metrics Card */}
              <div className="dash-card side-card">
                <div className="dash-card__header">
                  <Activity size={18} className="header-icon" />
                  <h3>Studio Performance</h3>
                </div>
                <div className="dash-card__body metrics-list">
                  <div className="metric-box">
                    <span className="metric-val">{details.rating || 5.0} <Star size={14} className="star-icon" /></span>
                    <span className="metric-lbl">Average Rating ({details.reviewsCount || 0} reviews)</span>
                  </div>
                  
                  <div className="metric-box">
                    <span className="metric-val">{details.experience || '8 Years'}</span>
                    <span className="metric-lbl">Studio Experience</span>
                  </div>

                  <div className="metric-box">
                    <span className="metric-val">{details.city || 'Mumbai'}</span>
                    <span className="metric-lbl">Primary Studio Office</span>
                  </div>
                </div>
              </div>

              {/* Safety notice */}
              <div className="dash-card side-card advice-card alert-card" style={{ marginTop: '2rem' }}>
                <div className="dash-card__header">
                  <ShieldAlert size={18} className="header-icon" />
                  <h3>Security & Protocol</h3>
                </div>
                <div className="dash-card__body">
                  <p style={{ fontSize: '0.85rem', color: 'var(--stone)', lineHeight: '1.6' }}>
                    Verify layout measurements before uploading 3D concepts. Project fee structures remain locked once the digital schedule reaches <strong style={{ color: 'var(--gold-dark)' }}>In Progress</strong> state.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </section>
      )}

    </div>
  );
}
