import { useEffect, useRef } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import styles from './menu.module.scss';

interface MenuProps {
    children: React.ReactNode;
    anchor: HTMLElement | null;
    onClose: () => void;
}

const Menu = (props: MenuProps) => {
    const menuAnchor = useRef<HTMLDivElement>(null);

    const { anchor, onClose: handleOnClose } = props;

    useEffect(() => {
        if (anchor) {

            if (menuAnchor.current) {
                menuAnchor.current.style.top = (anchor?.offsetHeight || 0) + 10 + 'px';
                menuAnchor.current.style.left = (anchor?.offsetLeft || 0) + 'px';
                menuAnchor.current.style.minWidth = (anchor?.offsetWidth || 0) + 'px';
            }

        }
    }, [anchor]);

    if (!anchor) {
        return null;
    }

    return (
        <ClickAwayListener onClickAway={handleOnClose}>
            <div className={styles.menu} ref={menuAnchor}>
                {props.children}
            </div>
        </ClickAwayListener >
    )
}

export default Menu