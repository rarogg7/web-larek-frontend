export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
	basketOpened: 'basket:opened',
	basketRemoveCard: 'basket:removeCard',
	cardsGet: 'cards:get',
	cardAddToBasket: 'card:addToBasket',
	cardSelect: 'card:select',
	cardPreviewOpened: 'card:previewOpened',
	contactsOpened: 'contacts:opened',
	contactsInputChange: 'contacts:inputChange',
	formErrorsAddressAndPayment: 'formErrors:addressAndPayment',
	formErrorsContacts: 'formErrors:contacts',
	modalClosed: 'modal:closed',
	modalOpened: 'modal:opened',
	orderOnSetPayment: 'order:payment',
	orderIsReady: 'order:isReady',
	orderOnEditAddress: 'order:onEditAddress',
	orderOpened: 'order:opened',
	orderSuccessClosed: 'orderSuccess:closed',
	orderSuccessOpened: 'orderSuccess:opened',
};
