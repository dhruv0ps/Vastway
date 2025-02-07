import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import UserNavbar from "../User/NavBar"


const UserHome = observer(() => {
    return (
        <div className="min-h-screen bg-gray-50">
            <UserNavbar />
            <main className={`pt-10`}>
                <div className="rounded-lg dark:border-gray-700">
                    <Outlet />
                </div>
            </main>
            
        </div>
    );
});

export default UserHome;