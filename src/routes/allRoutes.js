import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import Custmer from "../pages/Custmers/Custmer"
import Collector from "../pages/Collectros/Collector"
import Billing from "../pages/Billing/Billing"
import User from "../pages/Users/User"
import receipt from "../pages/Receipt/receipt"


//sign in
import SignIn from "../pages/Signin/SignIn"





// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Receipt from "pages/Receipt/receipt"

const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/dashboard", component: Dashboard },
  {path:"/custmer",component: Custmer},
  {path:"/Collector",component: Collector},
  {path:"/biling",component: Billing},
  {path:"/User",component: User},
  {path:"/SignIn",component: SignIn},
  {path:"/receipt",component: Receipt},

  // // //profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/login" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { userRoutes, authRoutes }
