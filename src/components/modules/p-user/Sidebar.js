import styles from "./sidebar.module.css";
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdSms } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Link from "next/link";
import LogoutHandler from "../general/LogoutHandler";

const Sidebar = ({ user }) => {

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <p>خوش اومدی {user.name} عزیز</p>
      </div>
      <ul className={styles.sidebar_main}>
      <>
            <Link href={"/p-user"} className={styles.sidebar_link_active}>
              <ImReply />
              پیشخوان
            </Link>
            <Link href={"/p-user/orders"}>
              <FaShoppingBag />
              سفارش ها
            </Link>
            <Link href={"/p-user/tickets"}>
              <MdSms />
              تیکت های پشتیبانی
            </Link>
            <Link href={"/p-user/comments"}>
              <FaComments />
              کامنت ها
            </Link>
            <Link href={"/p-user/wishlist"}>
              <FaHeart />
              علاقه مندی
            </Link>
            <Link href={"/p-user/account-details"}>
              <TbListDetails />
              جزئیات اکانت
            </Link>
          </>
      </ul>
      
      <LogoutHandler />
    </aside>
  );
};

export default Sidebar;
