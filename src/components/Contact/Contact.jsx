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
    setTimeout(() => setSubmitted(true), 800);
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
    <section id="contact" className="contact" ref={ref} aria-label="Contact us section">
      <div className="container contact__grid">

        {/* ── Left: Contact Info ── */}
        <div className="contact__info anim-fade-up">
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">
            Let's Discuss Your <em>Space</em>
          </h2>
          <p className="contact__desc">
            Ready to transform your home or office? Schedule a personal consultation
            with our design director. We'll review your space, discuss your vision,
            and create a customised plan that fits your budget.
          </p>

          {/* Contact Details */}
          <div className="contact__details">
            <a
              href="tel:+919876543210"
              className="contact__item contact__item--link"
              aria-label="Call us at +91 98765 43210"
            >
              <span className="contact__icon">
                <Phone size={20} aria-hidden="true" />
              </span>
              <div>
                <h4>Call Us</h4>
                <p>+91 98765 43210</p>
              </div>
            </a>

            <a
              href="mailto:hello@interiorsoutfit.com"
              className="contact__item contact__item--link"
              aria-label="Email us at hello@interiorsoutfit.com"
            >
              <span className="contact__icon">
                <Mail size={20} aria-hidden="true" />
              </span>
              <div>
                <h4>Email Us</h4>
                <p>hello@interiorsoutfit.com</p>
              </div>
            </a>

            <div className="contact__item">
              <span className="contact__icon">
                <MapPin size={20} aria-hidden="true" />
              </span>
              <div>
                <h4>Visit Studio</h4>
                <p>Level 5, Capital Tower, Bandra Kurla Complex,<br />Mumbai, MH 400051</p>
              </div>
            </div>

            <div className="contact__item">
              <span className="contact__icon">
                <Clock size={20} aria-hidden="true" />
              </span>
              <div>
                <h4>Studio Hours</h4>
                <p>Mon – Fri: 9:00 AM – 6:00 PM<br />Saturday by appointment only</p>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20discuss%20an%20interior%20design%20project"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__whatsapp-btn"
            aria-label="Chat with us on WhatsApp"
          >
            {/* WhatsApp icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.847L0 24l6.306-1.502A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894c-1.853 0-3.584-.505-5.074-1.385l-.362-.215-3.754.894.952-3.664-.235-.375A9.872 9.872 0 012.106 12C2.106 6.536 6.536 2.106 12 2.106S21.894 6.536 21.894 12 17.464 21.894 12 21.894z"/>
            </svg>
            <span>Chat on WhatsApp</span>
            <span className="contact__whatsapp-sub">Typically replies in minutes</span>
          </a>

          {/* Google Maps Embed */}
          <div className="contact__map" aria-label="Studio location on Google Maps">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8!2d72.8687!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c93fda9eb74d%3A0x4e5e9de1c73e8b4e!2sBandra%20Kurla%20Complex%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
              width="100%"
              height="220"
              style={{ border: 0, borderRadius: '12px', display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Interiors Outfit Studio Location — Bandra Kurla Complex, Mumbai"
            />
          </div>
        </div>

        {/* ── Right: Consultation Form ── */}
        <div className="contact__form-card anim-fade-up anim-delay-2">
          {submitted ? (
            <div className="contact__success">
              <div className="contact__success-icon" aria-hidden="true">
                <Check size={40} />
              </div>
              <h3>Consultation Requested!</h3>
              <p>
                Thank you, <strong>{formState.name}</strong>! Our design consultant will review
                your request and contact you within 24 hours.
              </p>
              <button className="btn-primary" onClick={handleReset}>
                <span>Send Another Request</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact__form" noValidate>
              <h3 className="contact__form-title">Book A Free Consultation</h3>
              <p className="contact__form-subtitle">
                Fill in your details below — our team will call you back within 24 hours.
              </p>

              <div className="contact__form-group">
                <label htmlFor="contact-name">Full Name</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  autoComplete="name"
                />
              </div>

              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label htmlFor="contact-email">Email Address</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    autoComplete="email"
                  />
                </div>
                <div className="contact__form-group">
                  <label htmlFor="contact-phone">Phone Number</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label htmlFor="contact-projectType">Project Type</label>
                  <select
                    id="contact-projectType"
                    name="projectType"
                    value={formState.projectType}
                    onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Styling">Concept &amp; Styling</option>
                  </select>
                </div>
                <div className="contact__form-group">
                  <label htmlFor="contact-budget">Estimated Budget</label>
                  <select
                    id="contact-budget"
                    name="budget"
                    value={formState.budget}
                    onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                  >
                    <option value="" disabled>Select Range</option>
                    <option value="Standard (₹5 Lakhs - ₹15 Lakhs)">Standard (₹5L – ₹15L)</option>
                    <option value="Premium (₹15 Lakhs - ₹35 Lakhs)">Premium (₹15L – ₹35L)</option>
                    <option value="Ultra Luxury (₹35 Lakhs+)">Ultra Luxury (₹35L+)</option>
                  </select>
                </div>
              </div>

              <div className="contact__form-group">
                <label htmlFor="contact-message">Project Description</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  required
                  placeholder="Tell us about your space, key requirements, and design preferences..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-primary contact__submit-btn">
                <span>Request Free Consultation</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>

              <p className="contact__form-privacy">
                🔒 Your details are safe with us. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
