##Project Overview
Every year, students fill out exam forms and upload necessary documents such as photographs and signatures. However, it is common for students to mistakenly upload the photograph instead of the signature and vice versa. This project aims to provide a solution to automatically identify and correctly place the photograph and signature in their respective positions, even if they are initially uploaded incorrectly.

Technology Stack
Frontend: React
Backend: Firebase, Python (API creation)
Support: Integrated ChatGPT for chat support
Features
Document Identification and Correction: Automatically identifies and places the photograph and signature in their correct positions on the admit card.
Identity Verification: Students will upload their PAN card, from which their name and date of birth (DOB) will be extracted. These details will be matched with the information they have provided. If the details match, the student can proceed with the further process.
Chat Support: Integrated ChatGPT for providing chat support to assist users with their queries.
Project Structure
The project is divided into the following main parts:

Frontend (React):

User interface for form submission and document upload.
Integration with Firebase for data storage and retrieval.
Communication with the Python API for document processing.
Backend (Firebase):

User authentication and data storage.
Real-time database for storing user details and document uploads.
API (Python):

Document processing to identify and correctly place photographs and signatures.
Identity verification by extracting details from the uploaded PAN card and matching them with the provided information.
Getting Started
Prerequisites
Node.js
Python
Firebase account
PAN card dataset for testing
