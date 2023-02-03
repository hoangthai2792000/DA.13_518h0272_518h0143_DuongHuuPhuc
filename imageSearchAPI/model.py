from pydantic import BaseModel


class Product(BaseModel):
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
