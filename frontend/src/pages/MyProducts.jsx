import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


import api from "../services/api";

import { getImageUrl } from "../utils/imageUrl";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");
    

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(
          "products/mine/"
        );

        setProducts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

    const handleDelete = async (productId) => {
    const confirmed = window.confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
        return;
    }

    try {
        setDeleting(productId);
        setError("");

        await api.delete(`products/${productId}/`);

        setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== productId)
        );
    } catch (err) {
        console.error(err);
        setError("Failed to delete product.");
    } finally {
        setDeleting(null);
    }
    };

  if (loading) {
    return (
      <main className="p-10 text-center text-gray-500">
        Loading your products...
      </main>
    );
  }



  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Products
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage the digital products you've created.
            </p>
          </div>

          <Link
            to="/create-product"
            className="rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-purple-700"
          >
            + Create Product
          </Link>

        </div>

        {products.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-20 text-center">

            <h2 className="text-lg font-semibold text-gray-900">
              You haven't created any products yet.
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Create your first digital product and start selling.
            </p>

            <Link
              to="/create-product"
              className="mt-5 inline-block rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-700"
            >
              Create Your First Product
            </Link>

          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {products.map((product) => {

              const imageUrl = product.image
                ? getImageUrl(product.image)
                : null;

              return (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                >

                  <div className="h-44 bg-gray-100">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="p-4">

                    <div className="flex items-start justify-between gap-3">

                      <h2 className="font-semibold text-gray-900">
                        {product.title}
                      </h2>

                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          product.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {product.is_active
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </div>

                    <p className="mt-2 text-lg font-bold text-gray-900">
                      ${product.price}
                    </p>

                    <Link
                        to={`/products/${product.id}`}
                        className="mt-4 block rounded-lg bg-gray-900 py-2 text-center text-sm font-medium text-white"
                        >
                        View Product
                    </Link>

                    <Link
                        to={`/products/${product.id}/edit`}
                        className="mt-2 block rounded-lg bg-purple-600 py-2 text-center text-sm font-medium text-white hover:bg-purple-700"
                        >
                        Edit Product
                    </Link>

                    <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deleting === product.id}
                        className="mt-2 w-full rounded-lg bg-red-600 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                        {deleting === product.id ? "Deleting..." : "Delete Product"}
                    </button>

                  </div>
                </div>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}

export default MyProducts;