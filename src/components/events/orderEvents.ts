import {
	events,
	modalView,
	orderView,
	formModel,
	basketModel,
	orderSuccess,
	basketView,
} from '../context';
import { settings } from '../../utils/constants';
import { OrderEntity, IOrder, CashType } from '../../types';
import { WebLarekModel } from '../model/ApiModel';
import { CDN_URL, API_URL } from '../../utils/constants';
import { ICard } from '../../types';
import { storeModel } from '../context';

const webLarekModel = new WebLarekModel(CDN_URL, API_URL);

webLarekModel
	.getItemsList()
	.then((items: ICard[]) => {
		storeModel.setCardList(items);
	})
	.catch(console.error);

events.on(settings.orderOpened, () => {
	const orderContent = orderView.render();
	modalView.setContent(orderContent);
	modalView.render();
});

events.on(settings.orderOnSetPayment, (button: HTMLButtonElement) => {
	formModel.setPayment(button.name as CashType);
});

events.on(settings.orderOnEditAddress, (orderData: OrderEntity) => {
	formModel.setAddressAndPaymentData(orderData.field, orderData.value);
});

events.on(settings.formErrorsAddressAndPayment, (errors: Partial<IOrder>) => {
	const { address, payment } = errors;
	orderView.isValid(!address && !payment);
	orderView.errors.textContent = [address, payment].filter(Boolean).join('; ');
});

events.on(settings.orderSuccessOpened, () => {
	const basketCardsListIds = basketModel.cardsList.map(({ id }) => id);
	formModel.setItems(basketCardsListIds);
	formModel.setTotal(basketModel.getTotalCardsPrice());
	const order = formModel.getOrder();

	webLarekModel
		.postOrder(order)
		.then(() => {
			const orderSuccessContent = orderSuccess.render(
				basketModel.getTotalCardsPrice()
			);
			modalView.setContent(orderSuccessContent);
			basketModel.clearBasket();
			basketView.setCardsCount(basketModel.getTotalCardsCount());
			modalView.render();
		})
		.catch(console.error);
});
