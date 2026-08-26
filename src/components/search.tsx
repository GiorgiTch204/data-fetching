import Form from "next/form";

export const Search = () => {
  return (
    <Form
      action="/products-db"
      className="flex gap-2 w-full max-w-xl mx-auto p-2 bg-white rounded-xl shadow-sm border border-gray-200"
    >
      <input
        name="query"
        className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
        placeholder="Search products..."
      />

      <button
        type="submit"
        className="px-5 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors"
      >
        Search
      </button>
    </Form>
  );
};