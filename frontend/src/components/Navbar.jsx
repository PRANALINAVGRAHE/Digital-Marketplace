import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">

        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-gray-900"
        >
          <span className="text-xl">🛒</span>

          <span>
            Digital<span className="text-purple-600">Market</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-5 md:flex">

          <Link
            to="/"
            className="text-sm font-medium text-gray-600 hover:text-purple-600"
          >
            Explore
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-gray-600 hover:text-purple-600"
              >
                Dashboard
              </Link>

              <Link
                to="/sales"
                className="text-sm font-medium text-gray-600 hover:text-purple-600"
              >
                Sales
              </Link>

              <Link
                to="/my-purchases"
                className="text-sm font-medium text-gray-600 hover:text-purple-600"
              >
                My Purchases
              </Link>

              <Link
                to="/my-products"
                className="text-sm font-medium text-gray-600 hover:text-purple-600"
                >
                My Products
              </Link>

              <Link
                to="/create-product"
                className="rounded-md bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-700"
              >
                Create Product
              </Link>

            </>
          )}

        </nav>

        {/* Account */}
        <div className="flex items-center gap-3">

          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-gray-500 sm:block">
                {user}
              </span>

              <button
                onClick={logout}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-md bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-700"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>

      </div>
    </header>
  );
}

export default Navbar;