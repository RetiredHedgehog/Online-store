import { productItem } from "../interfaces/productsItem";

export default class Cart {
  products: productItem[];
  constructor() {
    this.products = [];
  }

  moveFromStorageToCart() {
    this.products = JSON.parse(window.localStorage.getItem('products')) || [];

    return this.products;
  }

  moveFromCartToStorage() {
    window.localStorage.setItem('products', JSON.stringify(this.products));
  }

  removeItem(index: number) {
    this.products.splice(index, 1);

    window.localStorage.setItem('products', JSON.stringify(this.products));
  }

  get length() {
    return this.products.length;
  }

  get total() {
    return this.products.reduce((acc, product) => product.price * (product.count || 1) + acc, 0);
  }

  get count() {
    return this.products.reduce((acc, product) => (product.count || 1) + acc, 0)
  }
}
