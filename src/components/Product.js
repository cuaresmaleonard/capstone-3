import './Product.css';
import { Link } from 'react-router-dom';
const Product = ({productProp, productId}) => {
    // console.log(keyprop)
    console.log(productId)
    const {imgUrl, name, price, description} = productProp
    return (
        <div className='product'>
            <img src={imgUrl} alt={name}/>
            <div className='product-info'>
                <p className='info-name'>{name}</p>
                <p className='info-description'>{description.substring(0, 100)}...</p>

                <p className='info-price'>${price}</p>
                
                <Link to={`/products/${productId}`}className='info-button'>
                    View
                </Link>
            </div>
        </div>
    )
}

export default Product;