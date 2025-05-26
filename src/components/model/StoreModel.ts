import { ICard } from '../../types';
import { IEvents } from '../base/events';
import { settings } from '../../utils/constants';

export interface IStoreModel {
	cardList: ICard[];
	selectedCard: ICard;
	setPreviewCard(card: ICard): void
}

export class StoreModel implements IStoreModel {
	cardList: IStoreModel['cardList'];
	selectedCard: IStoreModel['selectedCard'];
	
	constructor(protected events: IEvents) {
		this.cardList = []
	}
	
	getCardList(): ICard[] {
		return this.cardList;
	}
	
	setCardList(cardList: ICard[]): void {
		this.cardList = cardList;
		this.events.emit(settings.cardsGet);
	}
	
	setPreviewCard(card: ICard): void {
		this.selectedCard = card;
		this.events.emit(settings.cardPreviewOpened, card)
	}
}
