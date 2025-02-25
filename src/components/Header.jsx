import chefIcon from "../images/chef-claude-icon.png"

export default function Header(){
    return (
        <>
            <header>
                <img  src={chefIcon} alt="Chef logo" />
                <h1>Chef Claude</h1>
            </header>
        </>
    )
}