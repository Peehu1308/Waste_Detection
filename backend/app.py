from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from werkzeug.utils import secure_filename  # safer filenames
from PIL import Image
import io
import os
from ultralytics import YOLO
import hashlib

# Define classes
classes = [
    'ewaste', 'food_waste', 'leaf_waste', 'metal_cans',
    'paper_waste', 'plastic_bags', 'plastic_bottles', 'wood_waste'
]

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
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)

# Load YOLO model (can be pretrained or your custom weights)
# Use YOLOv8 small model for speed
model = YOLO("yolov8n.pt")  # or "runs/detect/train/weights/best.pt" if trained on your dataset

# Helper: compute file hash to detect repeats
def get_file_hash(file_bytes):
    return hashlib.md5(file_bytes).hexdigest()

# Save image to folder by class
def save_image(file: UploadFile, predicted_class: str) -> str:
    class_folder = UPLOAD_FOLDER / predicted_class
    class_folder.mkdir(parents=True, exist_ok=True)
    filename = secure_filename(file.filename)
    save_path = class_folder / filename
    file.file.seek(0)
    with open(save_path, "wb") as f:
        f.write(file.file.read())
    return str(save_path)

# Predict route
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read image bytes
    img_bytes = await file.read()
    
    # Check if image already exists in saved folders using hash
    file_hash = get_file_hash(img_bytes)
    for category in UPLOAD_FOLDER.iterdir():
        if not category.is_dir():
            continue
        for f in category.iterdir():
            with open(f, "rb") as existing_file:
                existing_hash = get_file_hash(existing_file.read())
                if existing_hash == file_hash:
                    return {
                        "predicted_class": category.name,
                        "message": "Image already exists"
                    }

    # Run YOLO detection
    results = model(io.BytesIO(img_bytes))  # detect objects from bytes

    detections = []
    for r in results:
        for box in r.boxes:
            cls_name = model.names[int(box.cls)]
            conf = float(box.conf)
            detections.append({"class": cls_name, "confidence": conf})

    # Choose highest confidence class as main prediction
    if detections:
        main_class = max(detections, key=lambda x: x["confidence"])["class"]
    else:
        main_class = "Unknown"

    # Save image into folder by predicted class
    file.file.seek(0)
    saved_path = save_image(file, main_class)

    return {
        "predicted_class": main_class,
        "detections": detections,
        "saved_path": saved_path
    }
