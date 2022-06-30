import { useState } from "react";
import ICategory from "../../shared/models/ICategory";
import Select from "../Select/Select";
import Textfield from "../Textfield/Textfield";
import "./search-bar.scss";

interface SearchBarProps {
    fullWidth?: boolean;
    categories?: ICategory[];
}

const SearchBar = (props: SearchBarProps) => {
    const [category, setCategory] = useState("all")

    const { fullWidth, categories } = props;

    const options = [{ value: "all", label: "Tutte le categorie" }, ...(categories || []).map(category => ({ value: String(category.id), label: category.name }))]

    const handleChangeCategory = (event: React.SyntheticEvent<HTMLSelectElement>, value: string) => {
        setCategory(value)
    }

    return (
        <div className="search-bar" style={fullWidth ? { width: '100%' } : undefined}>
            <Select name="select-cateogory" placeholder="Seleziona categoria" value={category} onChange={handleChangeCategory} options={options}/>
            <Textfield name="products-search" placeholder="Cerca prodotti" fullWidth />
        </div>
    )
}
    
export default SearchBar