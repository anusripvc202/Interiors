import { Home, Building2, Hotel, Palette, Ruler, Lightbulb } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Services.css';

const services = [
  {
    icon: <Home size={28} />,
    title: 'Residential Design',
    desc: 'Transform your home into a sanctuary of comfort and beauty. From cozy apartments to grand estates, we design with you in mind.',
    tag: 'Most Popular',
  },
  {
    icon: <Building2 size={28} />,
    title: 'Commercial Spaces',
    desc: 'Create environments that inspire productivity and reflect your brand identity — offices, retail, restaurants and beyond.',
    tag: null,
  },
  {
    icon: <Hotel size={28} />,
    title: 'Hospitality Design',
    desc: 'Craft unforgettable guest experiences through thoughtful spatial design for hotels, resorts, and boutique properties.',
    tag: null,
  },
  {
    icon: <Palette size={28} />,
    title: 'Concept & Styling',
    desc: 'From mood boards to material palettes, our concept team builds the creative vision that guides every project.',
    tag: null,
  },
  {
    icon: <Ruler size={28} />,
    title: 'Space Planning',
    desc: 'Optimise every square foot with intelligent layouts that balance flow, function, and aesthetic harmony.',
    tag: null,
  },
  {
    icon: <Lightbulb size={28} />,
    title: 'Lighting Design',
    desc: 'Illuminate your world beautifully. Bespoke lighting schemes that set the perfect mood for every moment.',
    tag: null,
  },
];

export default function Services() {
  const ref = useScrollAnimation();

  return (
    <section id="services" className="services" ref={ref}>
      {/* Top banner */}
      <div className="services__banner">
        <div className="container services__banner-inner">
          {['Residential', 'Commercial', 'Hospitality', 'Retail', 'Wellness', 'Luxury'].map((t) => (
            <span key={t} className="services__banner-item">
              <span className="services__banner-dot">✦</span> {t}
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        {/* Header */}
        <div className="services__header">
          <p className="section-label anim-fade-up">What We Offer</p>
          <h2 className="section-title anim-fade-up anim-delay-1">
            Full-Spectrum <em>Design</em><br />Services
          </h2>
          <p className="services__intro anim-fade-up anim-delay-2">
            From initial concept to final installation, we offer an end-to-end design experience
            that is seamless, inspired, and entirely focused on you.
          </p>
        </div>

        {/* Grid */}
        <div className="services__grid">
          {services.map((s, i) => (
            <div key={s.title} className={`services__card anim-fade-up anim-delay-${(i % 3) + 1}`}>
              {s.tag && <span className="services__card-tag">{s.tag}</span>}
              <div className="services__card-icon">{s.icon}</div>
              <h3 className="services__card-title">{s.title}</h3>
              <p className="services__card-desc">{s.desc}</p>
              <span className="services__card-link">Learn More →</span>
            </div>
          ))}
        </div>

        {/* Turnkey Values Section */}
        <div className="services__values anim-fade-up">
          <div className="services__values-header">
            <p className="section-label">Why Choose Interiors Outfit</p>
            <h3 className="services__values-title">Our Operational <em>Standards</em></h3>
          </div>
          <div className="services__values-grid">
            {[
              { title: 'Turnkey Responsibility', desc: 'From procurement and local permit permissions to supervisor management, we deliver fully furnished keys without client stress.' },
              { title: 'Bespoke Custom Furniture', desc: 'Collaborating directly with expert Italian craftsmen, we build custom fits, cabinetry and details tailored exactly to your space dimensions.' },
              { title: 'Interactive VR Mockups', desc: 'Review every corner of your proposed design through high-fidelity virtual reality renderings before procurement begins.' },
            ].map((v, i) => (
              <div key={v.title} className={`services__value-card anim-delay-${i + 1}`}>
                <div className="services__value-num">0{i + 1}</div>
                <h4 className="services__value-title">{v.title}</h4>
                <p className="services__value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
