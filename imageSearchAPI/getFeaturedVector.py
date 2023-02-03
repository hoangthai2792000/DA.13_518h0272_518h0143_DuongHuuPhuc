from keras.utils import img_to_array
from keras.applications.vgg16 import VGG16, preprocess_input
from keras.models import Model
from PIL import Image
import numpy as np
import requests
from io import BytesIO

# Tạo Model
def getModel():
    vgg16Model = VGG16(weights="imagenet")
    model = Model(inputs=vgg16Model.inputs, outputs=vgg16Model.get_layer("fc1").output)
    return model

# Tiền xử lý ảnh
def imagePre(img):
    img = img.resize((224, 224))
    img = img.convert("RGB")
    x = img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    return x

# Image to vector
def toVector(model, imageURL):
    print("XỬ LÝ: ", imageURL)

    if isinstance(imageURL, str):
        response = requests.get(imageURL)
        img = Image.open(BytesIO(response.content))
        imgPre = imagePre(img)
        # Trích xuất đặc trưng
        vector = model.predict(imgPre)[0]
        # Chuẩn hóa vector
        vector = vector / np.linalg.norm(vector)
        return vector
    else:
        img = Image.open(imageURL)
        imgPre = imagePre(img)
        # Trích xuất đặc trưng
        vector = model.predict(imgPre)[0]
        # Chuẩn hóa vector
        vector = vector / np.linalg.norm(vector)
        return vector

