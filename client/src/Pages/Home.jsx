import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"

const Home = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Home