import { useEffect, useState } from 'react';
import api from '../../../../config/api';
import IProduct from '../../../../shared/models/IProduct';
import IShoppingList from '../../../../shared/models/IShoppingList';
import styles from './lists.module.scss';

interface IListsProps {
    className?: string;
    product: IProduct | null;
}

interface IListProps { 
    list: IShoppingList;
    product: IProduct | null;
    className?: string;
    onChange: () => void;
}

const List = ({ list, product, className, onChange: handleOnChange }: IListProps) => {
    const [success, setSuccess] = useState(false);

    const addProductToList = async (list: IShoppingList) => {
        try {
            await api.put<{ data: string }>(`/account/lists/${list.id}`, {
                name: list.name,
                products_to_add: [product?.id],
                products_to_delete: []
            });
            handleOnChange();
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 2000);
        } catch (e) {
            
        }
    }

    return (
        <div className={`${styles.list}${className ? " " + className : ""}`} onClick={() => addProductToList(list)}>
            <div className={styles.name}>{list.name}</div>
            {/* <div className={styles.button} onClick={() => addProductToList(list)}><FontAwesomeIcon icon={success ? faCheck : faAdd} /></div> */}
        </div>
    )
}

const Lists = (props: IListsProps) => {
    const [lists, setLists] = useState<IShoppingList[]>([]);

    const { className, product } = props;
    
    const getLists = async () => {
        const response = await api.get<{ data: any }>(`/account/lists`);
        setLists(response.data.data);
    }

    useEffect(() => {
        getLists()
    }, [])
    
    return (
        <div className={`${styles.lists}${className ? className : ""}`}>
            <div className={styles.header}>
                <div className={styles.title}>Aggiungi a lista</div>
            </div>
            <div className={styles.body}>
                {lists.map(list => <List onChange={getLists} key={list.id}  list={list} product={product} className={styles.list}/>)}
            </div>
        </div>
    )
}

export default Lists;