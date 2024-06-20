
from flask import Flask, request, jsonify
from PIL import Image
from flask_cors import CORS
import pytesseract
import re
import datefinder
app = Flask(__name__)
CORS(app)
@app.route('/verify_pan', methods=['POST'])
def verify_pan():
    file = request.files['image']
    img = Image.open(file)
    extracted_text = pytesseract.image_to_string(img)
    
    name_pattern = re.compile(r'Name[^\w\n]*\n([^\n\s]+)\s+([^\n\s]+)', re.IGNORECASE)
    match = name_pattern.search(extracted_text)
    # dob_pattern = re.compile(r'Date\s*of\s*Birth[^\d]*(\d{1,2}/\d{1,2}/\d{4})', re.IGNORECASE)
    # dob_pattern = re.compile(r'Date of Birth[^\n]\n\s([\d/]+)', re.IGNORECASE)
    # dob_match = dob_pattern.search(extracted_text)
    dob_pattern = re.compile(r'(\d{2}/\d{2}/\d{4})')
    dob_matches = dob_pattern.findall(extracted_text)
    

    if match:
        extracted_name = match.group(1).strip()
    else:
        extracted_name = "Name not found in the extracted text."

    # dob_matches = datefinder.find_dates(extracted_text)
    # extracted_dob = next(dob_matches, None)

    if dob_matches:
        extracted_dob = dob_matches[0]  # Assuming the first date-like sequence is the date of birth
        print("Date of Birth:", extracted_dob)
    else:
        print("Date of Birth not found in the text.")
    

    return jsonify({'name': extracted_name.lower(), 'dob': extracted_dob})

if __name__ == '__main__':
    app.run(debug=True)
