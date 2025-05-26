import { CashType, FormError, IOrder } from '../../types';
import { IEvents } from '../base/events';
import { settings } from '../../utils/constants';

const INITIAL_ERROR_VALUES: ErrorFieldValues = {
	email: {
		empty: 'Необходимо указать почту',
		validate: 'Некорректный адрес электронной почты'
	},
	phone: {
		empty: 'Необходимо указать телефон',
		validate: 'Некорректный формат телефона'
	},
	address: {
		empty: 'Необходимо указать адрес',
		validate: 'Укажите корректный адрес'
	},
	payment: {
		empty: 'Выберите способ оплаты',
	}
}

export interface IFormModel {
	payment: CashType
	email: string
	phone: string
	address: string
	total: number
	items: string[]
	formErrors: FormError
	setAddressAndPaymentData(field: string, value: string): void
	isValidateAddressAndPayment(): boolean
	setContactsData(field: string, value: string): void
	isValidateContacts(): boolean
	getOrder(): IOrder & { total: number }
}

type ErrorFields = {
	empty: string,
	validate: string
}

type ErrorFieldValues = {
	email: ErrorFields,
	phone: ErrorFields,
	address: ErrorFields,
	payment: Partial<ErrorFields>,
}

export class FormModel implements IFormModel {
	payment: IFormModel['payment'] = null;
	email: IFormModel['email'] = '';
	phone: IFormModel['phone'] = '';
	address: IFormModel['address'] = '';
	total: IFormModel['total'] = 0;
	items: IFormModel['items'] = [];
	formErrors: IFormModel['formErrors'] = {}
	
	_addressRegExp = /^[а-яА-Яё0-9]{7,}$/
	_emailRegExp = /^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/
	_phoneRegExp = /^(8|\+7)\d{10}$/g
	_errorMessages: ErrorFieldValues = INITIAL_ERROR_VALUES
	
	constructor(protected events: IEvents) {}
	
	getOrder(): IOrder & { total: number } {
		return {
			payment: this.payment,
			email: this.email,
			phone: this.phone,
			address: this.address,
			total: this.total,
			items: this.items,
		};
	}
	
	_validateField(
		obj: IFormModel['formErrors'],
		condition: boolean,
		errorMessage: string,
		fieldName: keyof IOrder
	): Partial<Record<keyof IOrder, string>> {
		if (condition) {
			obj[fieldName] = errorMessage;
		}
		return obj
	}
	
	setItems(items: string[]): void {
		this.items = items;
	}
	
	setTotal(n: number): void {
		this.total = n;
	}
	
	isValidateAddressAndPayment(): boolean {
		const obj: IFormModel['formErrors'] = {}
		
		this._validateField(obj, !this.address, this._errorMessages.address.empty, 'address');
		this._validateField(obj, !this._addressRegExp.test(this.address), this._errorMessages.address.validate, 'address');
		
		this._validateField(obj, !this.payment, this._errorMessages.payment.empty, 'payment');
		
		this.formErrors = obj
		console.log('obj: isValidateAddressAndPayment', obj)
		this.events.emit(settings.formErrorsAddressAndPayment, this.formErrors);
		return Object.keys(obj).length === 0;
	}
	
	setPayment(payment: CashType): void {
		this.payment = payment
	}
	
	isValidateContacts(): boolean {
		const obj: IFormModel['formErrors'] = {}
		
		this._validateField(obj, !this.email, this._errorMessages.email.empty, 'email');
		this._validateField(obj, !this._emailRegExp.test(this.email), this._errorMessages.email.validate, 'email');
		
		this._validateField(obj, !this.phone, this._errorMessages.phone.empty, 'phone');
		this._validateField(obj, !this._phoneRegExp.test(this.phone), this._errorMessages.phone.validate, 'phone');
		
		this.formErrors = obj
		console.log('obj: isValidateContacts', obj)
		this.events.emit(settings.formErrorsContacts, this.formErrors);
		return Object.keys(obj).length === 0;
	}
	
	setAddressAndPaymentData(field: string, value: string): void {
		if (field === 'address') {
			this.address = value;
		}
		
		if (this.isValidateAddressAndPayment()) {
			this.formErrors = {}
			this.events.emit(settings.orderIsReady, this.getOrder());
		}
	}
	
	setContactsData(field: string, value: string): void {
		if (field === 'email') {
			this.email = value;
		}
		
		if (field === 'phone') {
			this.phone = value
		}
		
		if (this.isValidateContacts()) {
			this.events.emit(settings.orderIsReady, this.getOrder());
		}
	}
	
	
}
