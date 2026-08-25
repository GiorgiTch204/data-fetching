import { addProduct } from "../prisma-db";
import { redirect } from "next/navigation";

export default function AddProductPage() {
  async function createProduct(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;

    const priceValue = parseInt(price, 10);
    if (!title || isNaN(priceValue)) {
      throw new Error("Title and a valid price are required.");
    }

    await addProduct(title, priceValue, description);
    redirect("/products-db");
  }

  return (
    <form action={createProduct} className="p-4 space-y-4 max-w-96">
      <label className="text-black">
        Title
        <input
          type="text"
          className="block w-full p-2 text-black border rounded"
          name="title"
        />
      </label>

      <label className="text-black">
        Price
        <input
          type="number"
          className="block w-full p-2 text-black border rounded"
          name="price"
        />
      </label>

      <label className="text-black">
        Description
        <textarea
          name="description"
          className="block w-full p-2 text-black border rounded"
        ></textarea>
      </label>

      <button
        type="submit"
        className="block w-full p-2 text-white bg-blue-500 rounded disabled:bg-gray-400"
      >
        Add Product
      </button>
    </form>
  );
}