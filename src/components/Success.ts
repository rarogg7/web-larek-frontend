import { IEvents } from './base/events';
import { settings } from '../utils/constants';

export interface IOrderSuccess {
	buttonClose: HTMLButtonElement;
	description: HTMLElement;
	successOrder: HTMLElement;
	render(n: number): HTMLElement;
}

export class OrderSuccess implements IOrderSuccess {
	buttonClose: IOrderSuccess['buttonClose'];
	description: IOrderSuccess['description'];
	successOrder: IOrderSuccess['successOrder'];

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.successOrder = template.content
			.querySelector('.order-success')
			.cloneNode(true) as IOrderSuccess['successOrder'];
		this.description = this.successOrder.querySelector(
			'.order-success__description'
		);
		this.buttonClose = this.successOrder.querySelector('.order-success__close');

		this.buttonClose.addEventListener('click', () => {
			this.events.emit(settings.orderSuccessClosed);
		});
	}

	render(n: number): HTMLElement {
		this.description.textContent = `Списано ${n} синапсов`;
		return this.successOrder;
	}
}
