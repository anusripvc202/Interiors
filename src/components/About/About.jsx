import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './About.css';

const pillars = [
  { icon: '◈', title: 'Bespoke Design', desc: 'Every project is uniquely tailored to your lifestyle, tastes, and functional requirements.' },
  { icon: '◉', title: 'Curated Materials', desc: 'We source only the finest materials from artisans and suppliers worldwide.' },
  { icon: '◐', title: 'White-Glove Service', desc: 'From concept to final reveal, we manage every detail with precision and care.' },
];

export default function About() {
  const ref = useScrollAnimation();

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container about__grid">

        {/* Image stack */}
        <div className="about__images anim-fade-up">
          <div className="about__img-main">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=85&auto=format&fit=crop"
              alt="Signature Living room interior design project in Mumbai"
              loading="lazy"
            />
            <div className="about__img-caption">Showcase: Signature Living, Mumbai</div>
          </div>
          <div className="about__img-accent">
            <img
              src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=500&q=85&auto=format&fit=crop"
              alt="Custom Oakwood study room interior design detail in Delhi"
              loading="lazy"
            />
            <div className="about__img-caption">Fitting: Oakwood Study, Delhi</div>
          </div>
          <div className="about__img-badge">
            <span className="about__img-badge-num">15+</span>
            <span className="about__img-badge-txt">Years of<br />Excellence</span>
          </div>
        </div>

        {/* Text */}
        <div className="about__text">
          <p className="section-label anim-fade-up">Our Philosophy</p>
          <h2 className="section-title anim-fade-up anim-delay-1">
            Design That Speaks<br />to the <em>Soul</em>
          </h2>
          <p className="about__desc anim-fade-up anim-delay-2">
            At Interiors Outfit, we believe great design goes beyond aesthetics — it's about
            creating spaces that resonate with who you are. Founded in 2010, our studio has
            crafted over 500 exceptional interiors across residential, commercial, and
            hospitality sectors.
          </p>
          <p className="about__desc anim-fade-up anim-delay-2">
            Our team of award-winning designers blends classical elegance with contemporary
            sensibility, always with an eye for the unexpected detail that transforms a room
            from beautiful to extraordinary.
          </p>

          {/* Pillars */}
          <div className="about__pillars">
            {pillars.map((p, i) => (
              <div key={p.title} className={`about__pillar anim-fade-up anim-delay-${i + 2}`}>
                <span className="about__pillar-icon">{p.icon}</span>
                <div>
                  <h4 className="about__pillar-title">{p.title}</h4>
                  <p className="about__pillar-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a href="#portfolio" className="btn-primary anim-fade-up anim-delay-4"
            onClick={(e) => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <span>View Our Portfolio</span>
          </a>
        </div>
      </div>

      {/* Leadership / Team Showcase */}
      <div className="container about__team-section">
        <div className="about__team-header anim-fade-up">
          <p className="section-label">Creative Minds</p>
          <h3 className="about__team-title">Our Design <em>Directors</em></h3>
        </div>
        <div className="about__team-grid">
          {[
            {
              name: 'Aria Sharma',
              role: 'Principal Designer & Co-Founder',
              bio: 'With over a decade of design experience in Milan and London, Aria leads the creative vision at Interiors Outfit, specializing in upscale residential estates and customized bespoke furniture.',
              img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop',
            },
            {
              name: 'Vikram Roy',
              role: 'Lead Architect',
              bio: 'Vikram brings structural expertise and contemporary minimalism to our commercial and hospitality designs. His layouts prioritize functional flow and light optimization.',
              img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop',
            },
          ].map((t, idx) => (
            <div key={t.name} className={`about__team-card anim-fade-up anim-delay-${idx + 1}`}>
              <div className="about__team-img-wrapper">
                <img src={t.img} alt={t.name} />
              </div>
              <div className="about__team-info">
                <h4>{t.name}</h4>
                <h5>{t.role}</h5>
                <p>{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
