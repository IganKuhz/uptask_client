import { ReactNode, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalProps } from '../components/Modal.tsx';

export type UseModalResp = {
	modal: ReactNode;
	closeModal: () => void;
	openModal: () => void;
	modalBoxClassName?: string;
};

export type UseModalProps = Omit<ModalProps, 'onBackdropClick'> & {
	shouldAllowBackdropClick?: boolean; //if it is true then modal can be closed
	onModalOpen?: () => void; //this function will be called on calling of openModal
	onModalClose?: () => void; //this function will be called on calling of closeModal
};

export const useModal = ({
	children,
	modalBoxClassName,
	shouldAllowBackdropClick = true,
	onModalClose,
	onModalOpen,
}: UseModalProps): UseModalResp => {
	const navigate = useNavigate();
	const ref = useRef<HTMLDialogElement | null>(null);

	const closeModal = () => {
		onModalClose && onModalClose();
		ref.current?.close();
	};

	const openModal = () => {
		onModalOpen && onModalOpen();
		ref.current?.showModal();
	};

	const modal: ReactNode = (
		<Modal
			onBackdropClick={() => {
				if (shouldAllowBackdropClick) {
					closeModal();
					navigate(location.pathname, { replace: true });
				}
			}}
			ref={ref}
			modalBoxClassName={modalBoxClassName}
		>
			{children}
		</Modal>
	);

	return {
		closeModal,
		openModal,
		modal,
	};
};
