import re

files_to_update = {
    "css": r"c:\Users\ADMIN\Desktop\project tpc\Interiors\src\components\PageHero\PageHero.css",
    "home": r"c:\Users\ADMIN\Desktop\project tpc\Interiors\src\pages\Home.jsx",
    "profile": r"c:\Users\ADMIN\Desktop\project tpc\Interiors\src\pages\DesignerProfilePage.jsx"
}

# 1. Update PageHero.css
with open(files_to_update["css"], "r", encoding="utf-8") as f:
    css_content = f.read()

# Replace .page-hero text color to white
css_content = css_content.replace("color: var(--white);\n  padding-top: 100px;", "color: #ffffff;\n  padding-top: 100px;")

# Update page-hero__main text shadow to be a dark drop shadow for high legibility
old_css_main = """.page-hero__main {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.9), 0 1px 2px rgba(255, 255, 255, 0.8);
}"""

new_css_main = """.page-hero__main {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3);
}"""
css_content = css_content.replace(old_css_main, new_css_main)

# Update breadcrumbs styling
old_breadcrumbs = """.page-hero__breadcrumbs {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-sans);
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  background: rgba(27,154,89,0.08);
  padding: 0.45rem 1.25rem;
  border-radius: 100px;
  border: 1px solid rgba(27,154,89,0.25);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  width: fit-content;
  margin-bottom: 0.5rem;
}

.page-hero__breadcrumbs-link {
  color: var(--text-muted);
  transition: color 0.3s var(--ease);
}

.page-hero__breadcrumbs-link:hover {
  color: var(--purple-light);
}

.page-hero__breadcrumbs-separator {
  background: var(--grad-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1rem;
  line-height: 1;
}

.page-hero__breadcrumbs-current {
  background: var(--grad-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}"""

new_breadcrumbs = """.page-hero__breadcrumbs {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-sans);
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.45rem 1.25rem;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  width: fit-content;
  margin-bottom: 0.5rem;
  color: #ffffff;
}

.page-hero__breadcrumbs-link {
  color: rgba(255, 255, 255, 0.75);
  transition: color 0.3s var(--ease);
}

.page-hero__breadcrumbs-link:hover {
  color: #ffffff;
}

.page-hero__breadcrumbs-separator {
  color: rgba(255, 255, 255, 0.4);
  font-size: 1rem;
  line-height: 1;
}

.page-hero__breadcrumbs-current {
  color: #ffffff;
}"""
css_content = css_content.replace(old_breadcrumbs, new_breadcrumbs)

# Update page hero title & subtitle
css_content = css_content.replace("color: var(--white);", "color: #ffffff;")
css_content = css_content.replace("color: var(--text-muted);", "color: rgba(255, 255, 255, 0.85);")

with open(files_to_update["css"], "w", encoding="utf-8") as f:
    f.write(css_content)


# 2. Update Home.jsx
with open(files_to_update["home"], "r", encoding="utf-8") as f:
    home_content = f.read()

# Update Home hero section style to color: '#ffffff'
home_content = home_content.replace("color: 'var(--white)',", "color: '#ffffff',")

# Update Home text shadow and colors
old_home_box = """          <div style={{ 
            maxWidth: '850px',
            textShadow: '0 2px 10px rgba(255, 255, 255, 0.9), 0 1px 2px rgba(255, 255, 255, 0.8)'
          }}>"""

new_home_box = """          <div style={{ 
            maxWidth: '850px',
            textShadow: '0 2px 15px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3)'
          }}>"""
home_content = home_content.replace(old_home_box, new_home_box)

# Make section label white/translucent
old_home_label = """            <span className="section-label" style={{ justifyContent: 'center' }}>Book Verified Designers</span>"""
new_home_label = """            <span className="section-label" style={{ justifyContent: 'center', color: '#ffffff', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.25)', padding: '0.45rem 1.25rem', borderRadius: '100px', width: 'fit-content', margin: '0 auto' }}>Book Verified Designers</span>"""
home_content = home_content.replace(old_home_label, new_home_label)

# Make home hero title em gradient glow better on black drop-shadow, or keep same
home_content = home_content.replace("color: 'var(--white)',\n              marginTop: '1rem',", "color: '#ffffff',\n              marginTop: '1rem',")
home_content = home_content.replace("color: 'var(--text-muted)',\n              fontWeight: 300,", "color: 'rgba(255, 255, 255, 0.85)',\n              fontWeight: 300,")

with open(files_to_update["home"], "w", encoding="utf-8") as f:
    f.write(home_content)


# 3. Update DesignerProfilePage.jsx
with open(files_to_update["profile"], "r", encoding="utf-8") as f:
    profile_content = f.read()

profile_content = profile_content.replace("color: 'var(--white)',", "color: '#ffffff',")

old_profile_box = """          <div style={{
            width: '100%',
            textShadow: '0 2px 10px rgba(255, 255, 255, 0.9), 0 1px 2px rgba(255, 255, 255, 0.8)'
          }}>"""

new_profile_box = """          <div style={{
            width: '100%',
            textShadow: '0 2px 15px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3)'
          }}>"""
profile_content = profile_content.replace(old_profile_box, new_profile_box)

old_profile_links = """            <Link to="/portfolio" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              fontSize: '0.75rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              color: 'var(--text-muted)', 
              marginBottom: '2rem',
              transition: 'color 0.3s'
            }} className="back-link">"""

new_profile_links = """            <Link to="/portfolio" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              fontSize: '0.75rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              color: 'rgba(255, 255, 255, 0.8)', 
              marginBottom: '2rem',
              transition: 'color 0.3s'
            }} className="back-link">"""
profile_content = profile_content.replace(old_profile_links, new_profile_links)

# Update name color & sub role text color
profile_content = profile_content.replace("fontWeight: 400, margin: 0 }}>{designer.name}</h1>", "fontWeight: 400, margin: 0, color: '#ffffff' }}>{designer.name}</h1>")
profile_content = profile_content.replace("color: 'var(--gold-dark)', margin: 0, fontWeight: 600", "color: 'rgba(255, 255, 255, 0.9)', margin: 0, fontWeight: 600")

with open(files_to_update["profile"], "w", encoding="utf-8") as f:
    f.write(profile_content)

print("Hero text colors successfully changed to high-contrast white with dark drop shadows.")
