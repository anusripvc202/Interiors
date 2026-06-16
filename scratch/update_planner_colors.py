import re

file_path = r"c:\Users\ADMIN\Desktop\project tpc\Interiors\src\components\ProjectPlanner\ProjectPlanner.css"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace any occurrence of purple rgb (124, 58, 237) with green rgb (27, 154, 89)
# Handle variations in spacing
updated = re.sub(r'124\s*,\s*58\s*,\s*237', '27, 154, 89', content)

# Check if there are other hardcoded purple hex colors (like #7c3aed)
updated = re.sub(r'#7c3aed', '#1b9a59', updated, flags=re.IGNORECASE)
updated = re.sub(r'#8b5cf6', '#22c55e', updated, flags=re.IGNORECASE)
updated = re.sub(r'#a78bfa', '#4ade80', updated, flags=re.IGNORECASE)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(updated)

print("ProjectPlanner.css colors updated successfully.")
