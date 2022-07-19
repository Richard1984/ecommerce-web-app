interface IShop {
    id: number | null;
    name: string;
    surname: string,
    social_reason: string,
    vat_number: string,
    address: string,
    sector: string
}

export const shopDefaultValue: IShop = {
    id: null,
    name: "",
    surname: "",
    social_reason: "",
    vat_number: "",
    address: "",
    sector: ""
};

export default IShop;
