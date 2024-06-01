import { ReactNode } from 'react';

type SideBarItemProps = {
	icon: ReactNode;
	tag: string;
	children: ReactNode;
};

function SideBarSubmenu({ icon, tag, children }: SideBarItemProps) {
	return (
		<li>
			<details
				className='space-y-1'
				open
			>
				<summary>
					{icon}
					{tag}
				</summary>
				<ul>{children}</ul>
			</details>
		</li>
	);
}
export default SideBarSubmenu;
