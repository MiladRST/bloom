import styles from "@/components/templates/p-admin/products/table.module.css";
import Table from "@/components/templates/p-admin/products/Table";
import AddProduct from "@/components/templates/p-admin/products/AddProduct";

import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
const page = async () => {
  connectToDB();
  const products = await ProductModel.find({}).sort({ _id: -1 }).lean();

  return (
    <>
      <main>
        <AddProduct />

        {products.length === 0 ? (
          <p className={styles.empty}>محصولی وجود ندارد</p>
        ) : (
          <Table
            products={JSON.parse(JSON.stringify(products))}
            title="لیست محصولات"
          />
        )}
      </main>
    </>
  );
};

export default page;
