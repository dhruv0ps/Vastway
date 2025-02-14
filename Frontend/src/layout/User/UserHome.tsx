import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import UserNavbar from "../User/NavBar"
import UserFormModal from './UserFormModel';
import Footer from './Footer';

const UserHome = observer(() => {
    return (
        <div className="min-h-screen bg-gray-50">
            <UserNavbar />
            <UserFormModal/>
            <main className={`pt-10`}>
                <div className="rounded-lg dark:border-gray-700">
                    <Outlet />
                </div>
            </main>
            <div >
        <Footer />
      </div>
        </div>
    );
});

export default UserHome;