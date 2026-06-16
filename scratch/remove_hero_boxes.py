import re

files_to_update = {
    "css": r"c:\Users\ADMIN\Desktop\project tpc\Interiors\src\components\PageHero\PageHero.css",
    "home": r"c:\Users\ADMIN\Desktop\project tpc\Interiors\src\pages\Home.jsx",
    "profile": r"c:\Users\ADMIN\Desktop\project tpc\Interiors\src\pages\DesignerProfilePage.jsx"
}

# 1. Update PageHero.css (.page-hero__main)
with open(files_to_update["css"], "r", encoding="utf-8") as f:
    css_content = f.read()

old_css_main = """.page-hero__main {
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

new_css_main = """.page-hero__main {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.9), 0 1px 2px rgba(255, 255, 255, 0.8);
}"""

css_content = css_content.replace(old_css_main, new_css_main)
with open(files_to_update["css"], "w", encoding="utf-8") as f:
    f.write(css_content)


# 2. Update Home.jsx
with open(files_to_update["home"], "r", encoding="utf-8") as f:
    home_content = f.read()

old_home_box = """          <div style={{ 
            maxWidth: '850px',
            background: 'rgba(255, 255, 255, 0.82)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '3.5rem 2.5rem',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.03)'
          }}>"""

new_home_box = """          <div style={{ 
            maxWidth: '850px',
            textShadow: '0 2px 10px rgba(255, 255, 255, 0.9), 0 1px 2px rgba(255, 255, 255, 0.8)'
          }}>"""

home_content = home_content.replace(old_home_box, new_home_box)
with open(files_to_update["home"], "w", encoding="utf-8") as f:
    f.write(home_content)


# 3. Update DesignerProfilePage.jsx
with open(files_to_update["profile"], "r", encoding="utf-8") as f:
    profile_content = f.read()

old_profile_box = """          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '2.5rem',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.03)'
          }}>"""

new_profile_box = """          <div style={{
            width: '100%',
            textShadow: '0 2px 10px rgba(255, 255, 255, 0.9), 0 1px 2px rgba(255, 255, 255, 0.8)'
          }}>"""

profile_content = profile_content.replace(old_profile_box, new_profile_box)
with open(files_to_update["profile"], "w", encoding="utf-8") as f:
    f.write(profile_content)

print("Hero boxes removed and text shadow applied successfully.")
