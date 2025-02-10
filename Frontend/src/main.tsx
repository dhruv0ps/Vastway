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

const stores = { authStore };
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Use MainLayout for routes that need the sidebar
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/draw/add",
        element: <DrawForm />,
      },
      {
        path: "/draw/add/:id",
        element: <DrawForm />,
      },
      {
        path:"/category",
        element:<CategoryManager/>
      },
      {
        path:"/drawlist",
        element:<DrawList/>
      },{
        path:"/gallery",
        element:<ImageGallery/>
      },{
        path:"/noccode",
        element:<NocCodeForm/>
      },{
        path:"/noccode/list",
        element:<NocCodeList/>
      },{
        path:"/lead-category",
        element:<LeadCategoryList/>
      },{
        path:"/lead-form",
        element:<LeadForm/>
      },
      {
        path:"/lead-form/:id",
        element:<LeadForm/>
      },
      {
        path:"/lead-list",
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
    path: "/view",
    element: <UserHome />,
    children: [
      {
        path: "/view",
        element: <DrawDetailsPage />,
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
