#For Pan card verification
from PIL import Image
import pytesseract
import re

# Image ka path
img_path = r"C:\Users\harsh\Downloads\pan.jpeg"

# Image ko open karein
img = Image.open(img_path)

# Tesseract OCR ka istemal karke text extract karein
extracted_text = pytesseract.image_to_string(img)

# Extracted text ko print karein
# print("Extracted Text:")
print(extracted_text)

# Define patterns for name and date of birth extraction
name_pattern = re.compile(r'Name[^\w\n]*\n([^\n]+)', re.IGNORECASE)
dob_pattern = re.compile(r'(\d{2}/\d{2}/\d{4})')

# Search for matches
name_match = name_pattern.search(extracted_text)
dob_matches = dob_pattern.findall(extracted_text)

# Extract name
if name_match:
    extracted_name = name_match.group(1).strip()
    print("Name:", extracted_name)
else:
    print("Name not found in the extracted text.")

# Extract date of birth
if dob_matches:
    extracted_dob = dob_matches[0]  # Assuming the first date-like sequence is the date of birth
    print("Date of Birth:", extracted_dob)
else:
    print("Date of Birth not found in the text.")
