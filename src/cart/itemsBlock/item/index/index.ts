export default function createIndex(index: number) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('item__index');
  wrapper.innerText = (index + 1).toString();

  return wrapper;
}
