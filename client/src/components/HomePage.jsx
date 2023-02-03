import { useSelector } from "react-redux"
import NavBar from "./NavBar";

const HomePage = () => {
    const user = useSelector((state) => state.user);
    return(
        <div>
            <NavBar />
            Welcome {user.firstName} {user.lastName}!
        </div>
    )
}

export default HomePage;