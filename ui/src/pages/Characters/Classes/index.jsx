import * as React from "react";
import Cards from "@cloudscape-design/components/cards";
import Link from "@cloudscape-design/components/link";
import SpaceBetween from "@cloudscape-design/components/space-between";

import classes from './classes.json'

export default () => {
    return (
        <Cards
            cardDefinition={{
                header: item => (
                    <Link href={`/characters/classes/${item.name.toLowerCase()}`} fontSize="heading-m">
                        {item.name}
                    </Link>
                ),
                sections: [
                    {
                        id: "description",
                        content: item => {
                            return <>
                                <img src={"/" + item.thumbnail} width={32} style={{ marginRight: "8px", float: "left" }} />
                                {item?.descriptions?.preview}
                            </>
                        }
                    },
                    {
                        id: "class_type",
                        header: "Class Type",
                        content: item => item.class_type
                    },
                    {
                        id: "hit_die",
                        header: "Hit Die",
                        content: item => `d${item.hit_die}`
                    },
                    {
                        id: "primary_ability",
                        header: "Primary Ability",
                        content: item => item.primary_ability
                    },
                    {
                        id: "saves",
                        header: "Saves",
                        content: item => item?.proficiencies?.saves?.join(', ')
                    },
                ]
            }}
            cardsPerRow={[{
                cards: 1
            }, {
                minWidth: 500,
                cards: 2
            }, {
                minWidth: 800,
                cards: 4
            }]
            }
            items={classes.entries}
            // trackBy="name"
            visibleSections={["description", "class_type", "hit_die", "primary_ability", "saves"]}
        />
    );
}