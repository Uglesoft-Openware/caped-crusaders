import * as React from "react";
import classes from './../classes.json'
import { useParams } from "react-router-dom";

import ClassFeature from "./../../../../components/ClassFeature";

import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Header from "@cloudscape-design/components/header";
import TextContent from "@cloudscape-design/components/text-content";

export default () => {
    const { className } = useParams()
    const [characterClass, setCharacterClass] = React.useState(null)

    React.useEffect(() => {
        classes.entries.forEach((item) => {
            if (item.name.toLowerCase() == className) {
                setCharacterClass(item)
            }
        })
    }, [])

    const ShowClassFeatures = (class_table) => {
        const class_features = class_table?.reduce((accumulator, item) => {
            const filtered = item?.class_features.filter(feature => {
                // Replace 'matching_name' with the name you want to omit
                return !accumulator.some(existingFeature => existingFeature.name === feature.name);
            });
            return accumulator.concat(filtered);
        }, []);

        return <>
            {class_features?.map((class_feature) => (
                <ClassFeature class_feature={class_feature} />
            ))}
        </>
    }

    return (
        <>
            <TextContent>
                <h1>
                    {characterClass?.name?.toUpperCase()}
                </h1>
                <p>
                    {characterClass?.descriptions?.overview}
                </p>
                <h4>
                    {characterClass?.descriptions?.primary?.heading?.toUpperCase()}
                </h4>
                <p>
                    {characterClass?.descriptions?.primary?.content}
                </p>
                <h4>
                    {characterClass?.descriptions?.secondary?.heading?.toUpperCase()}
                </h4>
                <p>
                    {characterClass?.descriptions?.secondary?.content}
                </p>
            </TextContent>
            <Table
                columnDefinitions={[
                    {
                        id: "level",
                        header: "Level",
                        cell: item => item.level,
                        isRowHeader: true
                    },
                    {
                        id: "proficiency_bonus",
                        header: "Proficiency Bonus",
                        cell: item => `+${Math.floor((item.level - 1) / 4) + 2}`,
                    },
                    {
                        id: "class_features",
                        header: "Class Features",
                        cell: item => {
                            let class_features = ''
                            item.class_features.forEach((item, index) => {
                                if (index == 0) {
                                    class_features = item.name
                                } else {
                                    class_features += `, ${item.name}`
                                }
                            })
                            return class_features
                        }
                    },
                    {
                        id: "persistent_abilities",
                        header: "Persistent Abilities Known",
                        cell: item => item.persistent_abilities_known
                    },
                    {
                        id: "casting_abilities_known",
                        header: "Casting Abilities Known",
                        cell: item => item.level * characterClass?.consumables_known_per_level
                    },
                    {
                        id: "casting_points",
                        header: "Casting Points",
                        cell: item => item.level * characterClass?.consumables_points_per_level
                    },
                    {
                        id: "casting_max_level",
                        header: "Casting Max Level",
                        cell: item => Math.min(
                            Math.floor(
                                (item.level + 1)
                                /
                                characterClass?.consumables_max_per_level_denominator
                            ),
                            9
                        )
                    },
                ]}
                columnDisplay={[
                    { id: "level", visible: true },
                    { id: "proficiency_bonus", visible: true },
                    { id: "class_features", visible: true },
                    { id: "persistent_abilities", visible: true },
                    { id: "casting_abilities_known", visible: true },
                    { id: "casting_points", visible: true },
                    { id: "casting_max_level", visible: true },
                ]}
                items={characterClass?.class_table}
                loadingText="Loading resources"
                trackBy="name"
                empty={
                    <Box
                        margin={{ vertical: "xs" }}
                        textAlign="center"
                        color="inherit"
                    >
                        <SpaceBetween size="m">
                            <strong>There was an error loading the table</strong>
                        </SpaceBetween>
                    </Box>
                }
                header={
                    <Header                    >
                        {`THE ${characterClass?.name?.toUpperCase()}`}
                    </Header>
                }
            />
            <TextContent>
                <h2>
                    CLASS FEATURES
                </h2>
                <p>
                    As a {characterClass?.name}, you gain the following class features.
                </p>

                <h4>
                    HIT POINTS
                </h4>
                <p>
                    <strong>Hit Dice:</strong> <code>1d{characterClass?.hit_die}</code> per <code>{characterClass?.name}</code> level
                    <br></br>
                    <strong>Hit Points at 1st Level:</strong> <code>{characterClass?.hit_die}</code> + your Constitution modifier
                    <br></br>
                    <strong>Hit Points at Higher Levels:</strong> <code>1d{characterClass?.hit_die}</code> or <code>{characterClass?.hit_die / 2 + 1}</code> + your Constitution modifier per <code>{characterClass?.name}</code> level after 1st
                </p>
                <h4>
                    PROFICIENCIES
                </h4>
                <p>

                    <strong>Armor:</strong> <code>
                        {characterClass?.proficiencies?.armor?.join(', ')}
                    </code>
                    <br></br>
                    <strong>Weapons:</strong> <code>
                        {characterClass?.proficiencies?.weapons?.join(', ')}
                    </code>
                    <br></br>
                    <strong>Tools:</strong> <code>
                        {characterClass?.proficiencies?.tools?.join(', ')}
                    </code>
                    <br></br>
                    <strong>Saving Throws:</strong> <code>
                        {characterClass?.proficiencies?.saves?.join(', ')}
                    </code>
                    <br></br>
                    <strong>Skills:</strong> Choose <code>
                        {characterClass?.proficiencies?.skills?.count}
                    </code> from <code>
                        {characterClass?.proficiencies?.skills?.options?.join(', ')}
                    </code>
                </p>
                <h4>
                    EQUIPMENT
                </h4>
                You start with the following equipment, in addition to the equipment granted by your background
                <ul>
                    <li>
                        <code>
                            {characterClass?.equipment?.armor}
                        </code>
                    </li>
                    <li>
                        <code>
                            {characterClass?.equipment?.weapons}
                        </code>
                    </li>
                    <li>
                        <code>
                            {characterClass?.equipment?.tools}
                        </code>
                    </li>
                    <li>
                        <code>
                            {characterClass?.equipment?.packs}
                        </code>
                    </li>
                </ul>
                <h4>
                    VARIANT: STARTING WEALTH
                </h4>
                In lieu of the equipment granted by your class and background, you can elect to purchase your starting gear. If you do so, you receive no equipment from your class and background, and instead roll for your starting wealth using the criteria below:
                <br></br>
                <code>
                    {characterClass?.equipment?.variant}
                </code>
            </TextContent>
            <hr></hr>
            {ShowClassFeatures(characterClass?.class_table)}
        </>
    );
}