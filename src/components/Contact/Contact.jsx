import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight, Check } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Contact.css';

export default function Contact() {
  const ref = useScrollAnimation();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential',
    budget: 'Premium (₹15 Lakhs - ₹35 Lakhs)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API request
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setFormState({
      name: '',
      email: '',
      phone: '',
      projectType: 'Residential',
      budget: 'Premium (₹15 Lakhs - ₹35 Lakhs)',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container contact__grid">
        {/* Contact Info */}
        <div className="contact__info anim-fade-up">
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">
            Let's Discuss Your <em>Space</em>
          </h2>
          <p className="contact__desc">
            Ready to transform your home or office? Schedule a personal consultation
            with our design director. We will review your space, discuss your ideas,
            and explain how we can bring them to life.
          </p>

          <div className="contact__details">
            <div className="contact__item">
              <span className="contact__icon">
                <Phone size={20} />
              </span>
              <div>
                <h4>Call Us</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="contact__item">
              <span className="contact__icon">
                <Mail size={20} />
              </span>
              <div>
                <h4>Email Us</h4>
                <p>hello@luxeinteriors.com</p>
              </div>
            </div>

            <div className="contact__item">
              <span className="contact__icon">
                <MapPin size={20} />
              </span>
              <div>
                <h4>Visit Studio</h4>
                <p>Level 5, Capital Tower, Bandra Kurla Complex, Mumbai, MH 400051</p>
              </div>
            </div>

            <div className="contact__item">
              <span className="contact__icon">
                <Clock size={20} />
              </span>
              <div>
                <h4>Studio Hours</h4>
                <p>Mon - Fri: 9:00 AM - 6:00 PM <br />Saturday by appointment only</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="contact__form-card anim-fade-up anim-delay-2">
          {submitted ? (
            <div className="contact__success">
              <div className="contact__success-icon">
                <Check size={40} />
              </div>
              <h3>Consultation Requested!</h3>
              <p>
                Thank you for reaching out, <strong>{formState.name}</strong>. Our design consultant will review your request and get in touch with you within 24 hours.
              </p>
              <button className="btn-primary" onClick={handleReset}>
                <span>Send Another Request</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact__form">
              <h3 className="contact__form-title">Book A Consultation</h3>
              <p className="contact__form-subtitle">Fill in the details below to request a callback.</p>

              <div className="contact__form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Enter your name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </div>

              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="name@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>
                <div className="contact__form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    placeholder="Enter phone number"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label htmlFor="projectType">Project Type</label>
                  <select
                    id="projectType"
                    value={formState.projectType}
                    onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Styling">Concept & Styling</option>
                  </select>
                </div>
                <div className="contact__form-group">
                  <label htmlFor="budget">Estimated Budget</label>
                  <select
                    id="budget"
                    value={formState.budget}
                    onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                  >
                    <option value="Select Range" disabled>Select Range</option>
                    <option value="Standard (₹5 Lakhs - ₹15 Lakhs)">Standard (₹5 Lakhs - ₹15 Lakhs)</option>
                    <option value="Premium (₹15 Lakhs - ₹35 Lakhs)">Premium (₹15 Lakhs - ₹35 Lakhs)</option>
                    <option value="Ultra Luxury (₹35 Lakhs+)">Ultra Luxury (₹35 Lakhs+)</option>
                  </select>
                </div>
              </div>

              <div className="contact__form-group">
                <label htmlFor="message">Project Description</label>
                <textarea
                  id="message"
                  rows="4"
                  required
                  placeholder="Tell us briefly about your space, key requirements and design preferences..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn-primary contact__submit-btn">
                <span>Submit Request</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
