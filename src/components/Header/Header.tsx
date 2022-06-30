import { useAppSelector } from "../../config/store";
import IUser from "../../shared/models/IUser";
import Link from "../Link/Link";
import SearchBar from "../SearchBar/SearchBar";
import './header.scss';

interface HeaderProps {
    user?: IUser | null;
}

const Header = (props: HeaderProps) => {
    const { entities: categories } = useAppSelector(state => state.categories)

    const { user } = props

    return (
        <header className="header">
            <div className="left">
                <Link href="/" underline={false}>
                    <h2>Amnazom</h2>
                </Link>
                <SearchBar fullWidth categories={categories} />
            </div>
            {props.user && (
                <div className="menu">
                    <p>{user?.firstname + " " + user?.lastname}</p>
                    {/* <a href="/logout">Logout</a> */}
                    <div className="profile">
                        <img src={user?.img || "https://via.placeholder.com/45"} alt="Profile" />
                    </div>
                </div>
            )}
        </header>
    )

}

export default Header