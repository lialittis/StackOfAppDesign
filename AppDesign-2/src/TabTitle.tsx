import React,{ FunctionComponent } from "react";
// import { combineClassNames } from "../../utils/combineClassNames";

export interface TabsTitleProps {
}

export const TabsTitle: FunctionComponent<TabsTitleProps> = ({
    children,
}) => (
    <div>
        {children}
    </div>
);
