import productItem from 'interfaces/productsItem';

export default class Cart {
  products: productItem[];
  fetchedProducts: productItem[];

  constructor() {
    this.products = [];
    this.fetchedProducts = [];
  }

  moveFromStorageToCart() {
    this.products = JSON.parse(window.localStorage.getItem('products') || '[]');

    return this.products;
  }

  moveFromCartToStorage() {
    window.localStorage.setItem('products', JSON.stringify(this.products));
  }

  removeItem(index: number) {
    this.products.splice(index, 1);

    window.localStorage.setItem('products', JSON.stringify(this.products));
  }

  removeItembyId(id: number) {
    const index = this.products.findIndex(
      (ietm: productItem) => ietm.id === id
    );

    this.products.splice(index, 1);

    window.localStorage.setItem('products', JSON.stringify(this.products));
  }

  addItem(id: number) {
    const item = this.products.find(
      (currentItem: productItem) => currentItem.id === id
    );

    if (item) {
      const defaultItemCount = 2;
      item.count = item.count ? item.count + 1 : defaultItemCount;
    } else {
      const item: productItem | undefined = this.fetchedProducts.find(
        (item: productItem) => item.id === id
      );

      if (item) {
        this.products.push({ ...item });
      }
    }

    window.localStorage.setItem('products', JSON.stringify(this.products));
  }

  async fetchItems(url = `https://dummyjson.com/products?limit=100`) {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => (this.fetchedProducts = data.products));
  }

  resetcart() {
    this.products.length = 0;

    (<HTMLElement>(
      document.getElementsByClassName('header__cart-btn')[0]
    ))!.innerText = `${0}`;
    (<HTMLElement>(
      document.getElementsByClassName('totalPrice')[0]
    ))!.innerText = `${0}$`;

    window.localStorage.setItem('products', JSON.stringify(this.products));
  }

  get length() {
    return this.products.length;
  }

  get total() {
    return this.products.reduce(
      (acc, product) => product.price * (product.count || 1) + acc,
      0
    );
  }

  get count() {
    return this.products.reduce(
      (acc, product) => (product.count || 1) + acc,
      0
    );
  }
}
