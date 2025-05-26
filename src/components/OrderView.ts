import { IEvents } from "./base/events";
import { settings } from "../utils/constants";

export interface IOrder {
	order: HTMLFormElement
	btnList: HTMLButtonElement[]
	btnSubmit: HTMLButtonElement
	payment: string
	errors: HTMLElement
	render(): HTMLElement
}

export class OrderView implements IOrder {
	order: IOrder['order']
	btnList: IOrder['btnList']
	btnSubmit: IOrder['btnSubmit']
	errors: IOrder['errors'];
	payment: IOrder['payment']
	
	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
	) {
		this.order = template.content.querySelector('.form').cloneNode(true) as IOrder['order'];
		this.btnList = Array.from(this.order.querySelectorAll('.button_alt'));
		this.btnSubmit = this.order.querySelector('.order__button');
		this.errors = this.order.querySelector('.form__errors');
		
		this.btnList.forEach(btn => {
			btn.addEventListener('click', () => {
				this.setPayment.bind(this)(btn.name)
				events.emit(settings.orderOnSetPayment, btn)
			})
		})
		
		this.order.addEventListener('input', (event: Event) => {
			const { name, value } = event.target as HTMLInputElement;
			this.events.emit(settings.orderOnEditAddress, {
				field: name,
				value: value,
			})
		})
		
		this.order.addEventListener('submit', (event): void => {
			event.preventDefault()
			this.events.emit(settings.contactsOpened)
		})
	}
	
	setPayment(payment: string) {
		this.btnList.forEach(btn => btn.classList.toggle('button_alt-active', btn.name === payment))
	}
	
	isValid(v: boolean) {
		this.btnSubmit.disabled = !v
	}
	
	render(): HTMLElement {
		return this.order
	}
	
}
