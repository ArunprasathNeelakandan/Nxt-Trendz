import { useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from './Components/Login'
import Home from './Components/Home'
import Products from './Components/Products'
import ProductItemDetails from './Components/ProductItemDetails'
import Cart from './Components/Cart'
import NotFound from './Components/NotFound'
import ProductRoute from './Components/ProductRoute'
import CartContext from './Context'

import './App.css'

const App = () => {
  const [cartList, setCartList] = useState([])

  const removeAllCartItems = () => {
    setCartList([])
  }

  const incrementCartItemQuantity = id => {
    setCartList(prevCartList =>
      prevCartList.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decrementCartItemQuantity = id => {
    setCartList(prevCartList =>
      prevCartList.map(item => {
        if (item.id === id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return null
          }
        }
        return item
      }).filter(item => item !== null)
    )
  }

  const removeCartItem = id => {
    setCartList(prevCartList => 
      prevCartList.filter(item => item.id !== id)
    )
  }

  const addCartItem = product => {
    setCartList(prevCartList => {
      const productExists = prevCartList.find(item => item.id === product.id)

      if (productExists) {
        return prevCartList.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      } else {
        return [...prevCartList, product]
      }
    })
  }

  return (
    <CartContext.Provider

      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProductRoute exact path="/" component={Home} />
        <ProductRoute exact path="/products" component={Products} />
        <ProductRoute exact path="/products/:id" component={ProductItemDetails} />
        <ProductRoute exact path="/cart" component={Cart} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </CartContext.Provider>
  )
}

export default App