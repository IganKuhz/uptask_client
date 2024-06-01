import { forwardRef, ReactNode } from 'react';

export type ModalProps = {
	children?: ReactNode;
	onBackdropClick?: () => void;
	modalBoxClassName?: string;
	// you can add more classNames as per your level of customisation needs
};

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
	({ children, modalBoxClassName, onBackdropClick }, ref) => {
		return (
			<dialog
				ref={ref}
				className='modal modal-bottom sm:modal-middle'
				onCancel={e => e.preventDefault()} // prevent closing the modal on pressing the ESC key
			>
				<div className={`modal-box ${modalBoxClassName ?? ''}`}>{children}</div>
				<form
					method='dialog'
					className='modal-backdrop'
				>
					<button
						type='button'
						onClick={() => {
							onBackdropClick && onBackdropClick();
						}}
					></button>
				</form>
			</dialog>
		);
	},
);
