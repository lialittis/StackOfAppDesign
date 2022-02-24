// Tabs.tsx
// import styles from "./Tabs.module.scss";
import React from 'react'

import {
    FunctionComponent,
    useState,
    Children,
    PropsWithChildren,
    ReactElement,
    cloneElement,
} from "react";
import { TabsTitle } from "./TabTitle";
import { TabsItem, TabsItemProps } from "./TabItem";

interface TabsComposition {
    Title: FunctionComponent;
    Item: FunctionComponent<TabsItemProps>;
}

const Tabs: FunctionComponent & TabsComposition = ({ children, ...props }) => {
    const [activeTab, setActiveTab] = useState<string>();
    return (
        <div>
            {Children.map(children, (child) => {
                const item = child as ReactElement<PropsWithChildren<TabsItemProps>>;

                if (item.type === TabsItem) {
                    const isActive = item.props.id === activeTab;
                    const onClick = () => {
                        setActiveTab(item.props.id);
                        item.props.onClick?.();
                    };
                    return cloneElement(item, { isActive, onClick });
                } else {
                    return child;
                }
            })}
        </div>
    );
};

Tabs.Title = TabsTitle;
Tabs.Item = TabsItem;

export default Tabs;
