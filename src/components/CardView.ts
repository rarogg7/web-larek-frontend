import { CategoryType, ICard } from '../types';
import { IEvents } from './base/events';
import { settings } from '../utils/constants';

// Цвета категорий
const INITIAL_COLORS: Record<CategoryType, string> = {
	'софт-скил': 'soft',
	'кнопка': 'button',
	'хард-скил': 'hard',
	'дополнительное': 'additional',
	'другое': 'other',
};

// Интерфейс базовой карточки
export interface InterfaceCard {
	render(card: ICard): HTMLElement;
}

// Интерфейс предпросмотра карточки
export interface ICardPreview {
	btn: HTMLElement;
	text: HTMLElement;
	render(card: ICard): HTMLElement;
}

// Базовая карточка
export class CardView implements InterfaceCard {
	protected ctx: HTMLElement;
	protected category: HTMLElement;
	protected title: HTMLElement;
	protected image: HTMLImageElement;
	protected price: HTMLElement;
	protected colors: Record<CategoryType, string> = INITIAL_COLORS;

	constructor(
		template: HTMLTemplateElement,
		actions?: { onClick: (event: MouseEvent) => void }
	) {
		const cardNode = template.content.querySelector('.card');
		if (!cardNode) throw new Error('Template must contain .card element');

		this.ctx = cardNode.cloneNode(true) as HTMLElement;

		this.category = this.ctx.querySelector('.card__category');
		this.title = this.ctx.querySelector('.card__title');
		this.image = this.ctx.querySelector('.card__image');
		this.price = this.ctx.querySelector('.card__price');

		if (!this.category || !this.title || !this.image || !this.price) {
			throw new Error('Card template is missing required elements');
		}

		if (actions?.onClick) {
			this.ctx.addEventListener('click', actions.onClick);
		}
	}

	protected _setTextContent(el: HTMLElement, text: string | number | null): void {
		if (el) el.textContent = text?.toString() ?? '';
	}

	protected _setCategory(category: CategoryType | null): void {
		this._setTextContent(this.category, category);
		const className = this.colors[category] || 'other';
		this.category.className = `card__category card__category_${className}`;
	}

	protected _setPrice(price: number | null = null): string {
		return price === null ? 'Бесценно' : `${price} синапсов`;
	}

	render(card: ICard): HTMLElement {
		this._setCategory(card.category);
		this._setTextContent(this.title, card.title);
		this.image.src = card.image;
		this.image.alt = card.title;
		this._setTextContent(this.price, this._setPrice(card.price));
		return this.ctx;
	}
}

// Карточка с кнопкой предпросмотра
export class CardPreviewView extends CardView implements ICardPreview {
	btn: HTMLElement;
	text: HTMLElement;

	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		actions?: { onClick: (event: MouseEvent) => void }
	) {
		super(template, actions);

		this.text = this.ctx.querySelector('.card__text');
		this.btn = this.ctx.querySelector('.card__button');

		if (!this.text || !this.btn) {
			throw new Error('CardPreviewView template missing .card__text or .card__button');
		}

		this.btn.addEventListener('click', () => {
			this.events.emit(settings.cardAddToBasket);
		});
	}

	private _setBtnText(card: ICard): string {
		const isAvailable = Boolean(card.price);
		if (isAvailable) {
			this.btn.removeAttribute('disabled');
			return 'Купить';
		} else {
			this.btn.setAttribute('disabled', 'true');
			return 'Не продаётся';
		}
	}

	override render(card: ICard): HTMLElement {
		super.render(card);
		this._setTextContent(this.text, card.description);
		this._setTextContent(this.btn, this._setBtnText(card));
		return this.ctx;
	}
}
