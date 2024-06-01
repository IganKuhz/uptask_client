import { useQueryClient } from '@tanstack/react-query';
import { Home, Menu, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { User } from '../types';
import Logo from './Logo';

type NavBarProps = {
	userName: User['userName'];
};

function NavBar({ userName }: NavBarProps) {
	const queryClient = useQueryClient();

	const [isDark, setIsDark] = useState<boolean>(
		window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false,
	);

	useEffect(() => {
		localStorage.setItem('isDark', JSON.stringify(isDark));
		if (isDark === true) {
			document.querySelector('html')?.setAttribute('data-theme', 'dark');
		} else {
			document.querySelector('html')?.setAttribute('data-theme', 'light');
		}
	}, [isDark]);

	function logout() {
		localStorage.removeItem('AuthToken');
		localStorage.removeItem('isDark');
		queryClient.invalidateQueries({ queryKey: ['user'] });
	}

	return (
		<nav className='navbar w-full space-x-4 bg-base-100/70'>
			<div className='navbar-start space-x-1'>
				<label
					htmlFor='upTaskDrawer'
					className='btn btn-square btn-ghost'
				>
					<Menu size={20} />
				</label>
				<NavLink
					to='/'
					className='btn btn-square btn-ghost text-primary sm:hidden'
				>
					<Home size={20} />
				</NavLink>
			</div>

			<div className='navbar-center'>
				<NavLink to='/'>
					<Logo className='btn btn-ghost hidden sm:block' />
				</NavLink>
			</div>

			<div className='navbar-end gap-x-4'>
				<label className='btn btn-circle btn-ghost swap swap-rotate'>
					{/* this hidden checkbox controls the state */}
					<input
						type='checkbox'
						className='theme-controller'
						onChange={() => setIsDark(!isDark)}
						value={isDark ? 'dark' : 'light'}
					/>
					{/* sun icon */}
					<Sun className='swap-off' />

					{/* moon icon */}
					<Moon className='swap-on' />
				</label>

				<div className='dropdown dropdown-end'>
					<div
						tabIndex={0}
						role='button'
						className='avatar btn btn-circle btn-ghost'
					>
						<div className='w-10 rounded-full'>
							<img
								alt={`${userName}`}
								src='https://avatar.iran.liara.run/public'
							/>
						</div>
					</div>
					<ul
						tabIndex={0}
						className='menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow-md'
					>
						<p className='mx-3 self-center py-2 font-bold text-primary hover:cursor-default'>
							{userName}
						</p>
						<li>
							<Link
								to='/profile'
								className='justify-between'
							>
								Mi perfil
								<span className='badge badge-secondary'>Nuevo</span>
							</Link>
						</li>
						<li onClick={logout}>
							<a>Cerrar sesión</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
export default NavBar;
