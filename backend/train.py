import os
import torch
from torch.utils.data import DataLoader
from torchvision import datasets, transforms
from model import WasteSegModel
from PIL import ImageFile


ImageFile.LOAD_TRUNCATED_IMAGES = True



BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, "Dataset")


transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
    transforms.Normalize([0.5,0.5,0.5], [0.5,0.5,0.5])
])


train_data = datasets.ImageFolder(os.path.join(DATASET_PATH, "train"), transform=transform)
val_data   = datasets.ImageFolder(os.path.join(DATASET_PATH, "val"), transform=transform)

train_loader = DataLoader(train_data, batch_size=32, shuffle=True)
val_loader   = DataLoader(val_data, batch_size=32)

print("Classes:", train_data.classes)


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = WasteSegModel(num_classes=len(train_data.classes)).to(device)

criterion = torch.nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)


epochs = 20
for epoch in range(epochs):
    model.train()
    running_loss = 0
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item()


    model.eval()
    val_loss = 0
    correct = 0
    with torch.no_grad():
        for images, labels in val_loader:
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)
            loss = criterion(outputs, labels)
            val_loss += loss.item()
            preds = outputs.argmax(dim=1)
            correct += (preds == labels).sum().item()

    accuracy = 100 * correct / len(val_data)
    print(f"Epoch [{epoch+1}/{epochs}] "
          f"Train Loss: {running_loss/len(train_loader):.4f} | "
          f"Val Loss: {val_loss/len(val_loader):.4f} | "
          f"Val Accuracy: {accuracy:.2f}%")

torch.save(model.state_dict(), "waste_model.pth")
print("Training complete! Model saved as waste_model.pth")
