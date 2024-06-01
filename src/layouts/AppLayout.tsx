import Loading from '@/components/Loading';
import NavBar from '@/components/NavBar';
import SideBarItem from '@/components/Sidebar/SideBarItem';
import SideBarSubmenu from '@/components/Sidebar/SideBarSubmenu';
import { useAuth } from '@/hooks/useAuth';
import {
	Boxes,
	LayoutDashboard,
	LifeBuoy,
	PlusSquare,
	Settings,
	Users,
} from 'lucide-react';
import { Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import SideBar from '../components/Sidebar/SideBar';

function AppLayout() {
	const { data, isError, isLoading } = useAuth();

	if (isLoading)
		return (
			<div className='flex h-screen w-full items-center justify-center'>
				<Loading />
			</div>
		);
	if (isError) return <Navigate to='/auth/login' />;
	if (data)
		return (
			<>
				<div className='drawer bg-base-200 text-sm antialiased md:text-base'>
					<input
						id='upTaskDrawer'
						type='checkbox'
						className='drawer-toggle'
					/>

					{/* Main content */}
					<div className='drawer-content min-h-screen'>
						{/* Starts Page content here */}
						{/* NavBar */}
						<div className='sticky top-0 z-[5] flex w-full justify-center text-base-content shadow-md backdrop-blur-sm transition-shadow'>
							<NavBar userName={data.userName} />
						</div>
						{/* Main Content */}
						<main className='hero'>
							<div className='hero-content w-screen max-w-screen-2xl flex-col items-center'>
								<Outlet />
							</div>
						</main>
						{/* Ends Page content here */}
					</div>

					{/* Sidebar content */}
					<SideBar>
						<SideBarItem
							icon={<LayoutDashboard size={20} />}
							tag='Panel principal'
							link='/'
							// alert
						/>

						<li className='menu-title font-semibold'>Apps</li>
						<SideBarSubmenu
							icon={<Boxes size={20} />}
							tag='Proyectos'
						>
							<SideBarItem
								icon={<PlusSquare size={20} />}
								tag='Agregar proyecto'
								link='projects/new'
							/>
						</SideBarSubmenu>

						<SideBarItem
							icon={<Users size={20} />}
							tag='Colaboradores'
							link='helpers'
						/>

						<div className='divider my-0'></div>
						<SideBarItem
							icon={<Settings size={20} />}
							tag='Configuración'
							link='settings'
						/>
						<SideBarItem
							icon={<LifeBuoy size={20} />}
							tag='Ayuda'
							link='help'
						/>
					</SideBar>
				</div>
				<Toaster
					richColors
					position='top-right'
					theme='system'
					toastOptions={{
						duration: 5000,
						className: 'top-12',
					}}
				/>
			</>
		);
}
export default AppLayout;
