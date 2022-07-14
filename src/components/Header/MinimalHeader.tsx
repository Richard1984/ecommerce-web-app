import Link from "../Link/Link";
import './header.scss';

const MinimalHeader = () => {
    return (
        <header className="header">
            <div className="left">
                <Link to="/" underline={false}>
                    <h2>Amnazom</h2>
                </Link>
            </div>
        </header>
    )
}

export default MinimalHeader