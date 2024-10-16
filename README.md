# Workout-App
Year 13 DGT AS3.3, AS3.4, AS3.7

## Project dependencies  

- Node.js (v12 or higher)
- npm (v20 or higher)
- MongoDB Community Edition (v4.0 or higher)



## Setup
To install javascript dependencies:

```bash
cd frontend;
npm install;

cd .. # cd back into root of project

cd backend;
npm install;
```

Refer below for MongoDB setup. 

### MongoDB Setup

1. Install MongoDB Community Edition on your local system if you haven't already. You can find installation instructions for your operating system here:
   - [Install on Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)
   - [Install on macOS](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)
   - [Install on Linux](https://www.mongodb.com/docs/manual/administration/install-on-linux/)

2. After installation, ensure the MongoDB service is running:
   - On Windows: 
     - The MongoDB service should start automatically. If it doesn't, you can start it from the Services application.
   - On macOS: 
     ```
     brew services start mongodb-community
     ```
   - On Linux: 
     ```
     sudo systemctl start mongod
     ```

3. The application is configured to connect to a local MongoDB instance running on the default port (`localhost:27017`). If your local MongoDB is running on a different host or port, update the connection string in `app.js`:
   ```javascript
   mongoose.connect('mongodb://localhost:27017/workoutapp', { useNewUrlParser: true, useUnifiedTopology: true });
   ```

4. MongoDB will automatically create the `workoutapp` database when the application first connects to it.

### Note on Security

This application uses a hardcoded secret for sessions. In a production environment, you should use a strong, randomly generated secret and store it securely (e.g., in an environment variable).


### Running the app
```bash
# assuming you are in project root directory
cd backend
npm run dev
```
In a different terminal:
```bash
# assuming you are in project root directory
cd frontend
npm run dev
```
You will have to make sure the mongoDB service is running which will depend on your platform.