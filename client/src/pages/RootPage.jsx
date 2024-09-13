import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "@/components";

const RootPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return <div>
        <Header />
        <div>
            
        </div>
        </div>;
};

export default RootPage;
