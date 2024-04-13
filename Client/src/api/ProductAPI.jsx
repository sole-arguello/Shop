import { useState } from 'react'


function ProductAPI() {

    const [products, setProducts] = useState([])

    /// aqui estaba el bloque que pase en el componente products//////

  return (
    {products, setProducts}
  )
}

export default ProductAPI