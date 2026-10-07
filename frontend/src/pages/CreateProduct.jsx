import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function CreateProduct() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    is_active: true,
  });

  const [image, setImage] = useState(null);
  const [digitalFile, setDigitalFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-[calc(100vh-56px)] items-center justify-center px-5">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Login required
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            You need to login before creating a product.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-5 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-700"
          >
            Login
          </button>
        </div>
      </main>
    );
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("is_active", formData.is_active);

      if (image) {
        data.append("image", image);
      }

      if (digitalFile) {
        data.append("digital_file", digitalFile);
      }

      await api.post(
        "products/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/my-products");
    } catch (err) {
      console.error(err);

      const data = err.response?.data;

      if (data) {
        const firstError = Object.values(data)
          .flat()
          .find(Boolean);

        setError(
          firstError ||
            "Unable to create the product."
        );
      } else {
        setError(
          "Unable to create the product."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10">

      <div className="mx-auto max-w-3xl">

        <div className="mb-7">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Product
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Upload and sell your digital product.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-7 shadow-sm">

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Product title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. YouTube Thumbnail Bundle"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Describe what the customer will receive..."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-8 pr-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Product image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setImage(event.target.files[0])
                }
                className="block w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-500 file:mr-4 file:border-0 file:bg-gray-100 file:px-4 file:py-2.5 file:text-sm file:font-medium"
              />

              <p className="mt-1 text-xs text-gray-400">
                JPG, PNG or WEBP recommended.
              </p>
            </div>

            {/* Digital file */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Digital file
              </label>

              <input
                type="file"
                onChange={(event) =>
                  setDigitalFile(event.target.files[0])
                }
                className="block w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-500 file:mr-4 file:border-0 file:bg-gray-100 file:px-4 file:py-2.5 file:text-sm file:font-medium"
              />

              <p className="mt-1 text-xs text-gray-400">
                This is the file customers receive after purchasing.
              </p>
            </div>

            {/* Active */}
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-purple-600"
              />

              <span className="text-sm text-gray-700">
                Publish this product immediately
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-purple-600 py-3 text-sm font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating product..."
                : "Create Product"}
            </button>

          </form>

        </div>
      </div>

    </main>
  );
}

export default CreateProduct;