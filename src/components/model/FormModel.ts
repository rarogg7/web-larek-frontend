import { CashType, FormError, IOrder } from '../../types';
import { IEvents } from '../base/events';
import { settings } from '../../utils/constants';

const ERROR_VALUES: ErrorFieldValues = {
	email: {
		empty: 'Необходимо указать почту',
		validate: 'Некорректо введен адрес электронной почты'
	},
	phone: {
		empty: 'Необходимо указать телефон',
		validate: 'Некорректно введен формат телефона'
	},
	address: {
		empty: 'Необходимо указать адрес',
		validate: 'Укажите корректный адрес'
	},
	payment: {
		empty: 'Выберите способ оплаты',
	}
};

export interface IFormModel {
	payment: CashType;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
	formErrors: FormError;
	setAddressAndPaymentData(field: string, value: string): void;
	isValidateAddressAndPayment(): boolean;
	setContactsData(field: string, value: string): void;
	isValidateContacts(): boolean;
	getOrder(): IOrder & { total: number };
}

type ErrorFields = {
	empty: string;
	validate: string;
};

type ErrorFieldValues = {
	email: ErrorFields;
	phone: ErrorFields;
	address: ErrorFields;
	payment: Partial<ErrorFields>;
};

export class FormModel implements IFormModel {
	payment: CashType = null;
	email = '';
	phone = '';
	address = '';
	total = 0;
	items: string[] = [];
	formErrors: FormError = {};

	private readonly _addressRegExp = /^[а-яА-Яё0-9]{7,}$/;
	private readonly _emailRegExp = /^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/;
	private readonly _phoneRegExp = /^(8|\+7)\d{10}$/g;
	private readonly _errorMessages = ERROR_VALUES;

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

	private _validateField(
		obj: IFormModel['formErrors'],
		condition: boolean,
		errorMessage: string,
		fieldName: keyof IOrder
	): void {
		if (condition) {
			obj[fieldName] = errorMessage;
		}
	}

	private _runValidation(rules: {
		field: keyof IOrder;
		condition: boolean;
		message: string;
	}[]): FormError {
		const errors: FormError = {};
		for (const { field, condition, message } of rules) {
			this._validateField(errors, condition, message, field);
		}
		return errors;
	}

	setItems(items: string[]): void {
		this.items = items;
	}

	setTotal(n: number): void {
		this.total = n;
	}

	setPayment(payment: CashType): void {
		this.payment = payment;
	}

	isValidateAddressAndPayment(): boolean {
		const errors = this._runValidation([
			{ field: 'address', condition: !this.address, message: this._errorMessages.address.empty },
			{ field: 'address', condition: !this._addressRegExp.test(this.address), message: this._errorMessages.address.validate },
			{ field: 'payment', condition: !this.payment, message: this._errorMessages.payment.empty! },
		]);

		this.formErrors = errors;
		this.events.emit(settings.formErrorsAddressAndPayment, this.formErrors);
		return Object.keys(errors).length === 0;
	}

	isValidateContacts(): boolean {
		const errors = this._runValidation([
			{ field: 'email', condition: !this.email, message: this._errorMessages.email.empty },
			{ field: 'email', condition: !this._emailRegExp.test(this.email), message: this._errorMessages.email.validate },
			{ field: 'phone', condition: !this.phone, message: this._errorMessages.phone.empty },
			{ field: 'phone', condition: !this._phoneRegExp.test(this.phone), message: this._errorMessages.phone.validate },
		]);

		this.formErrors = errors;
		this.events.emit(settings.formErrorsContacts, this.formErrors);
		return Object.keys(errors).length === 0;
	}

	setAddressAndPaymentData(field: string, value: string): void {
		if (field === 'address') {
			this.address = value;
		}

		if (this.isValidateAddressAndPayment()) {
			this.formErrors = {};
			this.events.emit(settings.orderIsReady, this.getOrder());
		}
	}

	setContactsData(field: string, value: string): void {
		if (field === 'email') {
			this.email = value;
		}
		if (field === 'phone') {
			this.phone = value;
		}

		if (this.isValidateContacts()) {
			this.events.emit(settings.orderIsReady, this.getOrder());
		}
	}
}
