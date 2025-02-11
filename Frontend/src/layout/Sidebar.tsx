import { Sidebar } from "flowbite-react";
import { BiBarChart, BiBuoy } from "react-icons/bi";
import { BsFillClipboard2CheckFill } from "react-icons/bs";
import { FaRoute, FaShop, FaUser,  FaMoneyBills, FaUpload } from "react-icons/fa6";
import { HiChartPie, HiOutlineMinusSm, HiOutlinePlusSm, HiShoppingBag } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { useStore } from "../store/useStore";
import {  MdSupportAgent } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import showConfirmationModal from "../util/Confirmation";
import React, { useState } from "react";


const ColoredBiBoy = () => <BiBuoy className="text-yellow-400 text-2xl" />

const NavSideBar = ({ isSidebarOpen, onSidebarClose }: any) => {
    const { authStore } = useStore();
    const permissions = authStore?.user?.permissions || [];
    const isAdmin = permissions.includes("Admin")
    const hasPermission = (perm: string) => {
        return isAdmin || permissions.includes(perm)
    };
    const sendEmail = async () => {
        const confirmed = await showConfirmationModal("Any email without a screenshot(s) of the problem(s) and a clear written description will not be taken into account. Are you sure you would like to proceed?")
        if (!confirmed)
            return
        const subject = 'Support | <your issue here>';
        const sendto = 'support@theitcart.com'
        window.location.href = `mailto:${sendto}?&subject=${subject}`;
    }

    const handleItemClick = () => {

        if (window.innerWidth < 768) {
            onSidebarClose();
        }
    };
    const [expandedSections, setExpandedSections] = useState<string[]>([]);

    const toggleSection = (sectionName: string) => {
        setExpandedSections(prev =>
            prev.includes(sectionName)
                ? prev.filter(name => name !== sectionName)
                : [...prev, sectionName]
        );
    };
    // Modified Collapse component with controlled open state
    const CustomCollapse = ({ id, icon: Icon, label, children }: any) => {
        const isOpen = expandedSections.includes(id);

        return (
            <Sidebar.Collapse
                icon={Icon}
                label={label}
                open={isOpen}
                onClick={() => toggleSection(id)}
                renderChevronIcon={(theme, open) => {
                    const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
                    return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
                }}
            >
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && child.type === Link) {

                        return React.cloneElement(child as React.ReactElement<{ onClick?: () => void }>, {
                            onClick: handleItemClick,
                        });
                    }
                    return child;
                })}



            </Sidebar.Collapse>
        );
    };




    const SupplierSection = () => {
        const canViewSuppliers = hasPermission('view_supplier');
        const canAddSupplier = hasPermission('add_supplier');
        const canViewSupplyOrders = hasPermission('view_supplyOrder');
        const canEditSupplyOrders = hasPermission('add_supplyOrder') || hasPermission('edit_supplyOrder');


        if (!canViewSuppliers && !canAddSupplier && !canViewSupplyOrders) {
            return null;
        }

        return (
            <CustomCollapse
                id="supplier"
                icon={FaShop}
                label="Suppliers & Locations"
            >
                {canViewSuppliers && <Link to={"/supplier/"}><Sidebar.Item>View Suppliers/Locations</Sidebar.Item></Link>}
                {canViewSupplyOrders && <Link to={"/supplier/orders"}><Sidebar.Item>View Supplier Orders</Sidebar.Item></Link>}
                {canEditSupplyOrders && <Link to={"/supplier/orders/suggest"}><Sidebar.Item>Supplier Order By AI</Sidebar.Item></Link>}
                {canEditSupplyOrders && <Link to={"/supplier/orders/receive"}><Sidebar.Item>Receive Supplier Order</Sidebar.Item></Link>}
                {canViewSupplyOrders && <Link to={"/supplier/orders/receive/view"}><Sidebar.Item>Received Orders List</Sidebar.Item></Link>}
            </CustomCollapse >
        );
    };
    const ProductSection = () => {
        const canViewProduct = hasPermission('view_products');
        const canAccessUtil = hasPermission('product_image/category');
        const canEditAddProduct = hasPermission('edit_products') || hasPermission('add_products');

        if (!canViewProduct && !canEditAddProduct && !canAccessUtil) {
            return null;
        }

        return (
            <CustomCollapse
                id="products"
                icon={HiShoppingBag}
                label="Products"

            >

                {canAccessUtil && <Link to={"/products/categories"}><Sidebar.Item>Product Categories</Sidebar.Item></Link>}
                {canViewProduct && <Link to={"/products/"}><Sidebar.Item>Products View</Sidebar.Item></Link>}
                {canAccessUtil && <Link to={"/products/images"}><Sidebar.Item>Product Images</Sidebar.Item></Link>}
            </CustomCollapse >
        );
    };
    const OrderSection = () => {
    

        return (
            <CustomCollapse
                id="orders"
                icon={BsFillClipboard2CheckFill}
                label="Draws"
            >
                 <Link to={"/admin/draw/add"}><Sidebar.Item>Add Draw</Sidebar.Item></Link>
                 <Link to={"/admin/drawlist"}><Sidebar.Item>Draw List</Sidebar.Item></Link>
                 <Link to={"/admin/category"}><Sidebar.Item>Category Manager</Sidebar.Item></Link>
                 <Link to={"/admin/noccode/list"}><Sidebar.Item>NocCode</Sidebar.Item></Link>
                 
               
            </CustomCollapse >
        );
    };
    const ExpenseSection = () => {
        const canViewOrder = hasPermission('view_expense') || hasPermission('view_expense_segment');
        const canEditAddOrder = hasPermission('edit_expense') || hasPermission('add_expense') || hasPermission('add_expense_segment')

        if (!canViewOrder && !canEditAddOrder) {
            return null;
        }

        return (
            <CustomCollapse
                id="expenses"
                icon={FaMoneyBills}
                label="Expense"
            >
                <Link to={"/expense"}><Sidebar.Item>Expense List</Sidebar.Item></Link>
                {/* <Sidebar.Item href="/expense/add">Add Expense</Sidebar.Item> */}
                <Sidebar.Item href='/expense/category/add' >Add Category</Sidebar.Item>
                {/* <Sidebar.Item href='/expense/report' >Expense Report</Sidebar.Item> */}
            </CustomCollapse >
        );
    };
    const AppointmentSection = () => {
        const canViewAppointment = hasPermission('view_appointment') || hasPermission('view_appointment_segment');
        const canEditAddAppointment = hasPermission('edit_appointment') || hasPermission('add_appointment') || hasPermission('add_appointment_segment');

        if (!canViewAppointment && !canEditAddAppointment) {
            return null;
        }

        return (
            <CustomCollapse
                id="appointments"
                icon={FaCalendarAlt}
                label="Appointments"
            >
                <Link to="/appointments"><Sidebar.Item>Appointment List</Sidebar.Item></Link>
                {/* <Link to="/appointments/add"><Sidebar.Item>Add Appointment</Sidebar.Item></Link> */}
            </CustomCollapse >
        );
    };
    const PaySlipSection = () => {
        const canViewPayslip = hasPermission('payslips');

        if (!canViewPayslip) {
            return null;
        }

        return (
            <CustomCollapse
                id="payroll"
                icon={FaCalendarAlt}
                label="PayRoll"
            >
                <Link to="/payroll/add"><Sidebar.Item>Payroll Generator</Sidebar.Item></Link>
                <Link to="/payslip"><Sidebar.Item>Payslip</Sidebar.Item></Link>
            </CustomCollapse >
        );
    };

    const CustomerSection = () => {
        const canViewCustomer = hasPermission('view_customers');
        const canEditAddCustomer = hasPermission('edit_customers') || hasPermission('add_customers');

        if (!canViewCustomer && !canEditAddCustomer) {
            return null;
        }

        return (
            <CustomCollapse
                id="customers"
                icon={FaUser}
                label="Customers"
            >
                {canViewCustomer && <Link to={"/customers/"}><Sidebar.Item >View Customers</Sidebar.Item></Link>}
                {/* {canEditAddCustomer && <Link to={"/customers/add"}><Sidebar.Item>Add Customer</Sidebar.Item></Link>} */}
            </CustomCollapse >
        );
    };
    const RouteSection = () => {
        const canViewRoutes = hasPermission('view_route') || hasPermission('view_all_routes');
        const canTrackUsers = hasPermission('live_tracking');
        if (!canViewRoutes && !canTrackUsers) {
            return null;
        }

        return (
            <CustomCollapse
                id="routes"
                icon={FaRoute}
                label="Routes"
            >
                {canViewRoutes && <Link to={"/routes/"}><Sidebar.Item >View Routes</Sidebar.Item></Link>}
                {canTrackUsers && <Link to={"/tracking"}><Sidebar.Item >Track Users</Sidebar.Item></Link>}
            </CustomCollapse >
        );
    };
    const TicketSection = () => {
       

        return (
            <CustomCollapse
                id="tickets"
                icon={MdSupportAgent}
                label="Leads"
            >
                  <Link to={"/admin/lead-list"}><Sidebar.Item >Lead List</Sidebar.Item></Link>
                 <Link to={"/admin/lead-form"}><Sidebar.Item >Lead Form</Sidebar.Item></Link>
                 <Link to={"/admin/lead-category"}><Sidebar.Item >LeadCategory</Sidebar.Item></Link>
                {/* {canEditTicket && <Link to={"/tickets/add"}><Sidebar.Item>Create Tickets</Sidebar.Item></Link>} */}
            </CustomCollapse >
        );
    };
    const InventorySection = () => {
       

        return (
            <CustomCollapse
                id="inventory"
                icon={FaUpload}
                label="Gallery"
            >
 { <Link to={"/admin/gallery/"}><Sidebar.Item >Gallery</Sidebar.Item></Link>}
              

            </CustomCollapse >
        );
    }
    return (
        <Sidebar aria-label="Sidebar" className={`${isSidebarOpen ? "" : "hidden"} h-[calc(100vh-4rem)] overflow-hidden w-screen sm:w-[18rem] sm:overflow-auto`}>
            <Sidebar.Items className="text-xl">
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="/" icon={HiChartPie}>
                        Dashboard
                    </Sidebar.Item>
                    <ProductSection />
                    <ExpenseSection />
                    <AppointmentSection />
                    <PaySlipSection />
                    <OrderSection />
                    <CustomerSection />
                    <SupplierSection />
                    <RouteSection />
                    <TicketSection />
                    <InventorySection />
                    
                        {/* <CustomCollapse
                            id="userManagement"
                            icon={MdManageAccounts}
                            label="User Management"
                        >
                            <Link to={"/users"}><Sidebar.Item >View User</Sidebar.Item> </Link>
                            <Link to={"/users/add"}><Sidebar.Item >Add User</Sidebar.Item> </Link>
                            <Link to={"/admin/roles"}><Sidebar.Item >Role Management</Sidebar.Item> </Link>
                        </CustomCollapse > */}
                   

                    
                   
                    
                    {/* <Sidebar.Item href="/projects" icon={FaTasks}>
                        Projects
                    </Sidebar.Item> */}
                    {isAdmin && <Link to={"/logs"}> <Sidebar.Item icon={BiBarChart}>Logs</Sidebar.Item> </Link>}
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup className=" flex items-center justify-center pt-0 ">
                    <Sidebar.Item href="#" onClick={sendEmail} icon={ColoredBiBoy} >
                        <span className="text-yellow-400 font-semibold text-lg" >Help</span>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default NavSideBar;