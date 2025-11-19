from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from model import WasteSegModel
import torch
from torchvision import transforms
from PIL import Image
import io
import os
from pathlib import Path
from werkzeug.utils import secure_filename  # optional, safer filename handling

# Define classes
classes = [
    'ewaste', 'food_waste', 'leaf_waste', 'metal_cans',
    'paper_waste', 'plastic_bags', 'plastic_bottles', 'wood_waste'
]

# Device setup
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load model
model = WasteSegModel(num_classes=len(classes))
model.load_state_dict(torch.load("../waste_model.pth", map_location=device))
model.to(device)
model.eval()

# Transform
transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
    transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
])

# FastAPI app
app = FastAPI()

# Allow CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Folder to save uploaded images
UPLOAD_FOLDER = Path("../Dataset/UploadedImages")
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)  # create if not exists

def save_image(file: UploadFile, predicted_class: str) -> str:
    """
    Saves the uploaded image in a folder by class.
    Returns the saved file path.
    """
    class_folder = UPLOAD_FOLDER / predicted_class
    class_folder.mkdir(parents=True, exist_ok=True)
    filename = secure_filename(file.filename)
    save_path = class_folder / filename
    with open(save_path, "wb") as f:
        f.write(file.file.read())
    return str(save_path)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read image bytes
    img_bytes = await file.read()
    image = Image.open(io.BytesIO(img_bytes)).convert("RGB")

    # Transform and predict
    img = transform(image).unsqueeze(0).to(device)
    with torch.no_grad():
        outputs = model(img)
        _, predicted = torch.max(outputs, 1)
    result = classes[predicted.item()]

    # Save the uploaded image into a folder named by class
    file.file.seek(0)  # reset file pointer
    saved_path = save_image(file, result)

    return {
        "predicted_class": result,
        "saved_path": saved_path
    }
