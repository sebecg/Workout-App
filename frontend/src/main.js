// Import the global CSS file
import './app.css'

// Import the main App component
import App from './App.svelte'

// Create a new instance of the App component
const app = new App({
  // Mount the app to the DOM element with id 'app'
  target: document.getElementById('app'),
})

// Export the app instance as the default export
export default app