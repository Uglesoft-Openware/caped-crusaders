import * as React from "react";
import AppLayout from "@cloudscape-design/components/app-layout";
import TopNavigation from "./../TopNavigation";

export default ({ children }) => {
    return (
        <>
            <TopNavigation />
            <AppLayout
                content={children} />
        </>
    );
}