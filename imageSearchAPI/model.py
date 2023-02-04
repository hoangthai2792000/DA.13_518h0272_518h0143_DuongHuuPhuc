import pydantic
from pydantic import BaseModel, Field
from bson import ObjectId
from pyObjectID import pyObjectId

class Product(BaseModel):
    id: pyObjectId = Field(default_factory=pyObjectId, alias="_id")
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True  # required for the _id
        json_encoders = {ObjectId: str}

    name: str
    code: str
    price: int
    brand: str
    image: list
    available: bool
    size: list
    sold: int
    discount: float
    averageRating: float
    numberOfReviews: int
    description: str

