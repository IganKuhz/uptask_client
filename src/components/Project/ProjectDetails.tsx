import { isManager } from '@/utils/policies';
import {
	EllipsisVerticalIcon,
	ShieldAlert,
	ShieldCheck,
	StickyNote,
	Users2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project, User } from '../../types';

type ProjectDetailsProps = {
	projectData: Project;
	onCreate?: () => void;
	userAuth: User;
};

function ProjectDetails({
	projectData,
	onCreate,
	userAuth,
}: ProjectDetailsProps) {
	return (
		<>
			<div className='grid w-5/6 max-w-7xl grid-cols-1 rounded-2xl bg-base-100 px-8 py-6 shadow-md'>
				<div className='flex gap-4'>
					<img
						src='/task.jpg'
						className='relative -top-8 -mb-4 h-20 w-20 rounded-lg border bg-white shadow'
						alt={projectData?.projectName}
					/>

					<div className='flex w-full flex-col'>
						<div className='flex justify-between'>
							<div>
								<div className='flex items-center space-x-2'>
									<h1 className='text-xl font-bold text-primary'>
										{projectData?.projectName}
									</h1>

									{projectData.manager === userAuth._id ? (
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
								</div>

								<p className='text-sm'>
									Por:&nbsp;
									<span className='font-semibold text-secondary'>
										{projectData?.clientName}
									</span>
									{/* 20 April 2022, at 14:88 PM */}
								</p>
							</div>

							{isManager(projectData.manager, userAuth._id) && (
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
											<button onClick={onCreate}>
												<StickyNote
													size={20}
													className='text-secondary'
												/>
												<span>Nueva tarea</span>
											</button>
										</li>
										<li>
											<Link to='team'>
												<Users2 size={20} />
												<span>Equipo</span>
											</Link>
										</li>
									</ul>
								</div>
							)}
						</div>
					</div>
				</div>
				<p className='mt-2 text-sm antialiased'>{projectData?.description}</p>
				{/* <p className='mt-2 line-clamp-3 text-ellipsis text-sm antialiased'>
					{projectData?.description}
				</p> */}
			</div>
		</>
	);
}
export default ProjectDetails;
