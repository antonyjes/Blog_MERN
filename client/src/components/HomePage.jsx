import { useSelector } from "react-redux"
import CardProfile from "./CardProfile";
import NavBar from "./NavBar";

const HomePage = () => {
    const {_id, picturePath} = useSelector((state) => state.user);
    return(
        <div>
            <NavBar />
            <div>
                <CardProfile userId={_id} picturePath={picturePath}/>
            </div>
        </div>
    )
}

export default HomePage;