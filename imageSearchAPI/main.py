from fastapi import FastAPI, status, Response, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymilvus import connections, Collection
from tensorflow import keras
from keras_preprocessing import image as imge
from PIL import Image
import numpy as np

app = FastAPI()

origins = ["http://localhost:3000", "localhost:3000", 'https://localhost:5000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# connect milvus DB
connections.connect(
    alias="default",
    host='localhost',
    port='19530'
)

from db import (getAllProducts, getManyProductWithCodes)
from getFeaturedVector import (getModel, toVector)


@app.get('/')
async def index():
    # products = await getAllProducts()
    #
    # # print(products['image'])
    #
    # return {"numOfProducts": len(products), "products": products}
    # # return {"products"}
    products = await getManyProductWithCodes(['196149230905', '196149230901'])
    # print(products)
    # return {"numOfProducts": len(products), "products": products}
    return "Image Search API"

## INSERT IMAGE TO MILVUS ##
class DataToInsert(BaseModel):
    imgURL: list
    productCode: int
    productBrand: str

@app.post('/api/v1/insert-image-to-milvus')
async def insertImgToMilvus(data: DataToInsert, response: Response, status_code=status.HTTP_201_CREATED):
    # print(data)
    # print({'imgURL': data.imgURL, 'productCode': data.productCode, 'productBrand': data.productBrand})

    if len(data.imgURL) < 1:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {'msg': 'FAILED, CANNOT INSERT EMPTY IMAGE LIST'}

    images = data.imgURL

    model = getModel()
    vectors = []

    for img in images:
        vector = list(toVector(model, img))
        vectors.append(vector)

    productCode = data.productCode
    partition = data.productBrand

    # [imageURL, productCode, imageVector] 3 fields
    milvusData = [images, [productCode for i in range(len(vectors))], vectors]

    collection = Collection('productImage')
    mr = collection.insert(data=milvusData, partition_name=partition)

    return {'msg': 'Insert Images To Milvus Successfully!!!'}



## DELETE ONE IMAGE FROM MILVUS ##
class DataForDelete(BaseModel):
    productBrand: str
    imgURL: str

@app.delete('/api/v1/delete-image-from-milvus')
async def deleteImgFromMilvus(data: DataForDelete):
    collection = Collection("productImage")  # Get an existing collection.
    partition = collection.load([data.productBrand], replica_number=1)

    res = collection.query(
        expr=f'''imageURL like "{data.imgURL}"''',
        partition_names=[data.productBrand],
        output_fields=["imageID"],
        consistency_level="Strong"
    )
    expr = f"imageID in [{res[0]['imageID']}]"
    deleteIMG = collection.delete(expr)


    collection.release()
    # print(deleteIMG)

    return {'msg':'Delete Image From Milvus Successfully'}



## SEARCH BY IMAGE ##
@app.post('/api/v1/search-by-image')
async def searchByImage(image: UploadFile = File(...)):

    ggNetModel = keras.models.load_model('./model_182-0.94.h5')
    labels = {0: 'Adidas', 1: 'Converse', 2: 'Nike'}
    img = Image.open(image.file)
    img = Image.Image.resize(img, size=[256,256])
    img = imge.img_to_array(img, dtype=np.uint8)
    img = np.array(img) / 255.0
    p = ggNetModel.predict(img[np.newaxis, ...])
    predicted_class = labels[np.argmax(p[0], axis=-1)]

    print(predicted_class)


    model = getModel()
    vector = toVector(model, image.file)
    # print(len(vector))

    collection = Collection("productImage")
    collection.load(partition_names=['Converse'], replica_number=1)
    search_params = {"metric_type": "L2", "params": {"nprobe": 4}}

    results = collection.search(
        data=[vector],
        anns_field="imageVector",
        param=search_params,
        limit=10,
        expr=None,
        consistency_level="Strong"
    )
    collection.release()

    # print(results[0])

    collection.load(partition_names=['Converse'], replica_number=1)
    res = collection.query(
        expr=f"imageID in {results[0].ids}",
        output_fields=["productCode"],
        consistency_level="Strong"
    )
    # print(res)
    collection.release()

    pCodes = []
    for x in res:
        pCodes.append(str(x.get("productCode")))

    pCodes = list(set(pCodes))#remove duplicate

    # print(pCodes)

    products = await getManyProductWithCodes(pCodes)
    # print(products)
    return {'totalProducts': len(products), 'products': products}
    # return results[0]

@app.post('/test/imageSearch')
async def testImageSearch(image: UploadFile = File(...)):
    print(image.filename)
    return 'ok'