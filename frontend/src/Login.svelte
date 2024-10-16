<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // Variables for the login form
  let username = '';
  let password = '';
  let error = '';

  // Function to handle the login process
  async function handleLogin() {
    try {
      console.log('Attempting to login with:', { username }); 
      // Send a POST request to the login API endpoint
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include' // Include cookies in the request
      });
      
      console.log('Server response status:', response.status);
      const data = await response.json();
      console.log('Server response data:', data);
      
      if (data.success) {
        // If login is successful, dispatch a 'login' event with the username
        dispatch('login', { username });
      } else {
        // If login fails, set the error message
        error = data.message || 'Invalid username or password';
      }
    } catch (err) {
      console.error('Login error:', err);
      error = 'Error connecting to server';
    }
  }

  // Function to navigate to the sign-up page
  function goToSignUp() {
    dispatch('navigate', { page: 'signup' });
  }
</script>

<div class="login-form">
  <h2>Login</h2>
  <!-- Display error message if there is one -->
  {#if error}
    <p class="error">{error}</p>
  {/if}
  <!-- Login form -->
  <form on:submit|preventDefault={handleLogin}>
    <div class="form-group">
      <label for="username">Username:</label>
      <input type="text" id="username" bind:value={username} required>
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} required>
    </div>
    <button type="submit">Login</button>
  </form>
  <!-- Link to sign-up page -->
  <div class="signup-link">
    <button on:click={goToSignUp}>Don't have an account? Sign up here</button>
  </div>
</div>

<style>
  /* Styles for the login form container */
  .login-form {
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
    width: 92%;
    padding: 10px;
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
  button:hover {
    background-color: #1352c7;
  }
  /* Styles for error messages */
  .error {
    color: red;
    margin-bottom: 10px;
  }
  /* Styles for the sign-up link section */
  .signup-link {
    margin-top: 15px;
    text-align: center;
  }
  /* Styles for the sign-up link button */
  .signup-link button {
    background: none;
    border: none;
    color: #65DFFF;
    text-decoration: underline;
    cursor: pointer;
  }
</style>