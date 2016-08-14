export default function loadProducts() {
  return new Promise((resolve) => {
    resolve([
      {
        name: 'Curse of Monkey Island',
        price: '5c'
      },
      {
        name: 'Grim Fandango',
        price: '10c'
      }
    ]);
  });
}
