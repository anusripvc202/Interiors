import re

# 1. Update PageHero.css
css_path = r"c:\Users\ADMIN\Desktop\project tpc\Interiors\src\components\PageHero\PageHero.css"
with open(css_path, "r", encoding="utf-8") as f:
    css_content = f.read()

# Make page hero video fully visible
css_content = css_content.replace("opacity: 0.45;", "opacity: 1.0;")

# Make page hero overlay very light
old_overlay = """.page-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(227, 239, 232, 0.45) 0%,
    rgba(227, 239, 232, 0.6) 55%,
    rgba(227, 239, 232, 0.85) 100%
  );
  z-index: 1;
}"""

new_overlay = """.page-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(227, 239, 232, 0.15) 0%,
    rgba(227, 239, 232, 0.05) 50%,
    rgba(227, 239, 232, 0.25) 100%
  );
  z-index: 1;
}"""

css_content = css_content.replace(old_overlay, new_overlay)

# Add glassmorphism to .page-hero__main
old_main = """.page-hero__main {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}"""

new_main = """.page-hero__main {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 2.5rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
}"""

css_content = css_content.replace(old_main, new_main)

with open(css_path, "w", encoding="utf-8") as f:
    f.write(css_content)


# 2. Update Home.jsx
home_path = r"c:\Users\ADMIN\Desktop\project tpc\Interiors\src\pages\Home.jsx"
with open(home_path, "r", encoding="utf-8") as f:
    home_content = f.read()

# Make home hero video fully visible
home_content = home_content.replace("opacity: 0.45,", "opacity: 1.0,")

# Make home hero overlay light
old_home_overlay = """          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(227, 239, 232, 0.45) 0%, rgba(227, 239, 232, 0.6) 55%, rgba(227, 239, 232, 0.85) 100%)',
            zIndex: 1
          }} />"""

new_home_overlay = """          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(227, 239, 232, 0.15) 0%, rgba(227, 239, 232, 0.05) 50%, rgba(227, 239, 232, 0.25) 100%)',
            zIndex: 1
          }} />"""

home_content = home_content.replace(old_home_overlay, new_home_overlay)

# Add glassmorphism container to home hero content wrapper
old_home_text = """          <div style={{ maxWidth: '850px' }}>
            <span className="section-label" style={{ justifyContent: 'center' }}>Book Verified Designers</span>
            <h1 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)', 
              fontWeight: '400', 
              lineHeight: '1.1', 
              color: 'var(--white)',
              marginTop: '1rem',
              marginBottom: '1.5rem' 
            }}>
              Find the Perfect Interior Designer for Every <em style={{ fontStyle: 'italic', background: 'var(--grad-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Space</em>
            </h1>
            <p style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', 
              color: 'var(--text-muted)',
              fontWeight: 300,
              maxWidth: '650px',
              margin: '0 auto'
            }}>
              Compare design packages, view matching styles, and schedule live consultations with certified interior specialists.
            </p>
          </div>"""

new_home_text = """          <div style={{ 
            maxWidth: '850px',
            background: 'rgba(255, 255, 255, 0.82)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '3.5rem 2.5rem',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.03)'
          }}>
            <span className="section-label" style={{ justifyContent: 'center' }}>Book Verified Designers</span>
            <h1 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)', 
              fontWeight: '400', 
              lineHeight: '1.1', 
              color: 'var(--white)',
              marginTop: '1rem',
              marginBottom: '1.5rem' 
            }}>
              Find the Perfect Interior Designer for Every <em style={{ fontStyle: 'italic', background: 'var(--grad-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Space</em>
            </h1>
            <p style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', 
              color: 'var(--text-muted)',
              fontWeight: 300,
              maxWidth: '650px',
              margin: '0 auto'
            }}>
              Compare design packages, view matching styles, and schedule live consultations with certified interior specialists.
            </p>
          </div>"""

home_content = home_content.replace(old_home_text, new_home_text)

with open(home_path, "w", encoding="utf-8") as f:
    f.write(home_content)


# 3. Update DesignerProfilePage.jsx
profile_path = r"c:\Users\ADMIN\Desktop\project tpc\Interiors\src\pages\DesignerProfilePage.jsx"
with open(profile_path, "r", encoding="utf-8") as f:
    profile_content = f.read()

# Make designer profile hero video fully visible
profile_content = profile_content.replace("opacity: 0.45,", "opacity: 1.0,")

# Make designer profile hero overlay light
old_profile_overlay = """          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(227, 239, 232, 0.45) 0%, rgba(227, 239, 232, 0.85) 100%)',
            zIndex: 1
          }} />"""

new_profile_overlay = """          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(227, 239, 232, 0.15) 0%, rgba(227, 239, 232, 0.05) 50%, rgba(227, 239, 232, 0.25) 100%)',
            zIndex: 1
          }} />"""

profile_content = profile_content.replace(old_profile_overlay, new_profile_overlay)

# Add glassmorphism container to designer details in cover section
old_profile_text = """        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Link to="/portfolio" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            fontSize: '0.75rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em', 
            color: 'var(--text-muted)', 
            marginBottom: '2rem',
            transition: 'color 0.3s'
          }} className="back-link">
            <ArrowLeft size={14} />
            <span>Back to Directory</span>
          </Link>
          
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <img 
              src={designer.avatar} 
              alt={designer.name} 
              style={{ width: '7rem', height: '7rem', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--border)', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }} 
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 400, margin: 0 }}>{designer.name}</h1>
                <span className="designer-match-tag" style={{ background: 'var(--gold)', color: 'var(--pure-white)', fontSize: '0.62rem', padding: '0.25rem 0.6rem', borderRadius: '100px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  <Award size={12} style={{ marginRight: '0.2rem' }} /> Verified Specialist
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-dark)', margin: 0, fontWeight: 600 }}>{designer.role} · {designer.style}</p>
            </div>
          </div>
        </div>"""

new_profile_text = """        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '2.5rem',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.03)'
          }}>
            <Link to="/portfolio" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              fontSize: '0.75rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              color: 'var(--text-muted)', 
              marginBottom: '2rem',
              transition: 'color 0.3s'
            }} className="back-link">
              <ArrowLeft size={14} />
              <span>Back to Directory</span>
            </Link>
            
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <img 
                src={designer.avatar} 
                alt={designer.name} 
                style={{ width: '7rem', height: '7rem', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--border)', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }} 
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 400, margin: 0 }}>{designer.name}</h1>
                  <span className="designer-match-tag" style={{ background: 'var(--gold)', color: 'var(--pure-white)', fontSize: '0.62rem', padding: '0.25rem 0.6rem', borderRadius: '100px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    <Award size={12} style={{ marginRight: '0.2rem' }} /> Verified Specialist
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-dark)', margin: 0, fontWeight: 600 }}>{designer.role} · {designer.style}</p>
              </div>
            </div>
          </div>
        </div>"""

profile_content = profile_content.replace(old_profile_text, new_profile_text)

with open(profile_path, "w", encoding="utf-8") as f:
    f.write(profile_content)

print("Hero visibility and glassmorphism containers updated successfully.")
