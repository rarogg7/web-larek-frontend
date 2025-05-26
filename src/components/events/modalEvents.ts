import { events, modalView } from '../context';
import { settings } from '../../utils/constants';

events.on(settings.modalOpened, () => {
  modalView.setPageStatus(true);
});

events.on(settings.modalClosed, () => {
  modalView.setPageStatus(false);
});