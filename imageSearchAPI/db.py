from dotenv import dotenv_values

config = dotenv_values('.env')

import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient(config['MONGO_URI'])
db = client['DACNTT2-api']
collection = db['products']

from model import Product


async def getAllProducts():
    products = []
    # cursor = collection.find({"$or": [{"code": "196149230903"}, {"code": "196149230900"}]})
    cursor = collection.find({})
    async for document in cursor:
        products.append({'name': Product(**document).name,
                         'price': Product(**document).price,
                         'size': Product(**document).size,
                         'image': Product(**document).image})

    return products

async def getProductWithCode(code):
    product = await collection.find_one({"code":code})
    return product
