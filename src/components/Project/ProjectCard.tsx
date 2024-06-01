import {
	Copy,
	EllipsisVerticalIcon,
	ShieldAlert,
	ShieldCheck,
	SquarePen,
	Trash,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Project, User } from '../../types';

type ProjectCardProps = {
	project: Project;
	openModal: () => void;
	onDuplicate: (id: Project['_id']) => void;
	onDelete: (id: Project['_id']) => void;
	userAuth: User;
};

function ProjectCard({
	project,
	onDuplicate,
	userAuth,
	openModal,
}: ProjectCardProps) {
	const navigate = useNavigate();

	function handleDelete() {
		navigate(`?deleteProject=${project._id}`);
		openModal();
	}

	return (
		<>
			<div className='relative grid w-5/6 max-w-7xl grid-cols-1 rounded-2xl bg-base-100 px-8 py-6 shadow-md'>
				<div className='flex w-full justify-between'>
					<div>
						<Link
							to={`/projects/${project._id}`}
							className='link-hover link link-primary text-xl font-bold '
						>
							{project.projectName}&nbsp;
						</Link>

						<p className='text-sm'>
							Por:&nbsp;
							<span className='font-semibold text-secondary'>
								{project?.clientName}
							</span>
							{/* 20 April 2022, at 14:88 PM */}
						</p>
					</div>

					{project.manager === userAuth._id && (
						<div className='dropdown dropdown-left'>
							<div
								tabIndex={0}
								role='button'
								className='btn btn-square btn-sm m-1'
							>
								<EllipsisVerticalIcon size={20} />
							</div>

							<ul
								tabIndex={0}
								className='menu dropdown-content z-[1] w-52 space-y-1 rounded-box bg-base-200/60 p-2 shadow-lg backdrop-blur-sm'
							>
								<li>
									<Link to={`/projects/${project._id}/edit`}>
										<SquarePen
											size={20}
											className='text-sky-500'
										/>
										<span>Editar proyecto</span>
									</Link>
								</li>
								<li>
									<button onClick={() => onDuplicate(project._id)}>
										<Copy
											size={20}
											className='text-lime-500'
										/>
										<span>Duplicar proyecto</span>
									</button>
								</li>
								<li>
									<button onClick={handleDelete}>
										<Trash
											size={20}
											className='text-red-500'
										/>
										<span>Eliminar proyecto</span>
									</button>
								</li>
							</ul>
						</div>
					)}
				</div>

				<p className='mt-2 line-clamp-3 min-h-14 text-ellipsis text-sm antialiased'>
					{project.description}
				</p>

				<div className='mt-2 flex items-center justify-between'>
					{project.manager === userAuth._id ? (
						<div
							className='tooltip tooltip-right tooltip-success'
							data-tip='Lider del proyecto'
						>
							<ShieldCheck
								size={18}
								className='text-success'
							/>
						</div>
					) : (
						<div
							className='tooltip tooltip-right tooltip-warning'
							data-tip='Miembro del proyecto'
						>
							<ShieldAlert
								size={18}
								className='text-warning'
							/>
						</div>
					)}
					<Link
						to={`/projects/${project._id}`}
						className='link-hover link link-primary text-sm'
					>
						Mas detalles
					</Link>
				</div>
			</div>
		</>
	);
}
export default ProjectCard;
