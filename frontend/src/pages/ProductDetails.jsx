import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import { getImageUrl } from "../utils/imageUrl";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `products/${id}/`
        );

        setProduct(response.data);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load this product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: `/products/${id}`,
        },
      });

      return;
    }

    try {
      setBuying(true);
      setError("");
      setSuccess("");

      await api.post(
        `products/${id}/purchase/`
      );

      setSuccess(
        "Purchase successful! You can now download this product from My Purchases."
      );
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.detail ||
        "Unable to complete the purchase.";

      setError(message);
    } finally {
      setBuying(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-5 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm text-gray-500">
            Loading product...
          </p>
        </div>
      </main>
    );
  }

  if (error && !product) {
    return (
      <main className="min-h-screen bg-gray-50 px-5 py-20">
        <div className="mx-auto max-w-xl rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <h1 className="text-lg font-semibold text-red-700">
            Product unavailable
          </h1>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <Link
            to="/"
            className="mt-5 inline-block rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white hover:bg-purple-700"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

 const imageUrl = product.image
  ? getImageUrl(product.image)
  : null;

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="mx-auto max-w-6xl px-5 py-8">

        {/* Back */}
        <Link
          to="/"
          className="text-sm font-medium text-gray-500 hover:text-purple-600"
        >
          ← Back to Products
        </Link>

        {/* Product */}
        <div className="mt-6 grid gap-8 lg:grid-cols-2">

          {/* Image */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="aspect-[4/3] bg-gray-100">

              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  No image available
                </div>
              )}
            </div>

          </div>

          {/* Information */}
          <div className="rounded-xl border border-gray-200 bg-white p-7 shadow-sm">

            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600">
              Digital Product
            </span>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              {product.title}
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              Created by{" "}
              <span className="font-medium text-gray-700">
                {product.seller_name}
              </span>
            </p>

            <div className="my-6 border-t border-gray-100" />

            <div>
              <p className="text-sm font-medium text-gray-500">
                Price
              </p>

              <p className="mt-1 text-3xl font-bold text-gray-900">
                ${product.price}
              </p>
            </div>

            {/* Messages */}
            {error && (
              <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {/* Buy */}
            {!success && (
              <button
                onClick={handlePurchase}
                disabled={buying}
                className="mt-6 w-full rounded-lg bg-purple-600 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {buying
                  ? "Processing..."
                  : "Buy Now"}
              </button>
            )}

            {success && (
              <Link
                to="/my-purchases"
                className="mt-6 block w-full rounded-lg bg-purple-600 py-3 text-center text-sm font-semibold text-white hover:bg-purple-700"
              >
                Go to My Purchases
              </Link>
            )}

            <p className="mt-3 text-center text-xs text-gray-400">
              Instant access after purchase
            </p>

          </div>
        </div>

        {/* Description */}
        <section className="mt-8 rounded-xl border border-gray-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-semibold text-gray-900">
            About this product
          </h2>

          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-600">
            {product.description}
          </p>

        </section>

      </div>

    </main>
  );
}

export default ProductDetails;