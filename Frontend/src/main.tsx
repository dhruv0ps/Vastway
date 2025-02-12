import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'mobx-react';
import { authStore } from './store/authStore.ts';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Home from './layout/Home.tsx';
import Dashboard from './features/Dashboard/Dashboard.tsx';
import { ToastContainer } from 'react-toastify';
import DrawForm from './features/Draw/DrawForm.tsx';
import CanindianDraws from './features/UserSide/DrawView.tsx';
import CategoryManager from './features/Draw/CategoryManage.tsx';
import DrawDetailsPage from './features/UserSide/DrawDetails.tsx';
import UserHome from './layout/User/UserHome.tsx';
import ViewDraw from './features/UserSide/ViewDraw.tsx';
import DrawList from './features/Draw/DrawList.tsx';
import { ImageGallery } from './features/Gallery/imageGallery.tsx';
import NocCodeForm from './features/Draw/NoccodeFrom.tsx';
import NocCodeList from './features/Draw/NocCodeList.tsx';
import LeadCategoryList from './features/Leads/LeadCategoryList.tsx';
import LeadForm from './features/Leads/leadfrom.tsx';
import LeadList from './features/Leads/LeadList.tsx';
import HomePage from './features/UserSide/Homepage.tsx';
// import Crscalculator from './features/UserSide/Home/CRS calculator/Crscalculator.tsx';
import Crscalculator from './features/UserSide/Home/CRS calculator/crscalculator.tsx'
const stores = { authStore };
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Home />, // Use MainLayout for routes that need the sidebar
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/draw/add",
        element: <DrawForm />,
      },
      {
        path: "/admin/draw/add/:id",
        element: <DrawForm />,
      },
      {
        path:"/admin/category",
        element:<CategoryManager/>
      },
      {
        path:"/admin/drawlist",
        element:<DrawList/>
      },{
        path:"/admin/gallery",
        element:<ImageGallery/>
      },{
        path:"/admin/noccode",
        element:<NocCodeForm/>
      },{
        path:"/admin/noccode/list",
        element:<NocCodeList/>
      },{
        path:"/admin/lead-category",
        element:<LeadCategoryList/>
      },{
        path:"/admin/lead-form",
        element:<LeadForm/>
      },
      {
        path:"/admin/lead-form/:id",
        element:<LeadForm/>
      },
      {
        path:"/admin/lead-list",
        element:<LeadList/>
      },
     
    ]
  },
  //NO sidebar or navbar pages
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  {
    path: "/",
    element: <UserHome />,
    children: [
      // {
      //   path:"/view"
      // }
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/view/:linkEdit",
        element: <DrawDetailsPage />,
      },
      {
        path: "/view/page",
        element: <ViewDraw />,
      },
      {
        path:"/view/list",
        element:<CanindianDraws/>
      },{
        path:"/crscalculator",
        element : <Crscalculator/>
      }

    ]
    }
  
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider {...stores}>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router} />
      </DndProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </Provider>
  </React.StrictMode>,

)
