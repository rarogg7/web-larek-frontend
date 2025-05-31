import { IEvents } from "./base/events";
import { settings } from "../utils/constants";

export class ModalView {
	_modalContainer: HTMLElement;
	_buttonClose: HTMLButtonElement;
	_content: HTMLElement;
	_pageWrapper: HTMLElement;
	
	constructor(
		container: HTMLElement,
		protected events: IEvents,
	) {
		this._modalContainer = container;
		this._buttonClose = this._modalContainer.querySelector('.modal__close');
		this._content = this._modalContainer.querySelector('.modal__content');
		this._pageWrapper = document.querySelector('.page__wrapper');
		
		this._buttonClose.addEventListener('click', this.close.bind(this));
		
		this._modalContainer.addEventListener('click', this.close.bind(this));
		const rootContainer = this._modalContainer.querySelector('.modal__container');
		rootContainer.addEventListener('click', e => e.stopPropagation());
	}
	
	open(): void {
		this._modalContainer.classList.add('modal_active')
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
	  this._modalContainer.classList.remove('modal_active')
	  this.events.emit(settings.modalClosed)
  }
	
  render(): HTMLElement {
		this.open()
	  return this._modalContainer
  }
}