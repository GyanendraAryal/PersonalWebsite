from pathlib import Path


MAX_RESUME_SIZE = 10 * 1024 * 1024


def get_resume_file_error(uploaded_file):
    if Path(uploaded_file.name).suffix.lower() != ".pdf":
        return "Only PDF files are allowed."
    if uploaded_file.size > MAX_RESUME_SIZE:
        return "PDF files must be 10 MB or smaller."

    try:
        is_pdf = uploaded_file.read(5) == b"%PDF-"
    finally:
        uploaded_file.seek(0)

    if not is_pdf:
        return "The uploaded file is not a valid PDF."
    return None
