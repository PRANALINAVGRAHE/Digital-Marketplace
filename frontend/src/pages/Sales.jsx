import { useEffect, useState } from "react";

import api from "../services/api";

function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await api.get(
          "sales/"
        );

        setSales(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const totalRevenue = sales.reduce(
    (total, sale) =>
      total + Number(sale.price),
    0
  );

  if (loading) {
    return (
      <main className="p-10 text-center text-gray-500">
        Loading sales...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10">

      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Sales
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Track purchases made by customers.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2">

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Sales
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {sales.length}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Revenue
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              ${totalRevenue.toFixed(2)}
            </p>
          </div>

        </div>

        {sales.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-20 text-center">
            <h2 className="font-semibold text-gray-900">
              No sales yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Your sales will appear here when customers purchase your products.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full text-left text-sm">

                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 font-semibold text-gray-700">
                      Product
                    </th>

                    <th className="px-5 py-4 font-semibold text-gray-700">
                      Buyer
                    </th>

                    <th className="px-5 py-4 font-semibold text-gray-700">
                      Price
                    </th>

                    <th className="px-5 py-4 font-semibold text-gray-700">
                      Status
                    </th>

                    <th className="px-5 py-4 font-semibold text-gray-700">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {sales.map((sale) => (
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

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                          {sale.status}
                        </span>
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

      </div>
    </main>
  );
}

export default Sales;