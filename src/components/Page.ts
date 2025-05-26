export class Page {
  gallery: HTMLElement;
  headerCartButton: HTMLButtonElement;
  headerCount: HTMLElement;

  constructor() {
    this.gallery = document.querySelector('.gallery');
    this.headerCartButton = document.querySelector('.header__basket');
    this.headerCount = document.querySelector('.header__basket-counter');
  }

  appendToGallery(element: HTMLElement): void {
    this.gallery.appendChild(element);
  }

  updateHeaderCount(count: number): void {
    this.headerCount.textContent = `${count}`;
  }
}