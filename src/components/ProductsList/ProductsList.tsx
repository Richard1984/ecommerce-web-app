import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createRef, useEffect, useState } from "react";
import IProduct from "../../shared/models/IProduct";
import Product from "../Product/Product";
import styles from './product-list.module.scss';

interface IProductsListProps {
    title: string;
    products: IProduct[]
}

const ProductsList = (props: IProductsListProps) => {
    const productsListRef = createRef<HTMLDivElement>()
    const [scrolledToStart, setScrolledToStart] = useState(true)
    const [scrolledToEnd, setScrolledToEnd] = useState(false)

    const { title, products } = props

    const handleMoveLeft = () => {
        if (productsListRef.current) productsListRef.current.scrollLeft -= 290
    }

    const handleMoveRight = () => {
        if (productsListRef.current) productsListRef.current.scrollLeft += 290
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
    }, [productsListRef])

    return (
        <div className={styles.productsList} >
            <div className={styles.header}>
                {title}
            </div>
            <div className={styles.body}>
                {!scrolledToStart ? <button className={styles.buttons + " " + styles.buttonLeft} onClick={handleMoveLeft}><FontAwesomeIcon icon={faAngleLeft} /></button> : null}
                {!scrolledToEnd ? <button className={styles.buttons + " " + styles.buttonRight} onClick={handleMoveRight}><FontAwesomeIcon icon={faAngleRight} /></button> : null}
                <div className={styles.products} ref={productsListRef}>
                    {products.map(product => <Product product={product} key={product.id} className={styles.product} />)}
                </div>
            </div>
        </div>
    )
}

export default ProductsList