import productItem from 'interfaces/productsItem';

export default class Cart {
  products: productItem[];
  productsFetched: productItem[];

  constructor() {
    this.products = [];
    this.productsFetched = [];
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
    const itemFound = this.products.find(
      (itemSearch: productItem) => itemSearch.id === id
    );

    if (itemFound) {
      itemFound.count = itemFound.count ? itemFound.count + 1 : 2;
    } else {
      const item: productItem | undefined = this.productsFetched.find(
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
      .then((data) => (this.productsFetched = data.products));
  }

  flush() {
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
