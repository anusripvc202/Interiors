import re

files_to_update = [
    r"c:\Users\ADMIN\Desktop\project tpc\Interiors\src\index.css",
    r"c:\Users\ADMIN\Desktop\project tpc\Interiors\src\pages\Home.jsx",
    r"c:\Users\ADMIN\Desktop\project tpc\Interiors\src\pages\DesignerProfilePage.jsx",
    r"c:\Users\ADMIN\Desktop\project tpc\Interiors\src\components\PageHero\PageHero.css"
]

# 1. Update index.css variables
with open(files_to_update[0], "r", encoding="utf-8") as f:
    css_content = f.read()

css_content = re.sub(r'--bg-dark:\s*#f3f8f5;', '--bg-dark:       #e3efe8;', css_content)
css_content = re.sub(r'--bg-card-2:\s*#e9f2ed;', '--bg-card-2:     #d1e5d9;', css_content)

with open(files_to_update[0], "w", encoding="utf-8") as f:
    f.write(css_content)

# 2. Update RGBA gradient overlay values in all files
# Replace (243, 248, 245) with (227, 239, 232)
for file_path in files_to_update:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    updated_content = re.sub(r'243\s*,\s*248\s*,\s*245', '227, 239, 232', content)
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(updated_content)

print("Background and gradient overlay colors updated successfully to light green.")
