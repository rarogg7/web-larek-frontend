import { ICard } from '../types';
import { IEvents } from './base/events';
import { createElement } from '../utils/utils';
import { settings } from '../utils/constants';
import { BasketModel } from './model/BasketModel';

// Интерфейс для элемента корзины
interface IBasketItem {
	ctx: HTMLElement;
	index: HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	buttonDelete: HTMLButtonElement;
	render(card: ICard, index: number): HTMLElement;
}

// Класс одного элемента корзины
export class BasketItemView implements IBasketItem {
	ctx: HTMLElement;
	index: HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	buttonDelete: HTMLButtonElement;

	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		actions?: { onClick: (event: MouseEvent) => void }
	) {
		const node = template.content.querySelector('.basket__item');
		if (!node) throw new Error('Basket item template is missing .basket__item');
		this.ctx = node.cloneNode(true) as HTMLElement;

		this.index = this.ctx.querySelector('.basket__item-index');
		this.title = this.ctx.querySelector('.card__title');
		this.price = this.ctx.querySelector('.card__price');
		this.buttonDelete = this.ctx.querySelector('.basket__item-delete');

		if (!this.index || !this.title || !this.price || !this.buttonDelete) {
			throw new Error('Basket item template is missing required elements');
		}

		if (actions?.onClick) {
			this.buttonDelete.addEventListener('click', actions.onClick);
		}
	}

	private _formatPrice(price: number | null): string {
		return price === null ? 'Бесценно' : `${price} синапсов`;
	}

	render({ title, price }: ICard, index: number): HTMLElement {
		this.index.textContent = index.toString();
		this.title.textContent = title;
		this.price.textContent = this._formatPrice(price);
		return this.ctx;
	}
}

// Интерфейс для представления корзины
interface IBasket {
	ctx: HTMLElement;
	title: HTMLElement;
	list: HTMLElement;
	button: HTMLButtonElement;
	totalPrice: HTMLElement;
	headerButton: HTMLButtonElement;
	headerCount: HTMLElement;
	setCardsCount(count: number): void;
	setTotalCardsPrice(sum: number): void;
	render(): HTMLElement;
}

// Класс представления корзины
export class BasketView implements IBasket {
	ctx: HTMLElement;
	title: HTMLElement;
	headerButton: HTMLButtonElement;
	headerCount: HTMLElement;
	button: HTMLButtonElement;
	list: HTMLElement;
	totalPrice: HTMLElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		const node = template.content.querySelector('.basket');
		if (!node) throw new Error('Template is missing .basket');
		this.ctx = node.cloneNode(true) as HTMLElement;

		this.title = this.ctx.querySelector('.modal__title');
		this.button = this.ctx.querySelector('.basket__button');
		this.list = this.ctx.querySelector('.basket__list');
		this.totalPrice = this.ctx.querySelector('.basket__price');
		this.headerButton = document.querySelector('.header__basket');
		this.headerCount = document.querySelector('.header__basket-counter');

		if (
			!this.title ||
			!this.button ||
			!this.list ||
			!this.totalPrice ||
			!this.headerButton ||
			!this.headerCount
		) {
			throw new Error('BasketView missing required elements');
		}

		this.button.addEventListener('click', () => {
			this.events.emit(settings.orderOpened);
		});

		this.headerButton.addEventListener('click', () => {
			this.events.emit(settings.basketOpened);
		});
	}

	updateBasketView(
		basketModel: BasketModel,
		cardBasketTemplateElement: HTMLTemplateElement
	) {
		const totalCardsCount = basketModel.getTotalCardsCount();
		const totalCardsPrice = basketModel.getTotalCardsPrice();

		this.setCardsCount(totalCardsCount);
		this.setTotalCardsPrice(totalCardsPrice);

		const items = basketModel.cardsList.map((card: ICard, index: number) => {
			const basketItem = new BasketItemView(
				cardBasketTemplateElement,
				this.events,
				{
					onClick: () => this.events.emit(settings.basketRemoveCard, card),
				}
			);
			return basketItem.render(card, index + 1);
		});

		this.setItems(items);
	}

	setItems(items: HTMLElement[]): void {
		if (items.length) {
			this.list.replaceChildren(...items);
			this.button.removeAttribute('disabled');
		} else {
			this.button.setAttribute('disabled', 'true');
			const emptyBasketTitleElement = createElement('p', {
				textContent: 'Корзина пуста',
			});
			this.list.replaceChildren(emptyBasketTitleElement);
		}
	}

	setCardsCount(count: number): void {
		this.headerCount.textContent = `${count}`;
	}

	setTotalCardsPrice(sum: number): void {
		this.totalPrice.textContent = `${sum} синапсов`;
	}

	render(): HTMLElement {
		this.title.textContent = 'Корзина';
		return this.ctx;
	}
}
