
import AOSInit from "@/utils/aos";
import ScrollToTop from "@/utils/ScrollToTop";
import { authUser } from "@/utils/auth";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";

const MainLayout = async ({children}) => {

   const user = await authUser();

    return(
        <>
            <AOSInit />
            <Navbar isLogin={user ? true : false} />
            {children}
            <Footer />
            <ScrollToTop />
        </>
    )
}

export default MainLayout;