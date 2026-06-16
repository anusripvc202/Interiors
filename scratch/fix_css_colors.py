import os

def replace_colors_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # 1. Purple color replacements: rgba(124, 58, 237) -> brand green rgba(27, 154, 89)
    # We cover cases with and without spaces
    content = content.replace("124,58,237", "27,154,89")
    content = content.replace("124, 58, 237", "27, 154, 89")
    
    # 2. Blue color replacements: rgba(59, 130, 246) -> secondary green rgba(34, 197, 94)
    content = content.replace("59,130,246", "34,197,94")
    content = content.replace("59, 130, 246", "34, 197, 94")

    # 3. Pink color replacements: rgba(236, 72, 153) -> dark green rgba(21, 128, 61)
    content = content.replace("236,72,153", "21,128,61")
    content = content.replace("236, 72, 153", "21, 128, 61")

    # 4. Also cover any remaining purple hex color strings like #7c3aed, #8b5cf6, #a78bfa, #c084fc, etc.
    # Just in case there are hex codes:
    # #7c3aed (vibrant purple) -> #1b9a59 (emerald green)
    content = content.replace("#7c3aed", "#1b9a59")
    content = content.replace("#7C3AED", "#1b9a59")
    # #3b82f6 (blue) -> #22c55e (green)
    content = content.replace("#3b82f6", "#22c55e")
    content = content.replace("#3B82F6", "#22c55e")
    # #ec4899 (pink) -> #15803d (dark green)
    content = content.replace("#ec4899", "#15803d")
    content = content.replace("#EC4899", "#15803d")

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated colors in {filepath}")

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.css'):
                replace_colors_in_file(os.path.join(root, file))

if __name__ == "__main__":
    process_directory("src")
