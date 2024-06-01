import ProfileTabs from '@/components/Profile/ProfileTabs';
import { ArrowLeft } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

function ProfileLayout() {
	return (
		<>
			<div className='w-full'>
				<div className='relative flex justify-center'>
					<Link
						to='/'
						className='btn btn-circle btn-outline btn-primary btn-sm absolute left-4 self-center text-primary'
					>
						<ArrowLeft size={20} />
					</Link>
					<h1 className='text-2xl font-bold text-primary md:text-3xl'>
						Mi cuenta
					</h1>
				</div>
				<p className='text-balance text-center'>
					En esta página podrás ver y gestionar los miembros del proyecto.
				</p>
			</div>

			<div className='mt-8 flex w-full flex-col items-center gap-4'>
				<ProfileTabs />
				<Outlet />
			</div>
		</>
	);
}
export default ProfileLayout;
