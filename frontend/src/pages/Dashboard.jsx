import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          productsResponse,
          purchasesResponse,
          salesResponse,
        ] = await Promise.all([
          api.get("products/mine/"),
          api.get("my-purchases/"),
          api.get("sales/"),
        ]);

        setProducts(productsResponse.data);
        setPurchases(purchasesResponse.data);
        setSales(salesResponse.data);
      } catch (error) {
        console.error(
          "Dashboard error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const revenue = sales.reduce(
    (total, sale) =>
      total + Number(sale.price),
    0
  );

  if (loading) {
    return (
      <main className="flex min-h-[calc(100vh-56px)] items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-purple-600">
            Dashboard
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Welcome back, {user}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Here's an overview of your marketplace activity.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Products */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                My Products
              </p>

              <span className="rounded-lg bg-purple-100 px-2.5 py-1.5 text-sm">
                📦
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-900">
              {products.length}
            </p>

            <Link
              to="/my-products"
              className="mt-2 inline-block text-xs font-medium text-purple-600 hover:underline"
            >
              Manage products →
            </Link>

          </div>

          {/* Purchases */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                My Purchases
              </p>

              <span className="rounded-lg bg-blue-100 px-2.5 py-1.5 text-sm">
                🛍️
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-900">
              {purchases.length}
            </p>

            <Link
              to="/my-purchases"
              className="mt-2 inline-block text-xs font-medium text-purple-600 hover:underline"
            >
              View purchases →
            </Link>

          </div>

          {/* Sales */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Sales
              </p>

              <span className="rounded-lg bg-green-100 px-2.5 py-1.5 text-sm">
                📈
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-900">
              {sales.length}
            </p>

            <Link
              to="/sales"
              className="mt-2 inline-block text-xs font-medium text-purple-600 hover:underline"
            >
              View sales →
            </Link>

          </div>

          {/* Revenue */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Revenue
              </p>

              <span className="rounded-lg bg-yellow-100 px-2.5 py-1.5 text-sm">
                💰
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-900">
              ${revenue.toFixed(2)}
            </p>

            <Link
              to="/sales"
              className="mt-2 inline-block text-xs font-medium text-purple-600 hover:underline"
            >
              View earnings →
            </Link>

          </div>

        </div>

        {/* Quick actions */}
        <section className="mt-8">

          <h2 className="text-lg font-semibold text-gray-900">
            Quick Actions
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <Link
              to="/create-product"
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md"
            >
              <span className="text-2xl">➕</span>

              <h3 className="mt-3 font-semibold text-gray-900">
                Create Product
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Add a new digital product.
              </p>
            </Link>

            <Link
              to="/my-products"
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md"
            >
              <span className="text-2xl">📦</span>

              <h3 className="mt-3 font-semibold text-gray-900">
                My Products
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Manage your products.
              </p>
            </Link>

            <Link
              to="/sales"
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md"
            >
              <span className="text-2xl">📊</span>

              <h3 className="mt-3 font-semibold text-gray-900">
                Sales
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Track your sales and revenue.
              </p>
            </Link>

            <Link
              to="/"
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md"
            >
              <span className="text-2xl">🔎</span>

              <h3 className="mt-3 font-semibold text-gray-900">
                Explore
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Find new digital products.
              </p>
            </Link>

          </div>

        </section>

        {/* Recent activity */}
        <section className="mt-10">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-semibold text-gray-900">
              Recent Sales
            </h2>

            <Link
              to="/sales"
              className="text-sm font-medium text-purple-600 hover:underline"
            >
              View all
            </Link>

          </div>

          {sales.length === 0 ? (
            <div className="mt-4 rounded-xl border border-gray-200 bg-white px-6 py-12 text-center">
              <p className="text-sm text-gray-500">
                No sales yet.
              </p>
            </div>
          ) : (
            <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

              <div className="overflow-x-auto">

                <table className="w-full text-left text-sm">

                  <thead className="border-b border-gray-200 bg-gray-50">
                    <tr>

                      <th className="px-5 py-3 font-semibold text-gray-700">
                        Product
                      </th>

                      <th className="px-5 py-3 font-semibold text-gray-700">
                        Buyer
                      </th>

                      <th className="px-5 py-3 font-semibold text-gray-700">
                        Amount
                      </th>

                      <th className="px-5 py-3 font-semibold text-gray-700">
                        Date
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {sales.slice(0, 5).map((sale) => (
                      <tr
                        key={sale.id}
                        className="border-b border-gray-100 last:border-0"
                      >

                        <td className="px-5 py-4 font-medium text-gray-900">
                          {sale.product_title}
                        </td>

                        <td className="px-5 py-4 text-gray-500">
                          {sale.buyer_name}
                        </td>

                        <td className="px-5 py-4 font-medium text-gray-900">
                          ${sale.price}
                        </td>

                        <td className="px-5 py-4 text-gray-500">
                          {new Date(
                            sale.created_at
                          ).toLocaleDateString()}
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>
            </div>
          )}

        </section>

      </div>
    </main>
  );
}

export default Dashboard;