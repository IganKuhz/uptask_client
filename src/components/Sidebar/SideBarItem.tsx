import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type SideBarItemProps = {
	icon?: ReactNode;
	tag: string;
	active?: boolean;
	alert?: boolean;
	link?: string;
};

function SideBarItem({ icon, tag, alert, link }: SideBarItemProps) {
	return (
		<li>
			<NavLink to={link || '/'}>
				{icon}
				<span>{tag}</span>
				{alert && <span className='badge badge-secondary badge-sm'>+99</span>}
			</NavLink>
		</li>
	);
}
export default SideBarItem;
