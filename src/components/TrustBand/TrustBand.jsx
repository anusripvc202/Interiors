import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './TrustBand.css';

const stats = [
  { num: '100+', label: 'Projects Completed', detail: 'Across residential, commercial & hospitality' },
  { num: '50+',  label: 'Happy Clients',      detail: 'With 4.9 ★ average satisfaction score' },
  { num: '5+',   label: 'Years of Expertise', detail: 'Award-winning studio since 2010' },
  { num: '15',   label: 'Design Awards',      detail: 'National & international recognition' },
];

export default function TrustBand() {
  const ref = useScrollAnimation();
  return (
    <section className="trust-band" ref={ref} aria-label="Studio achievements">
      <div className="container trust-band__inner">
        <div className="trust-band__grid">
          {stats.map((s, i) => (
            <div key={s.label} className={`trust-band__item anim-fade-up anim-delay-${i + 1}`}>
              <div className="trust-band__num-row">
                <strong className="trust-band__num">{s.num}</strong>
                <span className="trust-band__line" aria-hidden="true" />
              </div>
              <span className="trust-band__label">{s.label}</span>
              <p className="trust-band__detail">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
