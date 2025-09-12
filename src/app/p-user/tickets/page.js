import Link from "next/link";

const Page = () => {
    return (
        <main>
            
            <h1 >
                <span>تیکت ها</span>
            </h1>

            <Link href="/p-user/tickets/create">ساخت تیکت جدید</Link>
        </main>
    );
}

export default Page;
