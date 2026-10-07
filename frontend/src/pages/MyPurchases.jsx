import { useEffect, useState } from "react";

import api from "../services/api";

function MyPurchases() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);
  const [error, setError] = useState("");
  

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await api.get(
          "my-purchases/"
        );

        setOrders(response.data);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load your purchases."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const handleDownload = async (orderId, productTitle) => {
  try {
    setDownloading(orderId);
    setError("");

    const response = await api.get(
      `orders/${orderId}/download/`,
      {
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = productTitle || "download";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
    setError("Unable to download the product.");
  } finally {
    setDownloading(null);
  }
};

  if (loading) {
    return (
      <main className="p-10 text-center text-gray-500">
        Loading your purchases...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10">

      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Purchases
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Access the digital products you've purchased.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-20 text-center">

            <h2 className="text-lg font-semibold text-gray-900">
              No purchases yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Products you purchase will appear here.
            </p>

          </div>
        ) : (
          <div className="space-y-4">

            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col justify-between gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
              >

                <div>

                  <h2 className="font-semibold text-gray-900">
                    {order.product_title}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Purchased on{" "}
                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    ${order.price}
                  </p>

                </div>

                <button
                  onClick={() => handleDownload(order.id, order.product_title)}

                  disabled={
                    downloading === order.id
                  }
                  className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-60"
                >
                  {downloading === order.id
                    ? "Downloading..."
                    : "Download"}
                </button>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}

export default MyPurchases;