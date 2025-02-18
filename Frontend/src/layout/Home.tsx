import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavSideBar from './Sidebar';
import NavBar from './Nav';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/useStore';
import Loading from '../../src/util/Loading';

const Home = observer(() => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const { authStore } = useStore()
  const navigate = useNavigate()
  const location = useLocation();
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (!token)
      navigate("/admin/login")
    if (window.innerWidth < 700) {
      setIsSidebarOpen(false)
    }
  }, [])

  useEffect(() => {
    if (window.innerWidth < 700) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    authStore.loading ? <Loading /> : <>
      <div className='flex-1 relative z-10'>
        <NavBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>
      <div className='flex items-start relative overflow-hidden sm:overflow-auto'>

        <NavSideBar key={Outlet} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} user={"user"} />
        <div className='relative flex-1 h-[calc(100vh-3rem)] overflow-auto pt-5'>
          <Outlet />
        </div>
      </div>
    </>
  )
})

export default Home