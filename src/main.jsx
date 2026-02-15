import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout} from './components/index.js'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'

const router = createBrowserRouter([{
  path: '/inkwell/',
  element: <App />,
  children: [
    {
      path: '/inkwell/',
      element: <Home />
    },
    {
      path: '/inkwell/login',
      element: <AuthLayout authentication ={false}>
        <Login />
      </AuthLayout>
    },
    {
      path: '/inkwell/signup',
      element: <AuthLayout authentication ={false}>
        <Signup />
      </AuthLayout>
    },
    {
      path: '/inkwell/all-posts',
      element: <AuthLayout authentication>
        {" "}
        <AllPosts />
      </AuthLayout>
    },
    {
      path: '/inkwell/add-post',
      element: <AuthLayout authentication>
        <AddPost />
      </AuthLayout>
    },
    {
      path: '/inkwell/edit-post/:slug',
      element: <AuthLayout authentication>
        <EditPost />
      </AuthLayout>
    },
    {
      path: '/inkwell/post/:slug',
      element: <Post />
    },

  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  </Provider>
)
