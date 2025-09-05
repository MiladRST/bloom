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

const product = async ({params}) => {
  const { id } = await params;
  console.log(id)
  if(!isValidObjectId(id)) {
    return redirect('/not-found')
  }
  
  await connectToDB()

  const product = await productModel.findOne({ _id : id}).populate('comments')
  if(!product) { 
    redirect('/not-found')
  }



  
  return (
    <div className={styles.container}>
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details product={JSON.parse(JSON.stringify(product))} />
          <Gallery />
        </div>
        <Tabs product={JSON.parse(JSON.stringify(product))}/>
        <MoreProducts />
      </div>
    </div>
  );
};

export default product;
