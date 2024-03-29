import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { getCategories } from "../../reducers/categories";
import Button from "../Button/Button";
import Select from "../Select/Select";
import Textfield from "../Textfield/Textfield";
import styles from "./search-bar.module.scss";

interface SearchBarProps {
    fullWidth?: boolean;
    className?: string;
}

const SearchBar = (props: SearchBarProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const [category, setCategory] = useState<string>("all")
    const [searchName, setSearchName] = useState<string>("")
    const { entities: categories } = useAppSelector(state => state.categories)

    const { fullWidth, className } = props;

    const options = [{ value: "all", label: "Tutte le categorie" }, ...(categories || []).map(category => ({ value: String(category.id), label: category.name }))]

    const handleChangeCategory = (event: React.SyntheticEvent<HTMLSelectElement>, value: string) => {
        setCategory(value)
    }

    const search = () => { 
        const params = new URLSearchParams()

        if (category !== "all" && category !== "" && searchName === "") { 
            return navigate({ pathname: `/categories/${category}/products`})
        }

        if (category !== "all") {
            params.append("category_id", category)
        }
        if (searchName) {
            params.append("search_name", searchName)
        }
        navigate({ pathname: "/search", search : params.toString() })
    }

    useEffect(() => {
        if (searchParams.has("search_name")) {
            setSearchName(searchParams.get("search_name") as string)
        }
        if (searchParams.has("category")) {
            setCategory(searchParams.get("category") as string)
        }
    }, [searchParams])
    
    useEffect(() => { 
        dispatch(getCategories())
    }, [])

    return (
        <div className={`${styles.searchBar}${className ? " " + className : ""}`} style={fullWidth ? { width: '100%' } : undefined}>
            <Select className={styles.select}  name="select-cateogory" placeholder="Seleziona categoria" value={category} onChange={handleChangeCategory} options={options}/>
            <Textfield className={styles.textfield} type="text" name="products-search" placeholder="Cerca prodotti" fullWidth onEnter={search} value={searchName} onValueChange={(event, value) => setSearchName(value)} />
            <Button className={styles.button} leftIcon={<FontAwesomeIcon icon={faSearch} />} onClick={search} />
        </div>
    )
}
    
export default SearchBar