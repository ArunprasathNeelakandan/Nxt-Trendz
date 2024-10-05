import React from 'react'

import PrimeDealsSection from '../PrimeDealsSection'
import AllProductsSection from '../AllProductsSection'

import Header from '../Header'

import './index.css'

function Products() {
  return (
    <>
      <Header />
      <div className="products-container">
      <PrimeDealsSection/>
      <AllProductsSection/>
      </div>
    </>
  )
}

export default Products
