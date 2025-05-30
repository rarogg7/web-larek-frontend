# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/components/events — папка с событиями
-src/components/model — папка с моделями

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск:
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка:

```
npm run build
```

или

```
yarn build
```
---

## Основные типы и интерфейсы:
### Товар:
```ts
interface ICard {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number | null;
    selected: boolean;
}
```

### Расширенный товар (с признаком заказа):
```ts
interface IPlace {
    isOrdered: boolean;
}
type ICardItem = ICard & IPlace;
```

### Корзина:
```ts
interface IBasket {
    list: IBasketItem[];
    price: number;
}

type IBasketItem = Pick<ICardItem, 'id' | 'title' | 'price'>;
```

### Интерфейс представления корзины:
```ts
interface IBasketView {
    render(items: IBasketItem[], total: number): void;
    updateItem(itemId: string, selected: boolean): void;
    clearView(): void;
}
```

### Заказ:
```ts
type CashType = 'cash' | 'card' | null;

interface IOrder {
    payment: CashType;
    address: string;
    email: string;
    phone: string;
    items: string[];
}
```

### Состояние приложения:
```ts
interface IAppState {
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
```

### Интерфейс страницы и модальных окон:
```ts
interface IPage {
    counter: number;
    store: HTMLElement[];
    locked: boolean;
}

interface IPageElements {
    counter: HTMLElement;
    wrapper: HTMLElement;
    basket: HTMLElement;
    store: HTMLElement;
}

interface ModalView {
    content: HTMLElement;
    open(content: HTMLElement): void;
    close(): void;
    clearContent(): void;
}
```

---

## Архитектура:

Приложение построено на принципах **MVC** (Model-View-Controller) / **Event-Driven Architecture**:

- **Модели (`models/`)**: управляют данными приложения
- **Представления (`views/`)**: отвечают за отображение и взаимодействие с DOM
- **Контроллеры (`events/`)**: обрабатывают события, связывая модель и представление

---

## События:

### Генерируются моделью
- `catalog:changed` — обновление списка товаров
- `basket:changed` — обновление содержимого корзины
- `preview:changed` — открытие карточки в модальном окне

### Генерируются представлением
- `basket:add` — добавление товара в корзину
- `basket:remove` — удаление товара из корзины
- `modal:open` / `modal:close` — управление модальными окнами
- `order:submit` — отправка формы заказа

---

## Валидация:

Ошибки формы заказа определяются типом:
```ts
type FormError = Partial<Record<keyof IOrder, string>>;
```
Они отображаются в представлении через методы `updateErrors`, `clearForm` и `disableForm`.

---

## Работа с API:

Реализуется в модуле `WebLarekModel`:
- `getCards()` — получение каталога товаров
- `order(data: IOrder)` — отправка заказа

## Заключение:

Проект демонстрирует чистую архитектуру клиентского приложения с TypeScript, строгой типизацией и событийной моделью. Он может быть легко расширен, протестирован и адаптирован под реальные проекты интернет-магазинов, витрин и маркетплейсов.
