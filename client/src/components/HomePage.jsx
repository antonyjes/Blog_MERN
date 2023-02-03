import { useSelector } from "react-redux"

const HomePage = () => {
    const user = useSelector((state) => state.user);
    return(
        <div>
            Welcome {user.firstName} {user.lastName}!
        </div>
    )
}

export default HomePage;