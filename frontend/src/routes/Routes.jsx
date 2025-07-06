import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signUp/SignUp";
import DashboardLayout from "../layout/DashboardLayout";
import Statistics from "../pages/Dashboard/Common/Statistics";
import Payment from "../pages/Payment/Payment";
import PrivetRoute from "./PrivetRoute";
import AdminRoute from "./AdminRoute";
import PostCategory from "../pages/Dashboard/Admin/PostCategory";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AddDeviceEmail from "../pages/Dashboard/User/AddDeviceEmail/AddDeviceEmail";
import ChannelAndEvents from "../pages/Dashboard/Admin/ChannelAndEvents";

import Profile from "../pages/Dashboard/Common/Profile";
import RemoveDeviceEmail from "../pages/Dashboard/User/RemoveDeviceEmail/RemoveDeviceEmail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivetRoute>
            <DashboardLayout />
          </PrivetRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivetRoute>
                <AdminRoute>
                  <Statistics />
                </AdminRoute>
              </PrivetRoute>
            ),
          },
          {
            path: "post-category",
            element: (
              <PrivetRoute>
                <AdminRoute>
                  <PostCategory />
                </AdminRoute>
              </PrivetRoute>
            ),
          },
          {
            path: "all-category",
            element: (
              <PrivetRoute>
                <AdminRoute>
                  <ChannelAndEvents />
                </AdminRoute>
              </PrivetRoute>
            ),
          },
          {
            path: "manage-users",
            element: (
              <PrivetRoute>
                <AdminRoute>
                  <ManageUsers />
                </AdminRoute>
              </PrivetRoute>
            ),
          },
          {
            path: "add-device",
            element: (
              <PrivetRoute>
                <AddDeviceEmail />
              </PrivetRoute>
            ),
          },
          {
            path: "remove-device",
            element: (
              <PrivetRoute>
                <RemoveDeviceEmail />
              </PrivetRoute>
            ),
          },
          {
            path: "profile",
            element: (
              <PrivetRoute>
                <Profile />
              </PrivetRoute>
            ),
          },
        ],
      },
    ],
  },
]);
