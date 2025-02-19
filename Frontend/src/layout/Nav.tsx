import { Avatar, Dropdown, Navbar } from "flowbite-react";
import {  HiLogout, HiViewGrid } from "react-icons/hi";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/useStore";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

export default observer(function NavBar({ toggleSidebar, isSidebarOpen }: any) {
  const { authStore } = useStore();
  const navigate = useNavigate()
  return (
    <Navbar className="bg-gray-50 drop-shadow-sm" fluid rounded>
      <Navbar.Brand href="/">
        <img src={logo} className="mr-3 ml-2 h-8 sm:h-9" alt="Flowbite React Logo" />
      
      </Navbar.Brand>
      <div className="flex items-center md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-base font-thin">Name</span>
            <span className="block truncate text-sm">email</span>
          </Dropdown.Header>
          <Dropdown.Item href="/" icon={HiViewGrid}>Dashboard</Dropdown.Item>
          {/* <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
          <Dropdown.Item icon={HiCurrencyDollar}>Earnings</Dropdown.Item> */}
          <Dropdown.Divider />
          <Dropdown.Item icon={HiLogout} onClick={async () => {
          await authStore.logout()
             navigate("/admin/login");
          }}>Sign out</Dropdown.Item>
        </Dropdown>
        {isSidebarOpen ? <MdMenuOpen className="text-2xl mx-2 lg:hidden" onClick={() => toggleSidebar()} /> : <MdMenu className="text-2xl mx-2 lg:hidden" onClick={() => toggleSidebar()} />}
      </div>

    </Navbar>
  );
}
)