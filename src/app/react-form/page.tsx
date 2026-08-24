"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/react-form/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          price: Number(price),
          description,
        }),
      });

      if (response.ok) {
        setTitle("");
        setPrice("");
        setDescription("");
        router.push("/products-db");
      } else {
        setError("Failed to create product.");
      }
    } catch (error) {
      console.error("Error", error);
      setError("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-96">
      <label className="text-black">
        Title
        <input
          type="text"
          value={title}
          className="block w-full p-2 text-black border rounded"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label className="text-black">
        Price
        <input
          type="number"
          value={price}
          className="block w-full p-2 text-black border rounded"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>

      <label className="text-black">
        Description
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full p-2 text-black border rounded"
        ></textarea>
      </label>

      <button
        type="submit"
        className="block w-full p-2 text-white bg-blue-500 rounded disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Submitting..." : "submit"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}