import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/imageUrl";

function ProductCard({ product }) {
  const imageUrl = product.image
    ? getImageUrl(product.image) /* http://127.0.0.1:8000${product.image} */
    : null;

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">

      {/* Product image */}
      <div className="h-44 overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.title}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No image available
          </div>
        )}
      </div>

      {/* Product information */}
      <div className="p-4">

        <p className="text-xs font-medium uppercase tracking-wide text-purple-600">
          Digital Product
        </p>

        <h2 className="mt-1 line-clamp-2 min-h-[48px] text-base font-semibold text-gray-900">
          {product.title}
        </h2>

        <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-gray-500">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>

          <span className="max-w-[100px] truncate text-xs text-gray-400">
            by {product.seller_name}
          </span>
        </div>

        <Link
          to={`/products/${product.id}`}
          className="mt-4 block rounded-lg bg-purple-600 py-2 text-center text-sm font-medium text-white transition hover:bg-purple-700"
        >
          View Details →
        </Link>

        <Link
          to={`/products/${product.id}`}
          className="mt-2 block text-center text-xs text-purple-600 hover:underline"
        >
          Live Preview →
        </Link>

      </div>
    </article>
  );
}

export default ProductCard;