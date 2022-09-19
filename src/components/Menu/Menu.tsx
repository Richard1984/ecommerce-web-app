import { useEffect, useRef, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import styles from './menu.module.scss';

interface MenuProps {
    children: React.ReactNode;
    anchor: HTMLElement | null;
    onClose?: () => void;
}

const Menu = (props: MenuProps) => {
    const menuAnchor = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    const { anchor, onClose } = props;

    useEffect(() => {
        if (anchor) {

            if (menuAnchor.current) {
                menuAnchor.current.style.top = (anchor?.offsetHeight + anchor.offsetTop || 0) + 10 + 'px';

                menuAnchor.current.style.minWidth = (anchor?.offsetWidth || 0) + 'px';

                if (anchor?.offsetLeft + menuAnchor?.current?.offsetWidth > document.documentElement.clientWidth) {
                    menuAnchor.current.style.right = document.documentElement.clientWidth - anchor?.offsetLeft - anchor?.offsetWidth + 'px';
                } else {
                    menuAnchor.current.style.left = (anchor?.offsetLeft || 0) + 'px';
                }

            }

        }
    }, [anchor, document.documentElement.clientWidth]);

    // Possibile modifca
    // useEffect(() => {
    //     if (anchor) {

    //         if (menuAnchor.current) {
    //             menuAnchor.current.style.top = (anchor?.offsetHeight + anchor.offsetTop || 0) + 10 + 'px';

    //             menuAnchor.current.style.minWidth = (anchor?.offsetWidth || 0) + 'px';

    //             if (anchor?.offsetLeft + menuAnchor?.current?.offsetWidth > document.documentElement.offsetWidth) {
    //                 menuAnchor.current.style.right = document.documentElement.scrollWidth - anchor?.offsetLeft - anchor?.offsetWidth + 'px';
    //                 menuAnchor.current.style.left = 'auto';
    //             } else {
    //                 menuAnchor.current.style.left = (anchor?.offsetLeft || 0) + 'px';
    //                 menuAnchor.current.style.right = 'auto';
    //             }

    //         }

    //     }
    // }, [anchor, document.documentElement.clientWidth, anchor?.offsetLeft, anchor?.offsetWidth]);

    if (!anchor) {
        return null;
    }

    const handleOnClickAway = (event: FocusEvent | MouseEvent | TouchEvent) => {
        if (open) {
            setOpen(false);
            if (onClose) onClose();
        } else if (event.target === anchor || anchor.contains(event.target as Node)) {
            setOpen(!open);
        }
    }

    const handleOnClose = () => {
        setOpen(false);
        if (onClose) onClose();
    }

    return (
        <ClickAwayListener onClickAway={handleOnClickAway}>
            <div className={`${styles.menu}${open ? " " + styles.open : ""}`} ref={menuAnchor} onClick={handleOnClose}>
                {props.children}
            </div>
        </ClickAwayListener >
    )
}

export default Menu