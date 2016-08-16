export default function loadProducts() {
  return new Promise((resolve) => {
    resolve([
      {
        id: 1,
        name: 'Curse of Monkey Island',
        price: 5
      },
      {
        id: 2,
        name: 'Grim Fandango',
        price: 10
      }
    ]);
  });
}
