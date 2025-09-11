"use client";
import React from "react";
import styles from "./tabs.module.css";
import { useState } from "react";
import Description from "./Description";
import MoreInfoes from "./MoreInfoes";
import Comments from "./Comments";
const Tabs = ({ product, user }) => {
  
  const [tab, setTab] = useState("description");

  return (
    <div data-aos="fade-left" className={styles.tabs}>
     
      <ul>
        <li title="Features">
          <button onClick={() => setTab("description")}
        className={tab === "description" ? 'active' : ''}>
            {" "}
            توضیحات{" "}
          </button>
        </li>
        <li title="Delivery Contents">
          <button onClick={() => setTab("moreInfoes")}
        checked={tab === "moreInfoes" ? 'active' : ''}>
            {" "}
            اطلاعات بیشتر{" "}
          </button>
        </li>
        <li title="Shipping">
          <button onClick={() => setTab("comments")}
        checked={tab === "comments" ? 'active' : ''}>
            {" "}
            نظرات ({product.comments.length}){" "}
          </button>
        </li>
      </ul>

      <div className={styles.contents}>
        <section className={`${styles.tabs_content} ${tab === "description" ? styles.active : ''}`}>
          <Description {...product } />
        </section>
        <section className={`${styles.tabs_content} ${tab === "moreInfoes" ? styles.active : ''}`}>
          <MoreInfoes {...product} />
        </section>
        <section className={`${styles.tabs_content} ${tab === "comments" ? styles.active : ''}`}>
          <Comments productID={product._id} name={product.name} comments={product.comments} user={user}/>
        </section>
      </div>
    </div>
  );
};

export default Tabs;
