import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    quote: "Interiors Outfit completely transformed our penthouse into a masterpiece of light and luxury. Their attention to detail was exceptional.",
    author: "Rajesh Malhotra",
    title: "CEO, Malhotra Group",
    location: "Mumbai",
  },
  {
    quote: "Working with Vikram and Aria was a dream. They balanced high aesthetic standards with absolute structural functionality for our corporate HQ.",
    author: "Aditi Rao",
    title: "Managing Director, TechSpace",
    location: "Bangalore",
  },
  {
    quote: "From our first meeting to the final reveal, the team handled every detail flawlessly. Their bespoke furniture pieces are true works of art.",
    author: "Kabir & Priya Sen",
    title: "Private Villa Owners",
    location: "Goa",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const active = testimonials[index];

  return (
    <section className="testimonials">
      <div className="container testimonials__inner">
        <div className="testimonials__header">
          <p className="section-label">Client Voice</p>
          <h2 className="section-title">Trusted By <em>Visionaries</em></h2>
        </div>

        <div className="testimonials__content">
          <div className="testimonials__quote-icon">
            <Quote size={54} />
          </div>
          <p className="testimonials__quote">"{active.quote}"</p>
          <div className="testimonials__author-info">
            <span className="testimonials__author-name">{active.author}</span>
            <span className="testimonials__author-meta">{active.title} · {active.location}</span>
          </div>
        </div>

        <div className="testimonials__controls">
          <button onClick={handlePrev} className="testimonials__btn" aria-label="Previous testimonial">
            <ChevronLeft size={20} />
          </button>
          <div className="testimonials__dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`testimonials__dot ${index === i ? 'testimonials__dot--active' : ''}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={handleNext} className="testimonials__btn" aria-label="Next testimonial">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
