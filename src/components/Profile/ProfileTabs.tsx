import { Fingerprint, User2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
	{ name: 'Mi cuenta', path: '/profile', icon: User2 },
	{ name: 'Mis credenciales', path: '/profile/password', icon: Fingerprint },
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

function ProfileTabs() {
	// const navigate = useNavigate();
	const location = useLocation();
	// const currentTab = tabs.filter(tab => tab.path === location.pathname)[0].path;

	return (
		<div
			role='tablist'
			className='tabs tabs-bordered w-3/6 grid-cols-[1fr,1fr] transition-all'
		>
			{tabs.map(tab => (
				<Link
					key={tab.name}
					to={tab.path}
					role='tab'
					className={classNames(
						location.pathname === tab.path
							? 'tab tab-active font-semibold text-primary'
							: 'tab',
					)}
				>
					<tab.icon />
					<span className='ml-2 hidden md:block'>{tab.name}</span>
				</Link>
			))}
		</div>
	);
}
export default ProfileTabs;
