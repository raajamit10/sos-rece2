import { supabase } from "../services/supabase";

export const sendSOS = async (user, message, location) => {
  const { error } = await supabase.from("sos_alerts").insert([
    {
      user_id: user.id,
      message,
      location,
      status: "pending",
    },
  ]);

  if (error) console.log(error);
};