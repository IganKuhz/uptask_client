type SideBarProps = {
	children: React.ReactNode;
};

function SideBar({ children }: SideBarProps) {
	return (
		<div className='drawer-side top-16'>
			<label
				htmlFor='upTaskDrawer'
				className='drawer-overlay'
			></label>

			<aside className='min-h-screen w-60 bg-base-100/70 shadow-md backdrop-blur-sm transition-shadow [transform:translate3d(0,0,0)]'>
				<ul className='menu space-y-1'>{children}</ul>
			</aside>
		</div>
	);
}
export default SideBar;
