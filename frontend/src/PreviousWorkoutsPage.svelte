<script>
  // Import necessary functions from Svelte
  import { createEventDispatcher, onMount } from 'svelte';
  // Create a dispatch function to send events to the parent component
  const dispatch = createEventDispatcher();

  // State variable to store the fetched workouts
  let workouts = [];

  // Use onMount to fetch workouts when the component is mounted
  onMount(async () => {
    try {
      // Fetch workouts from the API
      const response = await fetch('http://localhost:5000/api/workouts', {
        credentials: 'include', // Include cookies in the request
      });
      if (response.ok) {
        // If the request is successful, parse the JSON response
        workouts = await response.json();
      } else {
        console.error('Failed to fetch workouts');
      }
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  });

  // Function to navigate back to the home page
  function goBack() {
    dispatch('navigate', { page: 'home' });
  }
</script>

<div class="previous-workouts">
  <h2>Previous Workouts</h2>
  <!-- Conditional rendering based on workouts availability -->
  {#if workouts.length === 0}
    <p>No workouts found.</p>
  {:else}
    <!-- Iterate over workouts and display each one -->
    {#each workouts as workout}
      <div class="workout-item">
        <h3>{workout.exercise}</h3>
        <p>Date: {new Date(workout.createdAt).toLocaleDateString()}</p>
        <table>
          <thead>
            <tr>
              <th>Set</th>
              <th>Reps</th>
              <th>Weight (kg)</th>
            </tr>
          </thead>
          <tbody>
            <!-- Iterate over sets for each workout -->
            {#each workout.sets as set, index}
              <tr>
                <td>{index + 1}</td>
                <td>{set.reps}</td>
                <td>{set.weight}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/each}
  {/if}
  <!-- Button to navigate back to home page -->
  <button on:click={goBack}>Back to Home</button>
</div>

<style>
  /* Styles for the previous workouts container */
  .previous-workouts {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  /* Styles for individual workout items */
  .workout-item {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 20px;
  }
  /* Styles for the workout table */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f27b;
  }
  /* Styles for the back button */
  button {
    padding: 10px;
    background-color: #023EB1;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>