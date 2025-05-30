// Типы категорий и оплаты
export type CategoryType = 'софт-скил' | 'хард-скил' | 'кнопка' | 'дополнительное' | 'другое';
export type CashType = 'cash' | 'card' | null;

// Основные модели
export interface ICard {
  id?: string;
  description?: string;
  image?: string;
  category?: CategoryType;
  title: string;
  price: number | null;
  selected: boolean;
}

export interface IPlace { isOrdered: boolean; }
export type ICardItem = ICard & IPlace;
export type IBasketItem = Pick<ICardItem, 'id' | 'title' | 'price'>;

// Корзина
export interface IBasket {
  list: IBasketItem[];
  price: number;
}

export interface IBasketView {
  render(items: IBasketItem[], total: number): void;
  updateItem(itemId: string, selected: boolean): void;
  clearView(): void;
}

// Заказ
export type OrderEntity = { field: string; value: string; }

export interface IOrder {
  payment: CashType;
  address: string;
  email: string;
  phone: string;
  items: string[];
}

export type OrderResult = { id: string; total: number; };
export type FormError = Partial<Record<keyof IOrder, string>>;

// Интерфейсы страницы и состояния
export interface IPageElements {
  counter: HTMLElement;
  wrapper: HTMLElement;
  basket: HTMLElement;
  store: HTMLElement;
}

export interface IPage {
  counter: number;
  store: HTMLElement[];
  locked: boolean;
}

export interface IAppState {
  catalog: ICardItem[];
  basket: ICardItem[];
  order: IOrder;
  preview: ICardItem;

  addToBasket(item: ICardItem): void;
  removeFromBasket(itemId: number): void;
  clearBasket(): void;
  isLotInBasket(item: ICardItem): boolean;
  getTotalAmount(): number;
  getBasketIds(): number;
  getBasketLength(): number[];
  clearOrder(): void;
  updateFormState(valid: boolean, errors: string[]): void;
}

// Модальное окно и форма
export interface ModalView {
  content: HTMLElement;
  open(content: HTMLElement): void;
  close(): void;
  clearContent(): void;
}

export interface FormOrderView {
  formContainer: HTMLElement;
  inputs: Record<string, HTMLInputElement>;
  errorsContainer: HTMLElement;

  renderForm(orderData?: IOrder): void;
  updateErrors(errors: string[]): void;
  clearForm(): void;
  getFormData(): IOrder;
  disableForm(): void;
  enableForm(): void;
}
