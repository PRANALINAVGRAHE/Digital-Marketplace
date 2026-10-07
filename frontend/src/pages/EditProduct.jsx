import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import api from "../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    is_active: true,
  });

  const [image, setImage] = useState(null);
  const [digitalFile, setDigitalFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(
          `products/${id}/`
        );

        const product = response.data;

        setFormData({
          title: product.title,
          description: product.description,
          price: product.price,
          is_active: product.is_active,
        });
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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const data = new FormData();

      data.append("title", formData.title);
      data.append(
        "description",
        formData.description
      );
      data.append("price", formData.price);
      data.append(
        "is_active",
        formData.is_active
      );

      if (image) {
        data.append("image", image);
      }

      if (digitalFile) {
        data.append(
          "digital_file",
          digitalFile
        );
      }

      await api.patch(
        `products/${id}/`,
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      navigate("/my-products");
    } catch (err) {
      console.error(err);

      setError(
        "Unable to update the product."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="p-10 text-center text-gray-500">
        Loading product...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10">

      <div className="mx-auto max-w-3xl">

        <div className="mb-7">
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Product
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Update your product information.
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

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
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Replace image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setImage(
                    event.target.files[0]
                  )
                }
                className="block w-full rounded-lg border border-gray-300 bg-white text-sm"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Replace digital file
              </label>

              <input
                type="file"
                onChange={(event) =>
                  setDigitalFile(
                    event.target.files[0]
                  )
                }
                className="block w-full rounded-lg border border-gray-300 bg-white text-sm"
              />
            </div>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4"
              />

              <span className="text-sm text-gray-700">
                Product is active
              </span>
            </label>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-purple-600 py-3 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </form>

        </div>

      </div>
    </main>
  );
}

export default EditProduct;