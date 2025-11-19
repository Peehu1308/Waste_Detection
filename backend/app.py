from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from model import WasteSegModel 
import torch
from torchvision import transforms
from PIL import Image
import io

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

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    img_bytes = await file.read()
    image = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    
    img = transform(image).unsqueeze(0).to(device)
    
    with torch.no_grad():
        outputs = model(img)
        _, predicted = torch.max(outputs, 1)
        
    result = classes[predicted.item()]
    return {"predicted_class": result}
