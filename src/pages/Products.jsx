import { useGetAllProducts } from "../hooks/useGetAllProducts";

const Products = () => {
  const { data } = useGetAllProducts();

  return (
    <div className="w-full overflow-x-auto max-container">
      <h2 className="text-3xl font-semibold">Products</h2>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse border border-gray-200 text-left bg-white text-gray-900">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Product Name</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Stock</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.products.map((product) => (
              <tr key={product._id} className="border hover:bg-gray-50">
                <td className="p-3 border font-medium">{product.name}</td>
                <td className="p-3 border capitalize">
                  {product.category.name}
                </td>
                <td className="p-3 font-medium text-green-600 border">
                  R{product.price}
                </td>
                <td className="p-3 border">{product.stock}</td>
                <td className="flex gap-2 p-3 border">
                  <button className="py-1 px-2 text-[13px] text-white rounded-md bg-gray-900 hover:bg-gray-800">
                    Edit
                  </button>
                  <button className="py-1 px-2 text-[13px] text-white rounded-md bg-red-600 hover:bg-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
