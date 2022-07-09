import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IProduct from "../../shared/models/IProduct"
import Button from "../Button/Button"
import './product.scss'

interface ProductProps {
    product: IProduct
}

const Product = (props: ProductProps) => {

    const { product } = props

    return (
        <div className="product">
            <div className="product__image">
                <img src="https://picsum.photos/150" alt="product" />
            </div>
            <div className="product__body">
                <div className="info">
                    <h3 className="name">{product.name}</h3>
                    <p className="price">{product.price + " €"}</p>
                </div>
                <div className="actions">
                    <Button leftIcon={<FontAwesomeIcon icon={faShoppingCart}/>} text="Aggiungi al carrello" />
                </div>
            </div>
            
        </div>
    )
}

export default Product