import React from 'react'
import Product from './Product'
import {useSelector} from 'react-redux'
const ProductList = () => {
  const products=useSelector(state=>state.productReducer.products)
  return (
    <div style={{display:"flex",justifyContent:"space-evenly"}}>
   {products.map(el=><Product el={el} key={el._id} />)}
    </div>
  )
}

export default ProductList