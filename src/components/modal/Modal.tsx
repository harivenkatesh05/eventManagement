import React, { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	closeOnlyOnSubmit?: boolean;
	children: React.ReactNode;
	onSave?: () => void;
	buttonText?: string 
}

export default function Modal({ isOpen, onClose, closeOnlyOnSubmit = false, title, children, onSave, buttonText = "Save" }: ModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		if (isOpen) {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			!closeOnlyOnSubmit && document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			!closeOnlyOnSubmit && document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className={styles.modalOverlay} onClick={() => !closeOnlyOnSubmit && onClose()}>
			<div 
				className={styles.modalContent} 
				ref={modalRef}
				onClick={e => e.stopPropagation()}
			>
				<div className={styles.modalHeader}>
					<h3>{title}</h3>
					{!closeOnlyOnSubmit && <button 
						className={styles.closeButton}
						onClick={onClose}
						aria-label="Close"
					>
						<i className="uil uil-multiply"></i>
					</button>}
				</div>
				
				<div className={styles.modalBody}>
					{children}
				</div>

				<div className={styles.modalFooter}>
					{!closeOnlyOnSubmit && <button 
						className={styles.cancelButton}
						onClick={onClose}
					>
						Cancel
					</button>}
					{onSave && (
						<button 
							className={styles.saveButton}
							onClick={onSave}
						>
							{buttonText}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
