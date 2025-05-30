import { IEvents } from "./base/events";
import { settings } from "../utils/constants";

export class ModalView {
	modalContainer: HTMLElement;
	buttonClose: HTMLButtonElement;
	_content: HTMLElement;
	_pageWrapper: HTMLElement;
	
	constructor(
		container: HTMLElement,
		protected events: IEvents,
	) {
		this.modalContainer = container;
		this.buttonClose = this.modalContainer.querySelector('.modal__close');
		this._content = this.modalContainer.querySelector('.modal__content');
		this._pageWrapper = document.querySelector('.page__wrapper');
		
		this.buttonClose.addEventListener('click', this.close.bind(this));
		
		this.modalContainer.addEventListener('click', this.close.bind(this));
		const rootContainer = this.modalContainer.querySelector('.modal__container');
		rootContainer.addEventListener('click', e => e.stopPropagation());
	}
	
	open(): void {
		this.modalContainer.classList.add('modal_active')
		this.events.emit(settings.modalOpened)
	}
	
	setContent(newContent: HTMLElement): void {
		this._content.replaceChildren(newContent)
	}
	
	setPageStatus(v: boolean): void {
		if (v) {
			this._pageWrapper.classList.add('page__wrapper_locked')
		} else {
			this._pageWrapper.classList.remove('page__wrapper_locked')
		}
	}
	
  close(): void {
	  this.modalContainer.classList.remove('modal_active')
	  this.events.emit(settings.modalClosed)
  }
	
  render(): HTMLElement {
		this.open()
	  return this.modalContainer
  }
}