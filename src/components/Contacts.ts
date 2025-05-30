import { IEvents } from "./base/events";
import { settings } from "../utils/constants";

export interface IContacts {
	contacts: HTMLFormElement;
	inputsList: HTMLInputElement[];
	buttonSubmit: HTMLButtonElement;
	errors: HTMLElement;
	render(): HTMLElement
}

export class ContactsView implements IContacts{
	contacts: IContacts['contacts'];
	inputsList: IContacts['inputsList'];
	buttonSubmit: IContacts['buttonSubmit'];
	errors: IContacts['errors'];
	
	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents
	) {
		this.contacts = template.content.querySelector('.form').cloneNode(true) as IContacts['contacts'];
		this.inputsList = Array.from(this.contacts.querySelectorAll('.form__input'));
		this.buttonSubmit = this.contacts.querySelector('.button');
		this.errors = this.contacts.querySelector('.form__errors');
		
		this.inputsList.forEach((input: HTMLInputElement) => {
			input.addEventListener('input', (event) => {
				const { name, value } = event.target as HTMLInputElement;
				this.events.emit(settings.contactsInputChange, {
					field: name,
					value: value,
				})
			})
		})
		
		this.contacts.addEventListener('submit', (event: MouseEvent): void => {
			event.preventDefault()
			this.events.emit(settings.orderSuccessOpened)
		})
	}
	
	isValid(v: boolean) {
		this.buttonSubmit.disabled = !v
	}
	
	render(): HTMLElement {
		return this.contacts;
	}
	
}
