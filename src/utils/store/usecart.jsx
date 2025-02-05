import { create } from "zustand";
import supabase from "../supaClient";

const useCartStore = create((set, get) => ({
  cart: [],
  cartCount: 0,

  fetchCart: async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user) return;

    const { data: cartData, error } = await supabase
      .from("keranjang")
      .select("barang_id, quantity")
      .eq("profile_id", user.user.id);

    if (!error) {
      const totalItems = cartData.reduce((acc, item) => acc + item.quantity, 0);
      set({ cart: cartData, cartCount: totalItems });
    }
  },

  addToCart: async (productId) => {
    const { data: user } = await supabase.auth.getUser();
    if (!user) return alert("Silakan login terlebih dahulu!");

    const { data: cartItem, error } = await supabase
      .from("keranjang")
      .select("*")
      .eq("profile_id", user.user.id)
      .eq("barang_id", productId)
      .single();

    if (cartItem) {
      await supabase
        .from("keranjang")
        .update({ quantity: cartItem.quantity + 1 })
        .eq("profile_id", user.user.id)
        .eq("barang_id", productId);
    } else {
      await supabase.from("keranjang").insert([
        {
          profile_id: user.user.id,
          barang_id: productId,
          quantity: 1,
        },
      ]);
    }

    get().fetchCart();
  },
}));

export default useCartStore;
