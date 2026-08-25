import { getProduct } from "@/app/prisma-db";
import EditProductForm from "./product-edit-form";
import { Product } from "@/generated/prisma/client";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    notFound();
  }

  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return <EditProductForm product={product} />;
}
