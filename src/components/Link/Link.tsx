import { NavLink } from "react-router-dom";
import './link.scss';

interface LinkProps {
    href: string;
    children: React.ReactNode;
}

const Link = (props: LinkProps) => {

    const { href } = props;

    return (
        <NavLink to={href} className="link">
            {props.children}
        </NavLink>
    )
}

export default Link