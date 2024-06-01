import Logo from '@/components/Logo';
import { Link, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

function AuthLayout() {
	return (
		<>
			<div className='hero min-h-screen bg-base-200 antialiased'>
				<div className='flex h-screen flex-col items-center justify-center'>
					<Link to='/'>
						<Logo className='sm:h-22 h-16 transition-all md:mb-5 lg:mb-16 md:h-28' />
					</Link>

					<Outlet />
				</div>
			</div>
			<Toaster
				richColors
				position='top-right'
				theme='system'
				toastOptions={{
					duration: 5000,
				}}
			/>
		</>
	);
}
export default AuthLayout;
