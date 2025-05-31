import { CategoryType } from "../types";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

// Цвета категорий
export const CAT_COLORS: Record<CategoryType, string> = {
	'софт-скил': 'soft',
	'кнопка': 'button',
	'хард-скил': 'hard',
	'дополнительное': 'additional',
	'другое': 'other',
};

// Установки
export const settings = {
	// Корзина: открыть карточку
	basketOpened: 'basket:opened',
	// Корзина: удалить карточку из корзины
	basketRemoveCard: 'basket:removeCard',
	// Карточки
	cardsGet: 'cards:get',
	cardAddToBasket: 'card:addToBasket',
	cardSelect: 'card:select',
	cardPreviewOpened: 'card:previewOpened',
	// Контакты: открыты
	contactsOpened: 'contacts:opened',
	// Контакты: событие
	contactsInputChange: 'contacts:inputChange',
	// Ошибки формы
	formErrorsAddressAndPayment: 'formErrors:addressAndPayment',
	formErrorsContacts: 'formErrors:contacts',
	// Модальное окно: закрыть
	modalClosed: 'modal:closed',
	// Модальное окно: открыть
	modalOpened: 'modal:opened',
	// Заказ: оплата
	orderOnSetPayment: 'order:payment',
	// Заказ: готов
	orderIsReady: 'order:isReady',
	// Заказ: редактирование адреса
	orderOnEditAddress: 'order:onEditAddress',
	// Заказ: открыт
	orderOpened: 'order:opened',
	// Заказ: успешно закрылось
	orderSuccessClosed: 'orderSuccess:closed',
	// Заказ: успешно открылось
	orderSuccessOpened: 'orderSuccess:opened',
};
