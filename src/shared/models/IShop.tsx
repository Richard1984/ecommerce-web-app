interface IShop {
    id: number | null;
    firstname: string;
    lastname: string,
    company_name: string,
    vat_number: string,
    address: string,
    sector: string
}

export const shopDefaultValue: IShop = {
    id: null,
    firstname: "",
    lastname: "",
    company_name: "",
    vat_number: "",
    address: "",
    sector: ""
};

export default IShop;
