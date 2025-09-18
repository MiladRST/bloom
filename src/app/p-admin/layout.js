import styles from "@/styles/p-admin/adminPanelLayout.module.css";
import Sidebar from "@/components/modules/p-admin/Sidebar";
import Topbar from "@/components/modules/p-admin/Topbor";
//
import { authUser } from "@/utils/auth";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }) => {
  const user = await authUser();

  // if(!user) {
  //     redirect('/login-register')
  // }
  // only admin access
  if( user.role !== "ADMIN" ) {
    redirect('/p-user')
  }

  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar />
        <div className={styles.contents}>
          <Topbar />
          {children}
        </div>
      </section>
    </div>
  );
};

export default AdminLayout;
