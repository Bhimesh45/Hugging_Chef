import ReactMarkdown from "react-markdown"


export default function ClaudeRecipe(props){

    const markdown=`${props.recipe}`

    return(
        <section className=".suggested-recipe-container">
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </section>
    )
}