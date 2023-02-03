from fastapi import FastAPI, status, Response, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymilvus import connections, Collection
from PIL import Image

app = FastAPI()

origins = ['https://localhost:3000', 'https://localhost:5000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# # connect milvus DB
# connections.connect(
#     alias="default",
#     host='localhost',
#     port='19530'
# )
#
from db import (getAllProducts, getProductWithCode)
from getFeaturedVector import (getModel, toVector)
#
#
# @app.get('/')
# async def index():
#     products = await getAllProducts()
#
#     # print(products['image'])
#
#     return {"numOfProducts": len(products), "products": products}
#     # return {"products"}
#
#
# ## INSERT IMAGE TO MILVUS ##
# class DataToInsert(BaseModel):
#     imgURL: list
#     productCode: int
#     productBrand: str
#
# @app.post('/api/v1/insert-image-to-milvus')
# async def insertImgToMilvus(data: DataToInsert, response: Response, status_code=status.HTTP_201_CREATED):
#     # print(data)
#     # print({'imgURL': data.imgURL, 'productCode': data.productCode, 'productBrand': data.productBrand})
#
#     if len(data.imgURL) < 1:
#         response.status_code = status.HTTP_400_BAD_REQUEST
#         return {'msg': 'FAILED, CANNOT INSERT EMPTY IMAGE LIST'}
#
#     images = data.imgURL
#
#     model = getModel()
#     vectors = []
#
#     for img in images:
#         vector = list(toVector(model, img))
#         vectors.append(vector)
#
#     productCode = data.productCode
#     partition = data.productBrand
#
#     # [imageURL, productCode, imageVector]
#     milvusData = [images, [productCode for i in range(len(vectors))], vectors]
#
#     collection = Collection('productImage')
#     mr = collection.insert(data=milvusData, partition_name=partition)
#
#     return {'msg': 'SUCCESS'}
#
#
#
# ## DELETE ONE IMAGE FROM MILVUS ##
# class DataForDelete(BaseModel):
#     productBrand: str
#     imgURL: str
#
# @app.delete('/api/v1/delete-image-from-milvus')
# async def deleteImgFromMilvus(data: DataForDelete):
#     collection = Collection("productImage")  # Get an existing collection.
#     partition = collection.load([data.productBrand], replica_number=1)
#
#     res = collection.query(
#         expr=f'''imageURL like "{data.imgURL}"''',
#         partition_names=[data.productBrand],
#         output_fields=["imageID"],
#         consistency_level="Strong"
#     )
#     # print(res[0]['imageID'])
#
#     expr = f"imageID in [{res[0]['imageID']}]"
#     deleteIMG = collection.delete(expr)
#     collection.release()
#     print(deleteIMG)
#
#     return {'msg':'Delete Image From Milvus Successfully'}
#


## SEARCH BY IMAGE ##
@app.post('/api/v1/search-by-image')
async def searchByImage(image: UploadFile = File(...)):
    # img = await image.read()
    # print(image.filename)
    # print(img)

    model = getModel()
    vector = toVector(model, image.file)
    print(len(vector))
    # img = Image.open(image.file)
    # img.show()


    return {image.filename}
