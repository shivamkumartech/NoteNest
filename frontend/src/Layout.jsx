import Footer from './components/Footer'
import { Outlet } from 'react-router'
import Navbar from './components/Navbar'

function Layout() {
    return (
        <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
            <Navbar />
            <main className='flex-1 container mx-auto p-4'><Outlet /></main>
            <Footer />
        </div>
    )
}

export default Layout