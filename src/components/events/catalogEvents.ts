import { events, storeModel, page, cardCatalogTemplateElement, cardPreviewTemplateElement, modalView } from '../context';
import { settings } from '../../utils/constants';
import { CardView } from '../Card';
import { CardPreviewView } from '../Card';
import { ICard } from '../../types';

events.on(settings.cardsGet, () => {
  storeModel.cardList.forEach(card => {
    const cardEntity = new CardView(cardCatalogTemplateElement, {
      onClick: () => events.emit(settings.cardSelect, card),
    });
    const newCard = cardEntity.render(card);
    page.appendToGallery(newCard);
  });
});

events.on(settings.cardSelect, (card: ICard) => {
  storeModel.setPreviewCard(card);
});

events.on(settings.cardPreviewOpened, (card: ICard) => {
  const cardPreview = new CardPreviewView(cardPreviewTemplateElement, events);
  modalView.setContent(cardPreview.render(card));
  modalView.open();
});