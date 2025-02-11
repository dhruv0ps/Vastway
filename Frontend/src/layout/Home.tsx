import { Outlet } from 'react-router-dom';
import NavSideBar from './Sidebar';
import NavBar from './Nav';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';


const Home = observer(() => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }


  // if (authStore.loading)
  //   return <Loading />

  return (
    <>
    
      <div className='flex-1 relative z-10'>
        <NavBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>
      <div className='flex items-start relative overflow-hidden sm:overflow-auto'>

        <NavSideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} user={"user"} />
        <div className='relative flex-1 h-[calc(100vh-5rem)] overflow-auto pt-5'>
          <div className='flex items-center sticky z-20 top-0'>
            {/* {!isSidebarOpen && <div className="p-2 text-xl cursor-pointer">
              <MdMenu onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            </div>} */}

          </div>
          <Outlet />
        </div>
        
      </div>

    </>
  )
})

export default Home