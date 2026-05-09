import sys

try:
    import pypdf
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf"])
    import pypdf

def extract_text(pdf_path, output_path):
    with open(pdf_path, 'rb') as f:
        reader = pypdf.PdfReader(f)
        text = ''
        for page in reader.pages:
            text += page.extract_text() + '\n'
    
    with open(output_path, 'w', encoding='utf-8') as out:
        out.write(text)

if __name__ == "__main__":
    extract_text(
        r"c:\Users\MahmoudElmahdy\Documents\GitHub\Mahmoud-Elmahdy\Assets\Resume\Mahmoud_Elmahdy_Resume_Data_Analyst.pdf",
        "resume_text.txt"
    )
