import { useEffect, useState } from "react";

import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Explore() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("-created_at");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("products/", {
        params: {
          search: search || undefined,
          ordering,
        },
      });

      setProducts(response.data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [ordering]);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchProducts();
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10">

          <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">
            Digital Marketplace
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Explore Products
          </h1>

          <p className="mt-2 max-w-2xl text-gray-500">
            Discover templates, resources, graphics, tools and
            other digital products created by independent sellers.
          </p>

        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-5 py-8">

        {/* Search and sorting */}
        <div className="mb-8 flex flex-col gap-3 md:flex-row">

          <form
            onSubmit={handleSearch}
            className="flex flex-1"
          >
            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search products..."
              className="w-full rounded-l-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />

            <button
              type="submit"
              className="rounded-r-lg bg-purple-600 px-5 text-sm font-medium text-white hover:bg-purple-700"
            >
              Search
            </button>
          </form>

          <select
            value={ordering}
            onChange={(event) =>
              setOrdering(event.target.value)
            }
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-500"
          >
            <option value="-created_at">
              Newest
            </option>

            <option value="price">
              Price: Low to High
            </option>

            <option value="-price">
              Price: High to Low
            </option>

            <option value="title">
              Name: A-Z
            </option>
          </select>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="py-20 text-center">
            <p className="text-sm text-gray-500">
              Loading products...
            </p>
          </div>
        ) : products.length === 0 ? (

          /* Empty state */
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-20 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
              🛍️
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              No products found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Try a different search term or check back
              later for new products.
            </p>

          </div>

        ) : (

          /* Product grid */
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default Explore;