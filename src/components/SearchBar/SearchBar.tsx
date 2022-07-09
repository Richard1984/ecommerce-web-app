import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { getCategories } from "../../reducers/categories";
import Button from "../Button/Button";
import Select from "../Select/Select";
import Textfield from "../Textfield/Textfield";
import "./search-bar.scss";

interface SearchBarProps {
    fullWidth?: boolean;
}

const SearchBar = (props: SearchBarProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const [category, setCategory] = useState<string>("all")
    const [searchName, setSearchName] = useState<string>("")
    const { entities: categories } = useAppSelector(state => state.categories)

    const { fullWidth} = props;

    const options = [{ value: "all", label: "Tutte le categorie" }, ...(categories || []).map(category => ({ value: String(category.id), label: category.name }))]

    const handleChangeCategory = (event: React.SyntheticEvent<HTMLSelectElement>, value: string) => {
        setCategory(value)
    }

    const search = () => { 
        const params = new URLSearchParams()
        if (category !== "all") {
            params.append("category", category)
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
        <div className="search-bar" style={fullWidth ? { width: '100%' } : undefined}>
            <Select name="select-cateogory" placeholder="Seleziona categoria" value={category} onChange={handleChangeCategory} options={options}/>
            <Textfield name="products-search" placeholder="Cerca prodotti" fullWidth onEnter={search} value={searchName} onChange={(event, value) => setSearchName(value)} />
            <Button leftIcon={<FontAwesomeIcon icon={faSearch} />} onClick={search}/>
        </div>
    )
}
    
export default SearchBar