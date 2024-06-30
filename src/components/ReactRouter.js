import { Navigate, createBrowserRouter } from "react-router-dom";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import OtpVerification from "./Auth/OtpVerification";
import AuthProtectedRoute from "../protectedRoutes/AuthProtectedRoute";
import VerificationProtectedRoute from "../protectedRoutes/VerificationProtectedRoute";
import AuthorizationProtectedRoute from "../protectedRoutes/AuthorizationProtectedRoute";
import ProfileSettings from "../pages/ProfileSettings";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import BuyerEntryPage from "../pages/BuyerEntryPage";
import BuyerPage from "../pages/BuyerPage";
import AdminPage from "../pages/AdminPage";
import SellerPage from "../pages/SellerPage";
import HomePageProtectedRoute from "../protectedRoutes/HomePageProtectedRoute";
import Contact from "../pages/Contact";
import ProductCompleteDetails from "./products/ProductCompleteDetails";

const ReactRouter = ({ RenderLayout }) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RenderLayout />,
      children: [
        {
          path: "auth",
          element: (
            <AuthProtectedRoute>
              <Auth />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "verify-otp",
          element: (
            <VerificationProtectedRoute>
              <OtpVerification />
            </VerificationProtectedRoute>
          ),
        },
        {
          path: "home",
          element: (
            <AuthorizationProtectedRoute>
              <Home />
            </AuthorizationProtectedRoute>
          ),
          children: [
            {
              path: "",
              element: (
                <HomePageProtectedRoute>
                  <BuyerEntryPage />
                </HomePageProtectedRoute>
              ),
            },
            {
              path: "products",
              element: (
                <HomePageProtectedRoute>
                  <BuyerPage />
                </HomePageProtectedRoute>
              ),
            },
            {
              path: "product_details/:product_id",
              element: (
                <HomePageProtectedRoute>
                  <ProductCompleteDetails />
                </HomePageProtectedRoute>
              ),
            },
            {
              path: "admin",
              element: (
                <HomePageProtectedRoute>
                  <AdminPage />
                </HomePageProtectedRoute>
              ),
            },
            {
              path: "seller",
              element: (
                <HomePageProtectedRoute>
                  <SellerPage />
                </HomePageProtectedRoute>
              ),
            },
            {
              path: "*",
              element: <Navigate to="/home/products" />,
            },
          ],
        },
        {
          path: "settings",
          element: (
            <AuthorizationProtectedRoute>
              <ProfileSettings />
            </AuthorizationProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <AuthorizationProtectedRoute>
              <Cart />
            </AuthorizationProtectedRoute>
          ),
        },
        {
          path: "orders",
          element: (
            <AuthorizationProtectedRoute>
              <Orders />
            </AuthorizationProtectedRoute>
          ),
        },
        {
          path: "contact",
          element: (
            <AuthorizationProtectedRoute>
              <Contact />
            </AuthorizationProtectedRoute>
          ),
        },
        {
          path: "*",
          element: <Navigate to="/home" />,
        },
      ],
    },
  ]);
  return router;
};

export default ReactRouter;
