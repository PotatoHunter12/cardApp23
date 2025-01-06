<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input id="username" v-model="username" placeholder="Enter username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" type="password" v-model="password" placeholder="Enter password" required />
        </div>
        <button type="submit">Login</button>
      </form>
  
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await api.post('/login', {
            username: this.username,
            password: this.password,
          });
          // Store the token in localStorage
          localStorage.setItem('token', response.data.token);
  
          // Redirect to the profile page
          this.$router.push('/profile');
        } catch (error) {
          this.errorMessage = 'Invalid username or password.';
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
  