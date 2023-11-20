import TextContent from "@cloudscape-design/components/text-content";

export default ({ class_feature }) => {

    const feature_content = [];

    if (class_feature.content) {
        for (const content of class_feature.content) {
            if (content.list) {
                let list = []
                for (const item of content.list) {
                    list.push(<li key={item}>{item}</li>);
                }
                feature_content.push(<ul>{list.length > 0 && list}</ul>)
            }
            if (content.text) {
                feature_content.push(<p>{content.text}</p>)
            }
        }
    }

    return (
        <TextContent>
            <h4>{class_feature.name}</h4>
            {feature_content}
        </TextContent>
    );
}
