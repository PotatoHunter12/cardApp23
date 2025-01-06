<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="register">
        <div>
          <label for="username">Username:</label>
          <input id="username" v-model="username" placeholder="Enter username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" type="password" v-model="password" placeholder="Enter password" required />
        </div>
        <button type="submit">Register</button>
      </form>
  
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      <p>Already have an account? <router-link to="/login">Login here</router-link></p>
    </div>
  </template>
  
  <script>
  import api from '@/services/api'; // Axios service for API requests
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async register() {
        if (!this.username.trim() || !this.password.trim()) {
          this.errorMessage = 'All fields are required.';
          return;
        }
  
        try {
          // Make a POST request to the backend /register endpoint
          await api.post('/register', {
            username: this.username,
            password: this.password,
          });
  
          // Redirect to login page on successful registration
          this.$router.push('/login');
        } catch (error) {
          // Handle registration errors
          if (error.response && error.response.data.message) {
            this.errorMessage = error.response.data.message;
          } else {
            this.errorMessage = 'An error occurred. Please try again.';
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;
  }
  input {
    margin-bottom: 10px;
    padding: 8px;
    font-size: 14px;
  }
  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  