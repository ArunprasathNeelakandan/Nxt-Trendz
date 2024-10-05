import { useEffect, useState } from "react"
import { Circles } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import CartContext from '../../Context'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import './index.css'


const ProductItemDetails = (props) => {

    // state = {
    //     productData: {},
    //     similarProductsData: [],
    //     apiStatus: apiStatusConstants.initial,
    //     quantity: 1,
    //   }

    const [apiStatus, setApiStatus] = useState('initiul')
    const [productData, setProductData] = useState({})
    const [similarProductsData,setSimilarProductsData] = useState([])
    const [quantity,setQuantity] = useState(1)

    const getFormattedData = data => ({
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        title: data.title,
        totalReviews: data.total_reviews,
      })

    const getData = async () => {
        setApiStatus('loading')

        const { id } = props.match.params

        const token = Cookies.get('jwt_token')
        const url = `https://apis.ccbp.in/products/${id}`
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await fetch(url, options)


        if (response.ok === true) {
            const data = await response.json()
            console.log(data)
            const updatedData = getFormattedData(data)
            const updatedSimilarProducts = data.similar_products.map(eachSimilarProduct => getFormattedData(eachSimilarProduct))
            setApiStatus('success')
            setProductData(updatedData)
            setSimilarProductsData(updatedSimilarProducts)
        }



    }

    const onDecrementQuantity = () => {
        if (quantity > 1) {
          setQuantity(prevQuantity => prevQuantity - 1)
        }
      }

    
    useEffect(() => {
        getData()
    }, [props.match.params.id])

    const loadingView = () => (
        <div className="products-details-loader-container" data-testid="loader">
            <Circles type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
    )

    const successView = () => (
        <CartContext.Consumer>
        {value => {
          const {
            availability,
            brand,
            description,
            imageUrl,
            price,
            rating,
            title,
            totalReviews,
          } = productData
          const {addCartItem} = value
          const onClickAddToCart = () => {
            addCartItem({...productData, quantity})
          }
          console.log(productData)
  
          return (
            <div className="product-details-success-view">
              <div className="product-details-container">
                <img src={imageUrl} alt="product" className="product-image" />
                <div className="product">
                  <h1 className="product-name">{title}</h1>
                  <p className="price-details">Rs {price}/-</p>
                  <div className="rating-and-reviews-count">
                    <div className="rating-container">
                      <p className="rating">{rating}</p>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                        alt="star"
                        className="star"
                      />
                    </div>
                    <p className="reviews-count">{totalReviews} Reviews</p>
                  </div>
                  <p className="product-description">{description}</p>
                  <div className="label-value-container">
                    <p className="label">Available:</p>
                    <p className="value">{availability}</p>
                  </div>
                  <div className="label-value-container">
                    <p className="label">Brand:</p>
                    <p className="value">{brand}</p>
                  </div>
                  <hr className="horizontal-line" />
                  <div className="quantity-container">
                    <button
                      type="button"
                      className="quantity-controller-button"
                      onClick={onDecrementQuantity}
                      data-testid="minus"
                    >
                      <BsDashSquare className="quantity-controller-icon" />
                    </button>
                    <p className="quantity">{quantity}</p>
                    <button
                      type="button"
                      className="quantity-controller-button"
                      onClick={onIncrementQuantity}
                      data-testid="plus"
                    >
                      <BsPlusSquare className="quantity-controller-icon" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="button add-to-cart-btn"
                    onClick={onClickAddToCart}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
              <h1 className="similar-products-heading">Similar Products</h1>
              <ul className="similar-products-list">
                {similarProductsData.map(eachSimilarProduct => (
                  <SimilarProductItem
                    productDetails={eachSimilarProduct}
                    key={eachSimilarProduct.id}
                  />
                ))}
              </ul>
            </div>
          )
        }}
      </CartContext.Consumer>
    )


  const onIncrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
  }



    const renderView = () => {
        switch (apiStatus) {
            case 'loading': return loadingView()
            case 'success': return successView()
            default: return null
        }
    }
    return (
        <>
          <Header />
          <div className="product-item-details-container">
            {renderView()}
          </div>
        </>
      )
}

export default ProductItemDetails
