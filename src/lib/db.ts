import { createClient } from "@supabase/supabase-js";
import { writable } from "svelte/store";

import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_API_KEY,
} from "$env/static/public";

export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_API_KEY
);

export type Entry = {
  date: Date;
  body: string;
  prompt: string;
  user_id: string;
};

type Prompt = {
  id: Number;
  prompt: string;
};

const userStore = writable();

supabase.auth.getSession().then(({ data }) => {
  userStore.set(data.session?.user);
});

supabase.auth.onAuthStateChange((event, session) => {
  if (event == "SIGNED_IN" && session) {
    userStore.set(session.user);
  } else if (event == "SIGNED_OUT") {
    console.log("signed out");
    userStore.set(null);
  }
});

export default {
  get user() {
    return userStore;
  },
  signUp(firstName: string, email: string, password: string) {
    return supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
        },
      },
    });
  },
  signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  },
  signOut() {
    return supabase.auth.signOut();
  },
  prompts: {
    async randomPrompt() {
      const { data } = await supabase.from("prompts").select("*");
      const prompts = data as Prompt[];
      return prompts[(prompts.length * Math.random()) | 0];
    },
  },
  entries: {
    async all() {
      const { data } = await supabase.from("entries").select("*");

      return data;
    },
    async create(entry: Entry) {
      const { data } = await supabase
        .from("entries")
        .insert(entry)
        .select()
        .maybeSingle();

      return data;
    },
    async update(entry: Entry) {
      const { data } = await supabase
        .from("entries")
        .update(entry)
        .select()
        .maybeSingle();

      return data;
    },
  },
};
