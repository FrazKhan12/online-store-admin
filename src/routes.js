import React from "react";

// Admin Imports
import Profile from "views/admin/profile";
import Users from "views/admin/users";
import Categories from "views/admin/categories";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdPeople,
} from "react-icons/md";
import ProtectedRoute from "components/auth/ProtectedRoute";
import PublicRoute from "components/auth/PublicRoute";
import Dashboard from "views/admin/dashboard";
import Products from "views/admin/products";
import AdminUsers from "views/admin/adminUsers";
import Roles from "views/admin/roles";
import AddNewRole from "views/admin/roles/components/AddNewRole";
import AddAdminUser from "views/admin/adminUsers/components/AddAdminUser";
import EditRole from "views/admin/roles/components/EditRole";
import EditAdminUser from "views/admin/adminUsers/components/EditAdminUser";
import EditProducts from "views/admin/products/components/EditProducts";
import AddProduct from "views/admin/products/components/AddProduct";
import AddCategory from "views/admin/categories/components/AddCategory";
import EditCategory from "views/admin/categories/components/EditCategory";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    showInSidebar: true,
  },

  // Admin User Route
  {
    name: "Admin Users",
    layout: "/admin",
    path: "admin-user",
    icon: <MdPeople className="h-6 w-6" />,
    component: (
      <ProtectedRoute>
        <AdminUsers />
      </ProtectedRoute>
    ),
    showInSidebar: true,
  },
  {
    name: "Add Admin Users",
    layout: "/admin",
    path: "admin-user/add",
    icon: <MdPeople className="h-6 w-6" />,
    component: (
      <ProtectedRoute>
        <AddAdminUser />
      </ProtectedRoute>
    ),
    showInSidebar: false,
  },
  {
    name: "Edit Admin Users",
    layout: "/admin",
    path: "admin-user/edit/:id",
    icon: <MdPeople className="h-6 w-6" />,
    component: (
      <ProtectedRoute>
        <EditAdminUser />
      </ProtectedRoute>
    ),
    showInSidebar: false,
  },

  // Roles ROutes
  {
    name: "Roles",
    layout: "/admin",
    path: "roles",
    icon: <MdLock className="h-6 w-6" />,
    component: (
      <ProtectedRoute>
        <Roles />
      </ProtectedRoute>
    ),
    showInSidebar: true,
  },
  {
    name: "Roles",
    layout: "/admin",
    path: "roles/add-role",
    icon: <MdLock className="h-6 w-6" />,
    component: (
      <ProtectedRoute>
        <AddNewRole />
      </ProtectedRoute>
    ),
    showInSidebar: false,
  },
  {
    name: "Roles",
    layout: "/admin",
    path: "roles/edit-role/:id",
    icon: <MdLock className="h-6 w-6" />,
    component: (
      <ProtectedRoute>
        <EditRole />
      </ProtectedRoute>
    ),
    showInSidebar: false,
  },

  // Products ROutes
  {
    name: "Products",
    layout: "/admin",
    path: "products",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: (
      <ProtectedRoute>
        <Products />
      </ProtectedRoute>
    ),
    showInSidebar: true,
  },
  {
    name: "Add Product",
    layout: "/admin",
    path: "products/add",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: (
      <ProtectedRoute>
        <AddProduct />
      </ProtectedRoute>
    ),
    showInSidebar: false,
  },
  {
    name: "Edit Products",
    layout: "/admin",
    path: "products/edit/:id",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: (
      <ProtectedRoute>
        <EditProducts />
      </ProtectedRoute>
    ),
    showInSidebar: false,
  },

  // User Routes
  {
    name: "Users",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "users",
    component: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
    showInSidebar: true,
  },

  // Categories Routes
  {
    name: "Categories",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "categories",
    component: (
      <ProtectedRoute>
        <Categories />
      </ProtectedRoute>
    ),
    showInSidebar: true,
  },

  {
    name: "Add Category",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "categories/add",
    component: (
      <ProtectedRoute>
        <AddCategory />
      </ProtectedRoute>
    ),
    showInSidebar: false,
  },
  {
    name: "Add Category",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "categories/edit/:id",
    component: (
      <ProtectedRoute>
        <EditCategory />
      </ProtectedRoute>
    ),
    showInSidebar: false,
  },

  // Profile ROute
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
    showInSidebar: false,
  },

  // Auth Routes
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: (
      <PublicRoute>
        {" "}
        <SignIn />
      </PublicRoute>
    ),
    showInSidebar: false,
  },
];
export default routes;
