import styles from "@/styles/p-user/user-panel-layout.module.css";
import Sidebar from "@/components/modules/p-user/Sidebar";
import Topbar from "@/components/modules/p-user/Topbar";
//
import { authUser } from "@/utils/auth";
import { redirect } from "next/navigation";

const PanelLayout = async ({ children }) => {

    const user = await authUser();
    console.log(user);
    
    if(!user) {
        redirect('/login-register')
    }

    return(
        <div className={styles.layout}>
            <section className={styles.section}>
                <Sidebar />
                <div className={styles.contents}>
                <Topbar />
                {children}
                </div>
            </section>
        </div>
    )
}

export default PanelLayout;