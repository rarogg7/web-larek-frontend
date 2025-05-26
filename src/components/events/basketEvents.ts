import { events, basketModel, basketView, modalView, cardBasketTemplateElement, storeModel } from '../context';
import { settings } from '../../utils/constants';
import { ICard } from '../../types';

events.on(settings.basketRemoveCard, (card: ICard) => {
  basketModel.deleteCardFromBasket(card);
  basketView.updateBasketView(basketModel, cardBasketTemplateElement);
});

events.on(settings.basketOpened, () => {
  const basketContent = basketView.render();
  modalView.setContent(basketContent);
  modalView.render();
  basketView.updateBasketView(basketModel, cardBasketTemplateElement);
});

events.on(settings.cardAddToBasket, () => {
  const selectedCard = storeModel.selectedCard;
  basketModel.setCardToBasket(selectedCard);

  const totalCardsCount = basketModel.getTotalCardsCount();
  basketView.setCardsCount(totalCardsCount);
});