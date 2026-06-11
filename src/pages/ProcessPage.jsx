import { useState } from 'react';
import Process from '../components/Process/Process';
import PageHero from '../components/PageHero/PageHero';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: 'How long does a typical luxury interior project take?',
    a: 'Residential projects generally take 12 to 24 weeks depending on the spatial square footage and procurement complexities. Conceptual planning lasts 4-6 weeks, followed by development and styling handover.',
  },
  {
    q: 'Can we keep and integrate some of our existing furniture pieces?',
    a: 'Absolutely. We respect heirlooms and meaningful items. During our concept phase, we inspect existing furniture to restore, reupholster, or position them perfectly in the new layout.',
  },
  {
    q: 'Do you manage contractor disputes and local construction licenses?',
    a: 'Yes, we provide full turnkey project management services. We handle all approvals, permissions, site scheduling, and directly coordinate with our trusted contractors so you don\'t have to deal with site management issues.',
  },
  {
    q: 'What happens during the initial consultation meeting?',
    a: 'We review your floor plans, analyze design inspirations, discuss your functional requirements, and establish budget guidelines. We then draft a structured design quote outlining the scope of work.',
  },
];

export default function ProcessPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div>
      <PageHero 
        title="Our Design Process" 
        subtitle="A structured journey ensuring complete transparency and premium quality." 
        bgImage="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=1600&q=85&auto=format&fit=crop" 
      />
      <Process />

      {/* Interactive FAQ Accordion */}
      <section className="faq" style={{ padding: 'var(--section-pad) 0', background: 'var(--bg-dark)' }}>
        <div className="container design-accordion__grid">
          <div>
            <p className="section-label">Common Queries</p>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Frequently Asked <em>Questions</em></h2>
            <p style={{ color: 'var(--stone)', lineHeight: '1.8' }}>
              Have questions about our turnkey design procedures or schedules? Find detailed answers to help plan your project.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => (
              <div key={faq.q} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', overflow: 'hidden' }}>
                <button
                  onClick={() => toggleFAQ(idx)}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: '600',
                    fontSize: '1rem',
                    color: 'var(--charcoal)',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.q}</span>
                  {openIndex === idx ? <ChevronUp size={18} style={{ color: 'var(--gold)' }} /> : <ChevronDown size={18} style={{ color: 'var(--gold)' }} />}
                </button>
                <div style={{
                  maxHeight: openIndex === idx ? '200px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease',
                  padding: openIndex === idx ? '0 1.5rem 1.5rem' : '0 1.5rem',
                  color: 'var(--stone)',
                  fontSize: '0.9rem',
                  lineHeight: '1.7'
                }}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
