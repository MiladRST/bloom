import "./globals.css";
import { Inter } from "next/font/google";
import AOSInit from "@/utils/aos";
import ScrollToTop from "@/utils/ScrollToTop";
//
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import connectToDB from "@/configs/db";
import UserModel from "@/models/User"
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/dist/client/components/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "صفحه اصلی - SET Coffee | فروشگاه اینترنتی قهوه ست",
  description: "Sabzlearn coffee project with next.js v13",

  icons: {
    icon: "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/36190/coffee-logo-clipart-md.png",
  },
};



export default async function RootLayout({ children }) {

  //
  await connectToDB()
  
  const cookieStore = await cookies()
  
  const token = cookieStore.get('token')
  let user = null 

  if(token) {
    const tokenPayload = verifyAccessToken(token.value)
    if(tokenPayload) {
      user = await UserModel.findOne({
        email: tokenPayload.email
      })
    }
  }

  return (
    <html lang="fa">
      <body className={inter.className}>
        <AOSInit />

        <Navbar isLogin={JSON.parse(JSON.stringify(user))} />
        {children}
        <Footer />

        <ScrollToTop />
      </body>
    </html>
  );
}
