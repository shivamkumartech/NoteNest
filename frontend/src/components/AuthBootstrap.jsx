import { memo, useContext, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import router from "../router.jsx";

export const AuthBootstrap = memo(function AuthBootstrap() {
  const { authStatus } = useContext(AuthContext);

  if (authStatus === "checking") {
    return <LoadingSpinner />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
});

AuthBootstrap.displayName = "AuthBootstrap";