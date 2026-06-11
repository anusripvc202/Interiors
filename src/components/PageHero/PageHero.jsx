import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { Check, Star, Shield, Award, Calendar, Compass, Zap, MapPin, User, Clock } from 'lucide-react';
import './PageHero.css';

const themeHighlights = {
  about: {
    title: "Company Curation",
    items: [
      { icon: Award, text: "Award Winning Design", sub: "Milan Elite Interiors Recognition" },
      { icon: Star, text: "15+ Years Curation", sub: "Crafting bespoke layouts since 2010" },
      { icon: Shield, text: "Verified Quality", sub: "In-house material vetting protocols" }
    ]
  },
  services: {
    title: "Premium Deliverables",
    items: [
      { icon: Zap, text: "Turnkey Implementation", sub: "Complete end-to-end management" },
      { icon: Compass, text: "Virtual VR Walkthroughs", sub: "Immersive 3D styling previews" },
      { icon: Shield, text: "10-Year Warranty", sub: "Extended cover for custom fixtures" }
    ]
  },
  process: {
    title: "Our Guarantees",
    items: [
      { icon: Shield, text: "100% Transparent Pricing", sub: "No hidden cost markup policies" },
      { icon: Clock, text: "45-Day Project Turnaround", sub: "Strict timeline SLA commitments" },
      { icon: Star, text: "Multi-Tier QA Audits", sub: "Rigorous onsite inspection cycles" }
    ]
  },
  portfolio: {
    title: "Designer Panel Features",
    items: [
      { icon: Star, text: "Vetted Professionals Only", sub: "Strict portfolio review entry barrier" },
      { icon: Calendar, text: "Real-Time Booking", sub: "Direct calendar slot coordination" },
      { icon: User, text: "1-on-1 Consultation", sub: "Personalized conceptual styling audits" }
    ]
  },
  contact: {
    title: "National Coverage",
    items: [
      { icon: MapPin, text: "Metropolitan Presence", sub: "Studios in Mumbai, BLR & Delhi" },
      { icon: Clock, text: "Direct Response Team", sub: "Customer coordination within 24 hours" },
      { icon: Calendar, text: "Planner Tool Matching", sub: "Intelligent layout compatibility system" }
    ]
  }
};

export default function PageHero({ title, subtitle, bgImage, theme, breadcrumb }) {
  const ref = useScrollAnimation();
  const highlights = themeHighlights[theme];

  return (
    <section className={`page-hero ${theme ? `page-hero--${theme}` : ''}`} ref={ref}>
      <div className="page-hero__bg">
        <img src={bgImage} alt={title && typeof title === 'string' ? title : 'Hero image'} className="page-hero__bg-img" />
        <div className="page-hero__overlay" />
      </div>

      <div className="container page-hero__content">
        <div className="page-hero__layout">
          {/* Left Column: Title and Subtitle */}
          <div className="page-hero__main">
            <nav className="page-hero__breadcrumbs anim-fade-up">
              <Link to="/" className="page-hero__breadcrumbs-link">Home</Link>
              <span className="page-hero__breadcrumbs-separator">·</span>
              <span className="page-hero__breadcrumbs-current">{breadcrumb || title}</span>
            </nav>

            <h1 className="page-hero__title anim-fade-up anim-delay-1">
              {title}
            </h1>

            {subtitle && (
              <p className="page-hero__subtitle anim-fade-up anim-delay-2">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right Column: Dynamic highlights block */}
          {highlights && (
            <div className="page-hero__side anim-fade-up anim-delay-2">
              <div className="page-hero__card">
                <h4 className="page-hero__card-title">{highlights.title}</h4>
                <div className="page-hero__card-list">
                  {highlights.items.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={idx} className="page-hero__card-item">
                        <div className="page-hero__card-icon">
                          <IconComponent size={16} />
                        </div>
                        <div className="page-hero__card-text">
                          <span className="page-hero__card-label">{item.text}</span>
                          <span className="page-hero__card-sub">{item.sub}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
