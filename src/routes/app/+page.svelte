<script lang="ts">
  import type { User } from "@supabase/supabase-js";
  import type { Entry } from "$lib/db";
  import db from "$lib/db";

  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  import { Button, Link, EditModal } from "$lib/components/stuff";
  import { text } from "@sveltejs/kit";

  export let data;
  let userData: User;
  let entries = data.entries as Entry[];
  let isDialogOpen = false;
  let currentEntry: Entry | null = null;
  let currentText = "";

  onMount(() => {
    data.userData.subscribe(async (value) => {
      userData = value as User;

      let date = new Date(Date.now());
      let day = date.getDate();
      let dayString = "";
      if (day < 10) {
        dayString = `0${day}`;
      } else {
        dayString = day.toString();
      }
      let monthdateyear = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${dayString}`;

      let newEntry = true;
      data.entries?.forEach((entry) => {
        if (entry.date === monthdateyear) {
          newEntry = false;
        }
      });

      if (newEntry) {
        const prompt = await db.prompts.randomPrompt();
        await db.entries.create({
          date: new Date(Date.now()),
          body: "",
          prompt: prompt.prompt,
          user_id: userData?.id,
        });
        goto("/app");
      }
    });
  });

  async function signout() {
    await db.signOut();
    goto("/");
  }

  function toggleDialog(entry: Entry) {
    isDialogOpen = true;
    currentEntry = entry;
    currentText = entry.body;
  }

  function handleDialogClose() {
    isDialogOpen = false;
    currentEntry = null;
  }

  async function saveEntry() {
    if (currentEntry) {
      let updatedEntry = { ...currentEntry, body: currentText };
      await db.entries.update(updatedEntry);
      handleDialogClose();
    }
  }
</script>

<div class="center">
  {#if userData}
    <h1>Welcome back, {userData.user_metadata.first_name}</h1>
    <form on:submit|preventDefault={signout}>
      <Button>Sign out</Button>
    </form>
  {:else}
    <p>Loading...</p>
  {/if}

  <h1>Journal Entries</h1>

  {#each entries as entry}
    <a on:click={() => toggleDialog(entry)}><h2>{entry.date}</h2></a>
    {#if isDialogOpen && currentEntry === entry}
      <EditModal
        isOpen={isDialogOpen}
        title={entry.date.toString()}
        onClose={handleDialogClose}
      >
        <h2>Prompt: {entry.prompt}</h2>
        <textarea bind:value={currentText}></textarea>
        <Button on:click={saveEntry}>Save</Button>
      </EditModal>
    {/if}
  {/each}
</div>

<style lang="scss">
  a {
    color: $link-color;
    text-decoration: none;
    cursor: pointer;
  }

  textarea {
    width: 100%;
    height: 150px;
    padding: 10px;
    background-color: $input-bg;
    color: $text-color;
    border: 1px solid $accent;
    border-radius: 4px;
    font-family: "Arial", sans-serif;
    font-size: 1rem;
    resize: vertical;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: $destructive;
      box-shadow: 0 0 5px rgba($destructive, 0.5);
    }
  }
</style>
