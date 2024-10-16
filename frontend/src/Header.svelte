<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // Props with default values
  export let isLoggedIn = false; // Indicates if a user is logged in
  export let username = ''; // Stores the username of the logged-in user

  // Logo image source
  let logoSrc = "src/logo_image.png";

  // Handler for logout action
  function handleLogout() {
    dispatch('logout');
  }
</script>

<header>
  <div class="header-content">
    <!-- Logo section -->
    <div class="logo">
      <img src={logoSrc} alt="Workout App Logo" />
    </div>
    <!-- App title -->
    <h1>Workout App</h1>
    <!-- User info and logout button (only shown when logged in) -->
    {#if isLoggedIn}
      <div class="user-info">
        <span class="name-display">{username}</span>
        <button class="logout-btn" on:click={handleLogout}>Logout</button>
      </div>
    {/if}
  </div>
</header>

<style>
  /* Header styles */
  header {
    background-color: #f0f0f0;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 80px;
  }

  /* Header content layout */
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    padding: 0 1rem;
  }

  /* Logo styles */
  .logo {
    flex: 0 0 auto;
    padding-left: 0;
  }

  .logo img {
    height: 60px;
    width: auto;
  }

  /* Title styles */
  h1 {
    color: lightskyblue;
    font-size: clamp(1rem, 4vw, 2rem);
    margin: 0;
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  /* User info section styles */
  .user-info {
    color: lightskyblue;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: clamp(0.7rem, 2vw, 1.1rem);
    flex: 0 0 auto;
    margin-left: auto;
  }

  .name-display {
    margin-right: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
  }

  /* Logout button styles */
  .logout-btn {
    background-color: #f28e2a;
    border: none;
    color: white;
    padding: 0.3em 0.6em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 0.9em;
    cursor: pointer;
    border-radius: 5px;
    white-space: nowrap;
  }

  /* Responsive design for smaller screens */
  @media (max-width: 768px) {
    .header-content {
      padding: 0 0.5rem;
    }
    .logo img {
      height: 40px;
    }
    .name-display {
      max-width: 100px;
    }
  }

  @media (max-width: 480px) {
    .logo img {
      height: 30px;
    }
    .name-display {
      display: none;
    }
    h1 {
      font-size: clamp(0.8rem, 5vw, 1.2rem);
    }
  }
</style>