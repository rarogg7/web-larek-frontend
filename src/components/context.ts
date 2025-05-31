// Служебные модули
import { EventEmitter } from './base/events';
import { API_URL, CDN_URL } from '../utils/constants';
import { WebLarekModel } from './model/ApiModel';
import { StoreModel } from './model/StoreModel';
import { BasketModel } from './model/BasketModel';
import { FormModel } from './model/FormModel';
import { BasketView } from './Basket';
import { OrderView } from './Order';
import { ContactsView } from './Contacts';
import { ModalView } from './Modal';
import { OrderSuccess } from './Success';
import { Page } from './Page';

// Event system
export const events = new EventEmitter();
export const page = new Page();

// Templates
export const basketTemplateElement = document.querySelector(
	'#basket'
) as HTMLTemplateElement;
export const orderTemplateElement = document.querySelector(
	'#order'
) as HTMLTemplateElement;
export const contactsTemplateElement = document.querySelector(
	'#contacts'
) as HTMLTemplateElement;
export const cardCatalogTemplateElement = document.querySelector(
	'#card-catalog'
) as HTMLTemplateElement;
export const cardPreviewTemplateElement = document.querySelector(
	'#card-preview'
) as HTMLTemplateElement;
export const successTemplateElement = document.querySelector(
	'#success'
) as HTMLTemplateElement;
export const cardBasketTemplateElement = document.querySelector(
	'#card-basket'
) as HTMLTemplateElement;
export const modalContainerTemplateElement = document.querySelector(
	'#modal-container'
) as HTMLTemplateElement;

// Models
export const webLarekModel = new WebLarekModel(CDN_URL, API_URL);
export const storeModel = new StoreModel(events);
export const basketModel = new BasketModel();
export const formModel = new FormModel(events);

// Views
export const basketView = new BasketView(basketTemplateElement, events);
export const orderView = new OrderView(orderTemplateElement, events);
export const contactsView = new ContactsView(contactsTemplateElement, events);
export const modalView = new ModalView(modalContainerTemplateElement, events);
export const orderSuccess = new OrderSuccess(successTemplateElement, events);
