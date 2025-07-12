import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes";
import AuthProvider from "./provider/AuthProvider";
import { Provider } from "react-redux";
import store from "./utils/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";


// Create a client
const queryClient = new QueryClient();

// Disable React DevTools in production
if (import.meta.env.VITE_NODE_ENV === "production") {
  disableReactDevTools();

  // Additional production-only protections
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.addEventListener("keydown", (e) => {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
      e.preventDefault();
    }
  });
}



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
