import Articles from "@/components/templates/index/articles/Articles";
import Banner from "@/components/templates/index/banner/Banner";
import Latest from "@/components/templates/index/latest/Latest";
import Promote from "@/components/templates/index/promote/Promote";


export default async function Home() {


  return (
    <>
      <Banner />
      <Latest />
      <Promote />
      <Articles />
    </>
  );
}
