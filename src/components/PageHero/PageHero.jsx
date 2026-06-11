import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import './PageHero.css';

export default function PageHero({ title, subtitle, bgImage, theme, breadcrumb }) {
  const ref = useScrollAnimation();

  return (
    <section className={`page-hero ${theme ? `page-hero--${theme}` : ''}`} ref={ref}>
      <div className="page-hero__bg">
        <img src={bgImage} alt={title && typeof title === 'string' ? title : 'Hero image'} className="page-hero__bg-img" />
        <div className="page-hero__overlay" />
      </div>

      <div className="container page-hero__content">
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
    </section>
  );
}
