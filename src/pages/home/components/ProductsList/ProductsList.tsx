import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createRef, useEffect, useState } from "react";
import Product from "../../../../components/Product/Product";
import IProduct from "../../../../shared/models/IProduct";
import './product-list.scss';

interface ProductsListProps {
    title: string;
    products: IProduct[]
}

const ProductsList = (props: ProductsListProps) => {
    const productsListRef = createRef<HTMLDivElement>()
    const [scrolledToStart, setScrolledToStart] = useState(true)
    const [scrolledToEnd, setScrolledToEnd] = useState(false)

    const { title, products } = props

    const handleMoveLeft = () => {
        if (productsListRef.current) productsListRef.current.scrollLeft -= 450
    }

    const handleMoveRight = () => {
        if (productsListRef.current) productsListRef.current.scrollLeft += 450
    }

    const handleOnScroll = (event: Event) => { 
        const { scrollLeft, scrollWidth, offsetWidth } = event.target as HTMLDivElement

        if (offsetWidth + scrollLeft >= scrollWidth) {
            setScrolledToEnd(true)
        } else if (scrollLeft === 0) {
            setScrolledToStart(true)
        } else {
            setScrolledToStart(false)
            setScrolledToEnd(false)
        }
    }

    useEffect(() => {
        if (productsListRef.current?.scrollLeft === 0) { 
            setScrolledToStart(true)
        }
        productsListRef.current?.addEventListener("scroll", handleOnScroll);
    }, [productsListRef.current])

    return (
        <div className="products-list" >
            <div className="products-list__header">
                <h2>{title}</h2>
            </div>
            <div className="products-list__body">
                {!scrolledToStart ? <button className="buttons button-left" onClick={handleMoveLeft}><FontAwesomeIcon icon={faAngleLeft} /></button> : null}
                {!scrolledToEnd ? <button className="buttons button-right" onClick={handleMoveRight}><FontAwesomeIcon icon={faAngleRight} /></button> : null}
                <div className="products" ref={productsListRef}>
                    {products.map(product => <Product product={product} key={product.id} />)}
                </div>
            </div>
        </div>
    )
}

export default ProductsList