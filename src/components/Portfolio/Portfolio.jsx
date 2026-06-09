import { useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Portfolio.css';

const categories = ['All', 'Residential', 'Commercial', 'Hospitality'];

const projects = [
  {
    id: 1,
    title: 'The Marble House',
    category: 'Residential',
    location: 'Mumbai, India',
    size: '4,200 sq.ft',
    img: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=85&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 2,
    title: 'Azure Penthouse',
    category: 'Residential',
    location: 'Delhi, India',
    size: '5,800 sq.ft',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 3,
    title: 'The Grove Restaurant',
    category: 'Hospitality',
    location: 'Bangalore, India',
    size: '2,100 sq.ft',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 4,
    title: 'Serenity Spa & Wellness',
    category: 'Hospitality',
    location: 'Goa, India',
    size: '3,500 sq.ft',
    img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=85&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 5,
    title: 'Vertex HQ',
    category: 'Commercial',
    location: 'Hyderabad, India',
    size: '12,000 sq.ft',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 6,
    title: 'Velvet Loft',
    category: 'Residential',
    location: 'Pune, India',
    size: '2,800 sq.ft',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 7,
    title: 'The Prestige Office',
    category: 'Commercial',
    location: 'Chennai, India',
    size: '8,400 sq.ft',
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=85&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 8,
    title: 'Bloom Boutique Hotel',
    category: 'Hospitality',
    location: 'Jaipur, India',
    size: '18,000 sq.ft',
    img: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=85&auto=format&fit=crop',
    featured: false,
  },
];

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const ref = useScrollAnimation([active]);

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="portfolio" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className="portfolio__header">
          <p className="section-label anim-fade-up">Our Portfolio</p>
          <h2 className="section-title anim-fade-up anim-delay-1">
            Selected <em>Works</em>
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="portfolio__filters anim-fade-up anim-delay-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`portfolio__filter-btn ${active === cat ? 'portfolio__filter-btn--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="portfolio__grid">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className={`portfolio__item anim-fade-up anim-delay-${(i % 4) + 1} ${i === 0 ? 'portfolio__item--featured' : ''}`}
            >
              <div className="portfolio__item-img">
                <img src={p.img} alt={p.title} loading="lazy" />
                <div className="portfolio__item-overlay">
                  <span className="portfolio__item-cat">{p.category}</span>
                  <h3 className="portfolio__item-title">{p.title}</h3>
                  <div className="portfolio__item-meta">
                    <span>📍 {p.location}</span>
                    <span>📐 {p.size}</span>
                  </div>
                  <button className="portfolio__item-cta">View Project →</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio__more anim-fade-up">
          <a href="#contact" className="btn-outline"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <span>See All Projects</span>
          </a>
        </div>
      </div>
    </section>
  );
}
