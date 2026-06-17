import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    quote: "Interiors Outfit completely transformed our penthouse into a masterpiece of light and luxury. Their attention to detail was absolutely exceptional.",
    author: "Rajesh Malhotra",
    title: "CEO, Malhotra Group",
    location: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fit=crop&crop=face",
    rating: 5,
    project: "Penthouse Renovation",
  },
  {
    quote: "Working with the team was a dream. They balanced high aesthetic standards with structural functionality for our corporate HQ — delivered on time and under budget.",
    author: "Aditi Rao",
    title: "Managing Director, TechSpace",
    location: "Bangalore",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&fit=crop&crop=face",
    rating: 5,
    project: "Corporate HQ Interior",
  },
  {
    quote: "From our first meeting to the final reveal, the team handled every detail flawlessly. Their bespoke furniture pieces are true works of art — we get compliments every day!",
    author: "Kabir & Priya Sen",
    title: "Private Villa Owners",
    location: "Goa",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&q=80&fit=crop&crop=face",
    rating: 5,
    project: "Villa Interior Design",
  },
  {
    quote: "Our office space went from dull and uninspiring to absolutely stunning. The team understood our brand identity and translated it perfectly into the interior.",
    author: "Sneha Kapoor",
    title: "Founder, Studio K",
    location: "Delhi",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&fit=crop&crop=face",
    rating: 5,
    project: "Boutique Office Design",
  },
];

function StarRating({ count }) {
  return (
    <div className="testimonials__stars" aria-label={`${count} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < count ? '#f59e0b' : 'none'}
          stroke={i < count ? '#f59e0b' : 'currentColor'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const handlePrev = () => setIndex((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  const handleNext = () => setIndex((p) => (p === testimonials.length - 1 ? 0 : p + 1));
  const active = testimonials[index];

  return (
    <section className="testimonials" aria-label="Client testimonials">
      <div className="container testimonials__wrapper">

        {/* Header */}
        <div className="testimonials__header">
          <p className="section-label">Real Client Reviews</p>
          <h2 className="section-title">Trusted By <em>Visionaries</em></h2>
          <p className="testimonials__header-desc">
            Over 200 happy clients across India — here's what they say about us.
          </p>
        </div>

        {/* Main Quote Card */}
        <div className="testimonials__card-wrap">
          <div className="testimonials__card" key={index}>
            {/* Quote icon */}
            <div className="testimonials__quote-icon" aria-hidden="true">
              <Quote size={42} />
            </div>

            {/* Stars */}
            <StarRating count={active.rating} />

            {/* Quote text */}
            <blockquote className="testimonials__quote">
              "{active.quote}"
            </blockquote>

            {/* Author */}
            <div className="testimonials__author">
              <img
                src={active.avatar}
                alt={`Portrait of ${active.author}`}
                className="testimonials__avatar"
                loading="lazy"
                width="56"
                height="56"
              />
              <div className="testimonials__author-info">
                <span className="testimonials__author-name">{active.author}</span>
                <span className="testimonials__author-meta">{active.title} · {active.location}</span>
                <span className="testimonials__project-tag">
                  ✦ {active.project}
                </span>
              </div>
              <div className="testimonials__verified-badge" aria-label="Verified client review">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Verified Client
              </div>
            </div>
          </div>
        </div>

        {/* Controls + Thumbnail Strip */}
        <div className="testimonials__controls">
          <button
            onClick={handlePrev}
            className="testimonials__btn"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>

          <div className="testimonials__dots" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`testimonials__dot ${index === i ? 'testimonials__dot--active' : ''}`}
                aria-label={`Go to testimonial by ${t.author}`}
                aria-selected={index === i}
                role="tab"
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="testimonials__btn"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Overall rating summary */}
        <div className="testimonials__summary">
          <div className="testimonials__summary-rating">
            <span className="testimonials__summary-num">4.9</span>
            <div>
              <StarRating count={5} />
              <span className="testimonials__summary-count">Based on 200+ reviews</span>
            </div>
          </div>
          <div className="testimonials__summary-platforms">
            <span>Google ★★★★★</span>
            <span>Houzz ★★★★★</span>
            <span>Sulekha ★★★★★</span>
          </div>
        </div>

      </div>
    </section>
  );
}
