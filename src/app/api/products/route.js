import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  console.log('create product');
  
  try {
    await connectToDB();
    const formData = await req.formData();
    const name = formData.get("name");
    const price = formData.get("price");
    const shortDescription = formData.get("shortDescription");
    const longDescription = formData.get("longDescription");
    const weight = formData.get("weight");
    const suitableFor = formData.get("suitableFor");
    const smell = formData.get("smell");
    const tags = formData.get("tags").split("،");
    const img = formData.get("img");


    const arrayBuffer = await img.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer);
    const filename = Date.now() + img.name;
    const imgPath = path.join(process.cwd(), "public/uploads/" + filename);

    await writeFile(imgPath, buffer);

    const product = await ProductModel.create({
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
      img: `http://localhost:3000/uploads/${filename}`,
    });

    return Response.json(
      { message: "Product created successfully :))", data: product },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    
    return Response.json({ message: err }, { status: 500 });
  }
}

// Image Uploader
export async function PUT(req) {
  const formData = await req.formData();
  const img = formData.get("img");

  // Validation
  if (!img) {
    return Response.json(
      { message: "Product has not image !!" },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(await img.arrayBuffer());
    const filename = Date.now() + img.name;

    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );

    // ✅
    return Response.json(
      { message: "File uploaded successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}

export async function GET() {
  const products = await ProductModel.find({}, "-__v").populate("comments");
  return Response.json(products);
}



//********** what ai suggested **********

// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import Product from "@/models/Product";
// import dbConnect from "@/lib/dbConnect";
// import { authOptions } from "@/lib/auth";
// import { writeFile, mkdir } from "fs/promises";
// import path from "path";

// export async function POST(req: Request) {
//   try {
//     await dbConnect();

//     // ✅ Check admin
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "admin") {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
//     }

//     // ✅ Parse form data
//     const formData = await req.formData();
//     const name = formData.get("name") as string;
//     const description = formData.get("description") as string;
//     const price = Number(formData.get("price"));
//     const stock = Number(formData.get("stock") ?? 0);
//     const category = formData.get("category") as string;
//     const file = formData.get("image") as File | null;

//     if (!name || !price) {
//       return NextResponse.json(
//         { message: "Name and price are required" },
//         { status: 400 }
//       );
//     }

//     let imageUrl = "";
//     if (file) {
//       const buffer = Buffer.from(await file.arrayBuffer());

//       // ✅ Ensure /public/uploads exists
//       const uploadDir = path.join(process.cwd(), "public/uploads");
//       await mkdir(uploadDir, { recursive: true });

//       // ✅ Create unique filename
//       const fileName = `${Date.now()}-${file.name}`;
//       const filePath = path.join(uploadDir, fileName);

//       // ✅ Save file to local filesystem
//       await writeFile(filePath, buffer);

//       // URL to access the file
//       imageUrl = `/uploads/${fileName}`;
//     }

//     // ✅ Save product
//     const product = new Product({
//       name,
//       description,
//       price,
//       stock,
//       category,
//       imageUrl,
//     });

//     await product.save();

//     return NextResponse.json(
//       { message: "Product added successfully", product },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error adding product:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }