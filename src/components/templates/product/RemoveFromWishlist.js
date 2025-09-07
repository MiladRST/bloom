"use client"

const RemoveFromWishlist = ({ id, title}) => {
    const handleRemove = async () => {
        console.log('removal')
    }
    return (
        <button onClick={handleRemove}>
            حذف
            {title}
            از علاقه مندی ها
        </button>
    );
}

export default RemoveFromWishlist;
