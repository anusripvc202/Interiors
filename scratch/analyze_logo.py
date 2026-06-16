from PIL import Image

img = Image.open("public/logo.jpg")
img = img.convert("RGB")
width, height = img.size

# Let's inspect a few pixels at the corners
corners = [
    (0, 0),
    (width - 1, 0),
    (0, height - 1),
    (width - 1, height - 1),
    (5, 5),
    (width - 6, 5)
]

for x, y in corners:
    print(f"Pixel ({x}, {y}): {img.getpixel((x, y))}")
