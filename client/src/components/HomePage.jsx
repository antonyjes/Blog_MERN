import { useSelector } from "react-redux"
import CardProfile from "./CardProfile";
import NavBar from "./NavBar";
import Posts from "./Posts";

const HomePage = () => {
    const {_id, picturePath} = useSelector((state) => state.user);
    return(
        <div>
            <NavBar />
            <div>
                <CardProfile userId={_id} picturePath={picturePath}/>
                <div>                    
                    <Posts />
                </div>
            </div>
        </div>
    )
}

export default HomePage;