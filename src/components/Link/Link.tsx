import { NavLink } from "react-router-dom";
import './link.scss';

interface LinkProps {
    href: string;
    underline?: boolean;
    children: React.ReactNode;
}

const Link = (props: LinkProps) => {

    const { href, underline = true, children } = props;

    return (
        <NavLink to={href} className={"link" + (underline ? " link--underline"  : "")}>
            {children}
        </NavLink>
    )
}

export default Link