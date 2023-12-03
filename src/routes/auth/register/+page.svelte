<script lang="ts">
  import { Input, Button, Link, Error } from "$lib/components/stuff";
  import db from "$lib/db";

  import { goto } from "$app/navigation";

  let firstName: string = "";
  let email: string = "";
  let password: string = "";

  let errorMessage: string;

  async function submitForm() {
    let res = await db.signUp(firstName, email, password);
    if (res.error) {
      errorMessage = res.error.message;
      return;
    } else {
      goto("/app")
    }
  }
</script>

<div class="center">
  {#if errorMessage}
    <Error>{errorMessage}</Error>
  {/if}

  <h2>Welcome to Journey!</h2>
  <form on:submit|preventDefault={submitForm}>
    <Input
      name="firstname"
      placeholder="First name"
      helpText="First Name"
      bind:value={firstName}
    ></Input>
    <Input
      name="email"
      placeholder="Email Address"
      helpText="Email Address"
      type="email"
      bind:value={email}
    ></Input>
    <Input
      name="password"
      placeholder="Password"
      helpText="Password"
      type="password"
      bind:value={password}
    ></Input>
    <div class="form-footer">
      <div class="align-left">
        <Link href="/auth/login">Need to login?</Link>
      </div>
      <div class="align-right">
        <Button>Register</Button>
      </div>
    </div>
  </form>
</div>

<style lang="scss">
  .form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
