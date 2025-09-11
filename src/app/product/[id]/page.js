import MainLayout from "@/components/layouts/MainLayout";
import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";

//
import connectToDB from "@/configs/db";
import productModel from "@/models/Product"
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";
import { authUser } from "@/utils/auth";

const product = async ({params}) => {
  const { id } = await params;
  if(!isValidObjectId(id)) {
    return redirect('/not-found')
  }
  
  await connectToDB()

  const product = await productModel.findOne({ _id : id}).populate('comments')
  if(!product) { 
    redirect('/not-found')
  }

  const products = await productModel.find({ _id: { $ne: id } }).limit(8)

  const user = await authUser() 

  return (
    <MainLayout>
      <div className={styles.container}>
        <div data-aos="fade-up" className={styles.contents}>
          <div className={styles.main}>
            <Details product={JSON.parse(JSON.stringify(product))} />
            <Gallery />
          </div>
          <Tabs product={JSON.parse(JSON.stringify(product))} user={JSON.parse(JSON.stringify(user))}/>
          <MoreProducts products={JSON.parse(JSON.stringify(products))}/>
        </div>
      </div>
    </MainLayout>
  );
};

export default product;
