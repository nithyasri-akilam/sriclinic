import { Outlet } from "react-router-dom";
import Footer from "../Components/website/Footer";
import Navbar from "../Components/website/Navbar";

export const PublicLayout = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};