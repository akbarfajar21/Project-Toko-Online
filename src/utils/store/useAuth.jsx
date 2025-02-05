import { register } from "module";
import { create } from "zustand";
import supabase from "../supaClient";

export const useAuth = create((set) => ({
  user: null,
  auth: false,
  full_name: "",
  role: "",
  loading: true,

  register: async (fullName, email, password) => {
    const { data } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log("terjadi kesalahan" + error.message);
    } else {
      try {
        const { error: profileRegister } = await supabase
          .from("profiles")
          .upsert([
            {
              id: data.user.id,
              full_name: fullName,
              email: email,
            },
          ]);

        if (profileRegister) {
          console.log("terjadi kesalahan ketika update user");
        } else {
          set({
            user: data.user,
            auth: true,
            full_name: fullName,
            loading: false,
          });
          console.log("user berhasil di tambahkan");
        }
      } catch (error) {
        console.log("terjadi kesalahan" + error.message);
      }
    }
  },
}));
