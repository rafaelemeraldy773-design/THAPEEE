document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Tape Singkong",
        img: "singkong-tape1.jpg",
        price: 20000,
      },
      {
        id: 2,
        name: "Bolu Tape Singkong",
        img: "bolu-tape1.jpg",
        price: 45000,
      },
      {
        id: 3,
        name: "Bola Tape Singkong",
        img: "bola-tape1.jpg",
        price: 15000,
      },
      {
        id: 4,
        name: "Pudding Tape Singkong",
        img: "pudding-tape.jpeg",
        price: 10000,
      },
      {
        id: 5,
        name: "Smoothie Tape Singkong",
        img: "smoothie-tape1.jpg",
        price: 20000,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // Jika cart kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika barang sudah ada, cek apakah barang sama atau tidak
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan total
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },

    clear() {
      // 🔥 fungsi untuk kosongkan cart
      this.items = [];
      this.total = 0;
      this.quantity = 0;
    },

    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);

      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Konversi Rp
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
