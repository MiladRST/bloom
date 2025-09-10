import styles from "@/styles/p-user/wishlist.module.css"
import Product from "@/components/modules/product/Product"
import RemoveFromWishlist from "@/components/templates/product/RemoveFromWishlist";
//
import connectToDB from "@/configs/db";
import wishlistModel from "@/models/Wishlist";
import { authUser } from "@/utils/auth";

const Page = async () => {
    await connectToDB()

    const user = await authUser()

    const wishes = await wishlistModel.find({ user : user._id }).populate('product')
    const parsedWishes = JSON.parse(JSON.stringify(wishes))

    console.log('wishes =>', wishes);
    
    return (
        <>

            <main>
                <h1 className={styles.title}>
                    <span>علاقه مندی ها</span>
                </h1>
                 <div className={styles.container}>
                    {parsedWishes.length &&
                        parsedWishes.map((wish) => (
                            <div className={styles.wrapper}>
                                <Product
                                    key={wish._id}
                                    {...wish.product}
                                />
                                <RemoveFromWishlist 
                                productID={JSON.parse(JSON.stringify(wish.product._id))} 
                                userID={JSON.parse(JSON.stringify(user._id))} 
                                title={wish.product.name}
                                />
                                
                            </div>
                        ))}
                    </div>

                    {parsedWishes.length === 0 && (
                    <p className={styles.empty}>محصولی وجود ندارد</p>
                    )}
                
            </main>
           
        </>
    );
}

export default Page;
