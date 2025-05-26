import { IEvents } from "./base/events";
import { settings } from '../utils/constants';

export interface IOrderSuccess {
	btnClose: HTMLButtonElement;
	description: HTMLElement;
	successOrder: HTMLElement;
	render(n: number): HTMLElement;
}

export class OrderSuccess implements IOrderSuccess{
	btnClose: IOrderSuccess['btnClose'];
  description: IOrderSuccess['description'];
	successOrder: IOrderSuccess['successOrder'];
	
	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
	) {
		this.successOrder = template.content.querySelector('.order-success').cloneNode(true) as IOrderSuccess['successOrder'];
		this.description = this.successOrder.querySelector('.order-success__description');
		this.btnClose = this.successOrder.querySelector('.order-success__close');
		
		this.btnClose.addEventListener('click', () => {
			this.events.emit(settings.orderSuccessClosed);
		})
	}
	
  render(n: number): HTMLElement {
		this.description.textContent = `Списано ${n} синапсов`
	  return this.successOrder
  }
	
}
