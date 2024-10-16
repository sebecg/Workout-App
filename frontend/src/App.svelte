<script>
  // Import necessary components
  import Header from './Header.svelte';
  import HomePage from './HomePage.svelte';
  import AddWorkoutPage from './AddWorkoutPage.svelte';
  import PreviousWorkoutsPage from './PreviousWorkoutsPage.svelte';
  import Login from './Login.svelte';
  import SignUp from './SignUp.svelte';

  // State variables
  let currentPage = 'login'; // Tracks the current page to display
  let isLoggedIn = false; // Tracks user's login status
  let username = ''; // Stores the logged-in user's username

  // Function to handle navigation between pages
  function handleNavigation(event) {
    currentPage = event.detail.page;
  }

  // Function to handle successful login
  function handleLogin(event) {
    isLoggedIn = true;
    username = event.detail.username;
    currentPage = 'home';
  }

  // Function to handle successful sign up
  function handleSignUp(event) {
    isLoggedIn = true;
    username = event.detail.username;
    currentPage = 'home';
  }

  // Function to handle logout
  function handleLogout() {
    isLoggedIn = false;
    username = '';
    currentPage = 'login';
  }
</script>

<!-- Main app structure -->
<Header {isLoggedIn} {username} on:logout={handleLogout} />
<main>
  {#if !isLoggedIn}
    <!-- Display login or signup page if user is not logged in -->
    {#if currentPage === 'login'}
      <Login on:login={handleLogin} on:navigate={handleNavigation} />
    {:else if currentPage === 'signup'}
      <SignUp on:signup={handleSignUp} on:navigate={handleNavigation} />
    {/if}
  {:else}
    <!-- Display appropriate page based on currentPage if user is logged in -->
    {#if currentPage === 'home'}
      <HomePage on:navigate={handleNavigation} />
    {:else if currentPage === 'add-workout'}
      <AddWorkoutPage on:navigate={handleNavigation} />
    {:else if currentPage === 'previous-workouts'}
      <PreviousWorkoutsPage on:navigate={handleNavigation} />
    {/if}
  {/if}
</main>

<style>
  /* Global styles */
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
  /* Main content styles */
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    padding-top: 0px;
  }
</style>