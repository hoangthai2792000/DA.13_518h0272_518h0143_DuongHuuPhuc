import React from 'react'
import { useParams } from "react-router"; 

const ProductDetail = () => {
    const { id } = useParams();
        console.log(id)
    return (
        <div>Product Page}</div>
    )
}

export default ProductDetail