import { useCallback, useEffect, useState } from 'react'
import { Circles } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'
import FiltersGroup from '../FiltersGroup'
import './index.css'

const categoryOptions = [
    {
      name: 'Clothing',
      categoryId: '1',
    },
    {
      name: 'Electronics',
      categoryId: '2',
    },
    {
      name: 'Appliances',
      categoryId: '3',
    },
    {
      name: 'Grocery',
      categoryId: '4',
    },
    {
      name: 'Toys',
      categoryId: '5',
    },
  ]
  
  const sortbyOptions = [
    {
      optionId: 'PRICE_HIGH',
      displayText: 'Price (High-Low)',
    },
    {
      optionId: 'PRICE_LOW',
      displayText: 'Price (Low-High)',
    },
  ]
  
  const ratingsList = [
    {
      ratingId: '4',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
    },
    {
      ratingId: '3',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
    },
    {
      ratingId: '2',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
    },
    {
      ratingId: '1',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
    },
  ]
    

const AllProductsSection = () => {
    const [apiStatus,setApiStatus] = useState('initual')
    const [productsList,setProductsList] = useState([])
    const [activeOptionId,setActiveOptionId] = useState(sortbyOptions[0].optionId)
    const [activeCategoryId,setActiveCategoryId] = useState('')
    const [searchInput,setSearchInput] = useState('')
    const [activeRatingId,setActiveRatingId] = useState('')

    const changeSortby = activeOptionId => {
        console.log(activeOptionId)
         setActiveOptionId(activeOptionId)
      }

    const getData = useCallback(async() => {
      setApiStatus('loading')

      const token = Cookies.get('jwt_token')
      const url =  `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`
      const options = {
          method : 'GET',
          headers :{
              Authorization: `Bearer ${token}`
          }
      }

      const response = await fetch(url,options)
      
      if (response.ok === true) {
          const data = await response.json()

          const updatedData = data.products.map(product => ({
              title: product.title,
              brand: product.brand,
              price: product.price,
              id: product.id,
              imageUrl: product.image_url,
              rating: product.rating,
            }))

            setProductsList(updatedData)
            setApiStatus('success')
      }else {
          setApiStatus('failure')
      }
      
  },[activeOptionId, searchInput, activeRatingId, activeCategoryId]
)
   


    const changeRating = activeRatingId => {
        setActiveRatingId(activeRatingId)
    
      }
    
      const changeCategory = activeCategoryId => {
        setActiveCategoryId(activeCategoryId)
      }
    
      const enterSearchInput = () => {
        getData()
      }
    
      const changeSearchInput = searchInput => {
        setSearchInput(searchInput)
      }




    const clearFilters = () => {
        setSearchInput('')
        setActiveCategoryId('')
        setActiveRatingId('')
  
    }

    useEffect(()=>{
          getData()
    },[getData])

    const loadingView = () => (
        <div className="primedeals-loader-container">
      < Circles  type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
    )

    const successView =() => {
        const shouldShowProductsList = productsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
    }

    const renderProducts = () => {
        switch (apiStatus) {
            case 'loading' : return loadingView()
            case 'success' : return successView()
            default : return null
        }
    }

    return (
        <div className="all-products-section">
        <FiltersGroup
          searchInput={searchInput}
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changeSearchInput={changeSearchInput}
          enterSearchInput={enterSearchInput}
          activeCategoryId={activeCategoryId}
          activeRatingId={activeRatingId}
          changeCategory={changeCategory}
          changeRating={changeRating}
          clearFilters={clearFilters}
        />
        {renderProducts()}
      </div>
    )
}

export default AllProductsSection