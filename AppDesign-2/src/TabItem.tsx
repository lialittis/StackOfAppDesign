// TabsItem.tsx
// import styles from "./Tabs.module.scss";
import React,{ FunctionComponent } from "react";
// import { combineClassNames } from "../../utils/combineClassNames";

export interface TabsItemProps {
    id: string;
    isActive?: boolean;
    onClick?: () => void;
}

export const TabsItem: FunctionComponent<TabsItemProps> = ({
    children,
    isActive = false,
    onClick,
}) => (
    <div
        onClick={onClick}
    >
        {children}
    </div>
);
