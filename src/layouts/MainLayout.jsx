import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div style={{ display: 'flex', flex: 1 }}>
                <Sidebar open={sidebarOpen} />
                <main style={{ flex: 1, overflowX: 'hidden', minHeight: 'calc(100vh - 60px)' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
