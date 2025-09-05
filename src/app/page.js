import Articles from "@/components/templates/index/articles/Articles";
import Banner from "@/components/templates/index/banner/Banner";
import Latest from "@/components/templates/index/latest/Latest";
import Promote from "@/components/templates/index/promote/Promote";

//
import connectToDB from "@/configs/db";
import productModel from "@/models/Product";

export default async function Home() {

  await connectToDB();

  const products = await productModel.find({})

  return (
    <>
      <Banner />
      <Latest products={JSON.parse(JSON.stringify(products))} />
      <Promote />
      <Articles />
    </>
  );
}
