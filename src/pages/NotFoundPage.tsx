import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
	return (
		<main className='hero-content h-[calc(100vh-580px)]'>
			<div className='card w-full max-w-2xl shrink-0 bg-base-100 shadow-md transition-all'>
				<div className='card-body text-center'>
					<h1 className='text-6xl font-bold tracking-wider md:text-7xl lg:text-9xl'>
						404
					</h1>
					<p className='mt-4 text-xl font-bold tracking-wider text-gray-500 md:text-2xl lg:text-3xl'>
						¡Opps! Página no encontrada
					</p>
					<p className='mt-4 border-b-2 pb-4 text-center text-gray-500'>
						Parece que la página que buscas no se encuentra.
					</p>

					<div className='mt-5'>
						<Link
							to='/'
							className='btn btn-primary'
						>
							<ArrowLeft size={18} />
							Ir al inicio
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}

export default NotFoundPage;
