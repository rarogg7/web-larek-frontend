import { IEvents } from "./base/events";
import { settings } from "../utils/constants";

export interface IOrder {
	order: HTMLFormElement
	buttonList: HTMLButtonElement[]
	buttonSubmit: HTMLButtonElement
	payment: string
	errors: HTMLElement
	render(): HTMLElement
}

export class OrderView implements IOrder {
	order: IOrder['order']
	buttonList: IOrder['buttonList']
	buttonSubmit: IOrder['buttonSubmit']
	errors: IOrder['errors'];
	payment: IOrder['payment']
	
	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
	) {
		this.order = template.content.querySelector('.form').cloneNode(true) as IOrder['order'];
		this.buttonList = Array.from(this.order.querySelectorAll('.button_alt'));
		this.buttonSubmit = this.order.querySelector('.order__button');
		this.errors = this.order.querySelector('.form__errors');
		
		this.buttonList.forEach(btn => {
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
		this.buttonList.forEach(btn => btn.classList.toggle('button_alt-active', btn.name === payment))
	}
	
	isValid(v: boolean) {
		this.buttonSubmit.disabled = !v
	}
	
	render(): HTMLElement {
		return this.order
	}
	
}
