import db from "$lib/db";

import { redirect } from "@sveltejs/kit";

export async function load() {
  let user = db.user;
  let entries = await db.entries.all();

  if (!user) {
    throw redirect(301, "/");
  } else {
    return {
      userData: user,
      entries: entries,
    };
  }
}
