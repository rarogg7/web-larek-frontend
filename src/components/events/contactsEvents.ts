import { events, contactsView, modalView, formModel } from '../context';
import { settings } from '../../utils/constants';
import { OrderEntity, IOrder } from '../../types';

events.on(settings.contactsOpened, () => {
  const contactsContent = contactsView.render();
  modalView.setContent(contactsContent);
});

events.on(settings.contactsInputChange, (orderData: OrderEntity) => {
  formModel.setContactsData(orderData.field, orderData.value);
});

events.on(settings.formErrorsContacts, (errors: Partial<IOrder>) => {
  const { email, phone } = errors;
  contactsView.isValid(!email && !phone);
  contactsView.errors.textContent = [email, phone].filter(Boolean).join('; ');
});