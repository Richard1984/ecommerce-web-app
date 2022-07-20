import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import Container from "../../../../components/Container/Container";
import Paper from "../../../../components/Paper/Paper";
import ProductItem from "../../../../components/ProductItem/ProductItem";
import api from "../../../../config/api";
import IProduct from "../../../../shared/models/IProduct";
import IShoppingList from "../../../../shared/models/IShoppingList";
import styles from './shopping-list-products.module.scss';

const ShoppingListProductsRoute = () => {
    const params = useParams<{ id: string }>();
    const [shoppingList, setShoppingList] = useState<IShoppingList | null>(null);
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => { 
        const getList = async () => {
            const response = await api.get<{ data: { list: IShoppingList, products: IProduct[] } }>(`/account/lists/${params.id}`);
            setShoppingList(response.data.data.list);
            setProducts(response.data.data.products);
        }
        getList();
    }, [params.id]);

    const removeProduct = async (product: IProduct) => {
        const response = await api.put<{ data: { list: IShoppingList, products: IProduct[] } }>(`/account/lists/${shoppingList?.id}`, {
            name: shoppingList?.name,
            products_to_delete: [product.id],
            products_to_add: []
        });
        setShoppingList(response.data.data.list);
        setProducts(response.data.data.products);
    }

    
    return (
      
            <Container size="large" className={styles.container}>
                <Paper className={styles.content}>
                    <div className={styles.header}>
                    <div className={styles.title}>{shoppingList?.name}</div>
                    <div className={styles.actions}>
                        <Button size="small" className={styles.action} text="Torna alle mie liste" leftIcon={<FontAwesomeIcon icon={faArrowLeft} />} to="/account/lists" />
                    </div>
                    </div>
                <div className={styles.products}>
                    {
                        products.length > 0 ?
                            products.map(product => (
                                <ProductItem className={styles.product}  key={product.id} product={product} actions={[{
                                    icon: <FontAwesomeIcon icon={faXmark} />,
                                    onClick: removeProduct,
                                }]} />
                            ))
                            :
                            <p>Nessun prodotto presente nella lista.</p>
                    }
                    </div>
                </Paper>
            </Container>
    );
};

export default ShoppingListProductsRoute;