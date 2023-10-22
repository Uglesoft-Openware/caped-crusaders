import * as React from "react";
import TopNavigation from "@cloudscape-design/components/top-navigation";

export default () => {
    return (
        <TopNavigation
            identity={{
                href: "/",
                title: "Caped Crusaders",
            }}
            utilities={[
                {
                    type: "button",
                    text: "Home",
                    href: "/",
                },
                {
                    type: "menu-dropdown",
                    text: "Characters",
                    items: [
                        { id: "species", text: "Species", href: "/characters/species" },
                        { id: "preferences", text: "Classes", href: "/characters/classes" },
                        { id: "subclasses", text: "Subclasses", href: "/characters/subclasses" },
                        { id: "backgrounds", text: "Backgrounds", href: "/characters/backgrounds" },
                        { id: "feats", text: "Feats", href: "/characters/feats" },
                        { id: "persistent-abilities", text: "Persistent Abilities", href: "persistent-abilities" },
                        { id: "limited-abilities", text: "Limited Abilities", href: "limited-abilities" },
                    ]
                }
            ]}
        />
    );
}