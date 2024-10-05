import { Redirect,Route } from "react-router-dom";
import Cookie from 'js-cookie'


const ProductRoute = (props) => {
    const accessToken = Cookie.get('jwt_token')
    console.log(accessToken)

    if (accessToken === undefined) {
        return <Redirect to='/Login'/>
    }else {
        return <Route {...props}/>
    }

}

export default ProductRoute
