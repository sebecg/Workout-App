<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // Function to handle navigation to different pages
  function navigateTo(page) {
    dispatch('navigate', { page });
  }
</script>

<div class="home-page">
  <!-- Main heading -->
  <h2>Track Your Workouts!</h2>
  <!-- Navigation buttons -->
  <button on:click={() => navigateTo('add-workout')}>Add New Workout</button>
  <button on:click={() => navigateTo('previous-workouts')}>View Previous Workouts</button>
</div>

<style>
  /* Home page container styles */
  .home-page {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }

  /* Button styles */
  button {
    width: 100%;
    padding: 10px;
    background-color: #023EB1;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
</style>