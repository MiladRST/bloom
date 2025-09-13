import styles from "./sidebar.module.css";
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdSms } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Link from "next/link";
import LogoutHandler from "@/components/modules/general/LogoutHandler";

const Sidebar = () => {


  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <p>خوش اومدی شاهین عزیز</p>
      </div>
      <ul className={styles.sidebar_main}>
        <>
            <Link href={"/p-admin"} className={styles.sidebar_link_active}>
              <ImReply />
              پیشخوان
            </Link>

            <Link href={"/p-admin/products"}>
              <FaShoppingBag />
              محصولات
            </Link>
            <Link href={"/p-admin/users"}>
              <FaUsers />
              کاربران
            </Link>
            <Link href={"/p-admin/comments"}>
              <FaComments />
              کامنت ها
            </Link>

            <Link href={"/p-admin/tickets"}>
              <MdSms />
              تیکت ها
            </Link>
            <Link href={"/p-admin/discount"}>
              <MdOutlineAttachMoney />
              تخفیفات
            </Link>
          </>
      </ul>
     
      <LogoutHandler />
    </aside>
  );
};

export default Sidebar;
