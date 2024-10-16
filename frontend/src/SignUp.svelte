<script>
  // Import the createEventDispatcher function from Svelte
  import { createEventDispatcher } from 'svelte';
  // Create a dispatch function to send events to the parent component
  const dispatch = createEventDispatcher();

  // State variables for the signup form
  let username = '';
  let password = '';
  let confirmPassword = '';
  let error = '';

  // Function to handle the signup process
  async function handleSignUp() {
    // Check if passwords match
    if (password !== confirmPassword) {
      error = 'Passwords do not match';
      return;
    }

    try {
      // Send a POST request to the signup API endpoint
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include' // Include cookies in the request
      });

      const bodyJson = await response.json();
      
      if (response.ok) {
        // If signup is successful, dispatch a 'signup' event with the username and userId
        dispatch('signup', { username, userId: bodyJson.userId });
      } else {
        // If signup fails, set the error message
        error = bodyJson.message || 'Signup failed. Please try again.';
      }
    } catch (err) {
      console.error('Error during signup:', err);
      error = 'An unexpected error occurred. Please try again later.';
    }
  }

  // Function to navigate to the login page
  function goToLogin() {
    dispatch('navigate', { page: 'login' });
  }
</script>

<div class="signup-form">
  <h2>Sign Up</h2>
  <!-- Display error message if there is one -->
  {#if error}
    <p class="error">{error}</p>
  {/if}
  <!-- Signup form -->
  <form on:submit|preventDefault={handleSignUp}>
    <div class="form-group">
      <label for="username">Username:</label>
      <input type="text" id="username" bind:value={username} required>
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} required>
    </div>
    <div class="form-group">
      <label for="confirm-password">Confirm Password:</label>
      <input type="password" id="confirm-password" bind:value={confirmPassword} required>
    </div>
    <button type="submit">Sign Up</button>
  </form>
  <!-- Link to login page -->
  <div class="login-link">
    <button on:click={goToLogin}>Already have an account? Log in here</button>
  </div>
</div>

<style>
  /* Styles for the signup form container */
  .signup-form {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  /* Styles for form groups (label + input) */
  .form-group {
    margin-bottom: 15px;
  }
  /* Styles for labels */
  label {
    display: block;
    margin-bottom: 5px;
  }
  /* Styles for input fields */
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  /* Styles for buttons */
  button {
    width: 100%;
    padding: 10px;
    background-color: #023EB1;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  /* Styles for error messages */
  .error {
    color: red;
    margin-bottom: 10px;
  }
  /* Styles for the login link section */
  .login-link {
    margin-top: 15px;
    text-align: center;
  }
  /* Styles for the login link button */
  .login-link button {
    background: none;
    border: none;
    color: #65DFFF;
    text-decoration: underline;
    cursor: pointer;
  }
</style>