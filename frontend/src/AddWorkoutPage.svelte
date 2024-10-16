<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // State variables
  let exercise = ''; // Stores the name of the exercise
  let sets = []; // Array to store all sets of the workout
  let currentSet = { reps: '', weight: '' }; // Object to store the current set being edited
  let editingSetIndex = null; // Keeps track of which set is being edited (null if adding new set)

  // Function to add or update a set
  function addSet() {
    if (currentSet.reps && currentSet.weight) {
      if (editingSetIndex !== null) {
        // If editing an existing set, update it
        sets[editingSetIndex] = { ...currentSet };
        editingSetIndex = null;
      } else {
        // If adding a new set, append it to the sets array
        sets = [...sets, { ...currentSet }];
      }
      // Reset the current set
      currentSet = { reps: '', weight: '' };
    }
  }

  // Function to edit an existing set
  function editSet(index) {
    currentSet = { ...sets[index] };
    editingSetIndex = index;
  }

  // Function to delete a set
  function deleteSet(index) {
    sets = sets.filter((_, i) => i !== index);
    if (editingSetIndex === index) {
      editingSetIndex = null;
      currentSet = { reps: '', weight: '' };
    }
  }

  // Function to handle form submission
  async function handleSubmit() {
    if (!exercise || sets.length === 0) {
      alert('Please enter an exercise and at least one set.');
      return;
    }

    try {
      console.log('Sending data:', { exercise, sets });
      // Send POST request to the server
      const response = await fetch('http://localhost:5000/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ exercise, sets }),
        credentials: 'include', // Include credentials for cross-origin requests
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add workout');
      }
      const data = await response.json();
      console.log('Response data:', data);
      alert('Workout added successfully');
      // Reset form after successful submission
      exercise = '';
      sets = [];
      currentSet = { reps: '', weight: '' };
    } catch (error) {
      console.error('Error adding workout:', error.stack);
      alert('An unexpected error occurred: ' + error.message);
    }
  }

  // Function to navigate back to the home page
  function goBack() {
    dispatch('navigate', { page: 'home' });
  }
</script>

<!-- HTML structure for the add workout form -->
<div class="add-workout-form">
  <h2>Add New Workout</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <!-- Exercise input field -->
    <div class="form-group">
      <label for="exercise">Exercise:</label>
      <input type="text" id="exercise" bind:value={exercise} required>
    </div>

    <!-- Display existing sets -->
    <h3>Sets</h3>
    {#each sets as set, index}
      <div class="set-item">
        <span>Set {index + 1}: {set.reps} reps, {set.weight} kg</span>
        <button type="button" on:click={() => editSet(index)}>Edit</button>
        <button type="button" on:click={() => deleteSet(index)}>Delete</button>
      </div>
    {/each}

    <!-- Input fields for adding/editing a set -->
    <div class="form-group">
      <label for="reps">Reps:</label>
      <input type="number" id="reps" bind:value={currentSet.reps} min="0">
    </div>
    <div class="form-group">
      <label for="weight">Weight (kg):</label>
      <input type="number" id="weight" bind:value={currentSet.weight} min="0" step="0.5">
    </div>
    <button type="button" on:click={addSet}>
      {editingSetIndex !== null ? 'Update Set' : 'Add Set'}
    </button>

    <!-- Submit button for the form -->
    <button type="submit">Save Workout</button>
  </form>
  <!-- Back button to return to home page -->
  <button on:click={goBack}>Back to Home</button>
</div>

<style>
  /* Styles for the add workout form */
  .add-workout-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input {
    width: 90%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
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
  .set-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 5px;
    background-color: #f0f0f0af;
    border-radius: 4px;
  }
  .set-item button {
    width: auto;
    padding: 5px 10px;
    margin-top: 0;
    margin-left: 5px;
  }
</style>