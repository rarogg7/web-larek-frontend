# Проектная работа "Веб-ларек"
Стек: HTML, SCSS, TS, Webpack

## Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/components/events — папка с событиями
- src/components/model — папка с моделями

## Важные файлы:
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


### Типы категорий и оплаты
```ts
type CategoryType = 'софт-скил' | 'хард-скил' | 'кнопка' | 'дополнительное' | 'другое';
type CashType = 'cash' | 'card' | null;
```

### Основные модели
```ts
interface ICard {
  id?: string;
  description?: string;
  image?: string;
  category?: CategoryType;
  title: string;
  price: number | null;
  selected: boolean;
}

interface IPlace { isOrdered: boolean; }
type ICardItem = ICard & IPlace;
type IBasketItem = Pick<ICardItem, 'id' | 'title' | 'price'>;
```

### Корзина
```ts
interface IBasket {
  list: IBasketItem[];
  price: number;
}

interface IBasketView {
  render(items: IBasketItem[], total: number): void;
  updateItem(itemId: string, selected: boolean): void;
  clearView(): void;
}
```

### Заказ
```ts
type OrderEntity = { field: string; value: string; }

interface IOrder {
  payment: CashType;
  address: string;
  email: string;
  phone: string;
  items: string[];
}

type OrderResult = { id: string; total: number; };
type FormError = Partial<Record<keyof IOrder, string>>;
```

### Интерфейсы страницы и состояния
```ts
interface IPageElements {
  counter: HTMLElement;
  wrapper: HTMLElement;
  basket: HTMLElement;
  store: HTMLElement;
}

interface IPage {
  counter: number;
  store: HTMLElement[];
  locked: boolean;
}

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

### Модальное окно и форма
```ts
interface ModalView {
  content: HTMLElement;
  open(content: HTMLElement): void;
  close(): void;
  clearContent(): void;
}

interface FormOrderView {
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
```

---

## Архитектура:
Приложение построено на принципах **MVP** (Model-View-Presenter):

### Слои:
- **Модели (Model):**
  - `StoreModel` — работа с каталогом
  - `BasketModel` — управление товарами в корзине
  - `FormModel` — работа с формами заказа и валидацией
  - `ApiModel` — взаимодействие с сервером

- **Представления (View):**
  - `CardView`, `CardPreviewView`, `Basket` — карточки товара в разных состояниях
  - `Basket`, `Modal`, `Order`, `Contacts`, `Success` — основные UI-компоненты

- **Обработчики событий (Events):**
  - Отдельные модули для корзины, каталога, заказа, контактов и модального окна (`basketEvents.ts`, `catalogEvents.ts` и др.)

- **Инициализация (`index.ts`):**
  - Создание всех моделей, представлений и привязка событий
  - Управление логикой отображения и изменением состояния

---

## События:
### Генерируются представлением
- `card:addToBasket` — добавление товара в корзину
- `basket:removeCard` — удаление товара из корзины
- `modal:opened` / `modal:closed` — управление модальными окнами

---

## Валидация:
Ошибки формы заказа определяются типом:
```ts
type FormError = Partial<Record<keyof IOrder, string>>;
```

Выполняется на каждом изменении ввода. Ошибки хранятся в `FormModel` и отображаются в UI при необходимости. Поддерживается раздельная валидация для адреса/оплаты и контактов.

---

## Взаимодействие через события:
Все взаимодействия между слоями построены через **событийную шину** (`EventEmitter`). Примеры событий:

| Событие                    | Назначение                               |
|----------------------------|------------------------------------------|
| `basket:opened`           | Открытие корзины                         |
| `card:addToBasket`        | Добавление карточки в корзину            |
| `card:select`             | Открытие карточки в модальном окне       |
| `contacts:inputChange`    | Обработка ввода в форму контактов        |
| `order:payment`           | Выбор способа оплаты                     |
| `order:isReady`           | Проверка готовности заказа               |
| `formErrors:contacts`     | Валидация формы контактов                |
| `orderSuccess:opened`     | Показ окна успешного заказа              |

Полный список — в `utils/constants.ts`.

---

## Основные компоненты:
| Компонент     | Описание |
|---------------|----------|
| `Card`        | Представление товара в каталоге |
| `CardPreview` | Подробный просмотр карточки (модальное окно) |
| `CardBasket`  | Карточка товара в корзине |
| `Basket`      | Модуль отображения корзины и расчёта общей стоимости |
| `Order`       | Форма адреса и способа оплаты |
| `Contacts`    | Форма email и телефона |
| `Modal`       | Отображение модального окна |
| `Success`     | Экран подтверждения успешного заказа |

---

## API и работа с сервером:
Серверные взаимодействия реализованы в `ApiModel.ts` на базе базового класса `api.ts`. Методы:
- `getItemsList()` — загрузка карточек товаров
- `postOrder(order: IOrder)` — отправка заказа

Конфигурация URL берётся из переменных окружения:
```ts
API_URL = \`\${process.env.API_ORIGIN}/api/weblarek\`
CDN_URL = \`\${process.env.API_ORIGIN}/content/weblarek\`
```

## Заключение:
Проект демонстрирует чистую архитектуру клиентского приложения с TypeScript, строгой типизацией и событийной моделью. Он может быть легко расширен, протестирован и адаптирован под реальные проекты интернет-магазинов, витрин и маркетплейсов.
