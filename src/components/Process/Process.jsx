import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Process.css';

const steps = [
  {
    num: '01',
    title: 'Consultation & Concept',
    desc: 'We begin with an in-depth conversation to understand your vision, requirements, budget, and design preferences. We then build custom mood boards and initial space planning layouts.',
  },
  {
    num: '02',
    title: 'Design Development',
    desc: 'Once the direction is approved, we create detailed 3D visualisations, select exact materials, furnishings, lighting fixtures, and draft precise architectural drawings.',
  },
  {
    num: '03',
    title: 'Curation & Procurement',
    desc: 'We handpick and acquire every element of the design — from bespoke custom-made furniture and designer lighting to unique styling accessories and artwork.',
  },
  {
    num: '04',
    title: 'Execution & Handover',
    desc: 'Our project managers supervise the execution and styling on site, coordinating with contractors and artisans. We deliver a meticulously detailed, turnkey ready-to-live space.',
  },
];

export default function Process() {
  const ref = useScrollAnimation();

  return (
    <section id="process" className="process" ref={ref}>
      <div className="container">
        <div className="process__header">
          <p className="section-label anim-fade-up">Our Methodology</p>
          <h2 className="section-title anim-fade-up anim-delay-1">
            How We Bring Your <em>Vision</em> to Life
          </h2>
          <p className="process__intro anim-fade-up anim-delay-2">
            A structured, collaborative design path ensuring complete transparency,
            meticulous detail, and premium quality from start to finish.
          </p>
        </div>

        <div className="process__grid">
          {steps.map((step, i) => (
            <div key={step.num} className={`process__step anim-fade-up anim-delay-${i + 1}`}>
              <div className="process__step-number">{step.num}</div>
              <div className="process__step-content">
                <h3 className="process__step-title">{step.title}</h3>
                <p className="process__step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
