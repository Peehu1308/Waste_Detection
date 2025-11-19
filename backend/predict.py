import torch
from torchvision import transforms
from PIL import Image
from model import WasteSegModel
import os

classes = ['ewaste', 'food_waste', 'leaf_waste', 'metal_cans', 
           'paper_waste', 'plastic_bags', 'plastic_bottles', 'wood_waste']

# Load model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = WasteSegModel(num_classes=len(classes))
model.load_state_dict(torch.load("waste_model.pth", map_location=device))
model.to(device)
model.eval()


transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.Lambda(lambda img: img.convert("RGB")),
    transforms.ToTensor(),
    transforms.Normalize([0.5,0.5,0.5], [0.5,0.5,0.5])
])

def predict(image_path):
    image = Image.open(image_path)
    image = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)

    print(f"Predicted class: {classes[predicted.item()]}")

# Example usage
if __name__ == "__main__":
    test_image = os.path.join(os.path.dirname(__file__), "../Dataset/train/food_waste/0_1.jpg")

    predict(test_image)
