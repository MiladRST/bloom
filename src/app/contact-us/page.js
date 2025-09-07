import MainLayout from "@/components/layouts/MainLayout";
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Form from "@/components/templates/contact-us/Form";
import Information from "@/components/templates/contact-us/Information";
import styles from "@/styles/contact-us.module.css";

const page = async () => {

  return (
    <MainLayout>
      <Breadcrumb route={"تماس با ما"} />
      <div className={styles.container}>
        <div className={styles.contents}>
          <Form />
          <Information />
        </div>
      </div>
    </MainLayout>
  );
};

export default page;
