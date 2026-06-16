from PIL import Image
import math

def make_transparent(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    # Target background color
    bg_r, bg_g, bg_b = 241, 238, 223
    
    new_data = []
    for item in datas:
        r, g, b, a = item
        # Calculate color distance
        dist = math.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
        
        # Soft transition parameters
        min_dist = 15.0
        max_dist = 45.0
        
        if dist < min_dist:
            # Completely transparent background
            new_data.append((r, g, b, 0))
        elif dist < max_dist:
            # Semi-transparent transition edge
            factor = (dist - min_dist) / (max_dist - min_dist)
            alpha = int(255 * factor)
            new_data.append((r, g, b, alpha))
        else:
            # Keep original pixel
            new_data.append((r, g, b, 255))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved transparent logo to {output_path}")

if __name__ == "__main__":
    make_transparent("public/logo.jpg", "public/logo.png")
