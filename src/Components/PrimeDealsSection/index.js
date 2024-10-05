import React, { useEffect, useState } from 'react'
import Cookies  from 'js-cookie'
import ProductCard from '../ProductCard'
import { Circles } from 'react-loader-spinner'
import './index.css'

function PrimeDealsSection() {
    const [dealData,setDealData] = useState([])

    const [apiStatus,setApiStatus] = useState('initiul')


    const  getPrimeDeals = async () => {

        setApiStatus('loading')

        const token = Cookies.get('jwt_token')
        

    const url = 'https://apis.ccbp.in/prime-deals'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
        if (response.ok===true){
            const data = await response.json()
            const formetData = data.prime_deals.map(product => ({
                title: product.title,
                brand: product.brand,
                price: product.price,
                id: product.id,
                imageUrl: product.image_url,
                rating: product.rating,
            }))
            setApiStatus('success')
            setDealData(formetData)    
        }else {
            setApiStatus('failure')
        }
        
        

    }
    useEffect(()=>{
        getPrimeDeals()
    },[])

    const renderSuccessView = () => {
        return (
            <div>
        <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
        <ul className="products-list">
          {dealData.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
          )
    }

    const failureView = () => (
        <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="register prime"
      className="register-prime-img"
    />
    )

    const lodingView = () => (
        <div className="primedeals-loader-container">
      < Circles  type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
    )
    
    switch (apiStatus) {
        case 'success': return renderSuccessView()
        case 'failure' : return failureView()
        case 'loading' : return lodingView()
        default:return null
        
    }
    
  
}

export default PrimeDealsSection
