<template>
  <div class="auth-container">
    <h1 class="auth-title">Register</h1>
    <form @submit.prevent="register" class="auth-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          id="username"
          v-model="username"
          placeholder="Enter username"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          placeholder="Enter email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="Enter password"
          required
        />
      </div>
      <button type="submit" class="btn register-button">Register</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p class="auth-link">
      Already have an account? <router-link to="/login">Login here</router-link>
    </p>
  </div>
  <button type="button" class="btn2 back-btn" @click="goBack">
          BACK
  </button>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async register() {
      if (!this.username.trim() || !this.password.trim()) {
        this.errorMessage = "All fields are required.";
        return;
      }
      try {
        await axios.post("http://localhost:3000/api/users/register", {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.$router.push("/login");
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "An error occurred. Please try again.";
      }
    },
    goBack() {
      this.$router.push({ name: 'home' }); // Redirect to the home page
    },
  },
};
</script>

<style scoped>
/* Main container styling */
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f4f4f9; /* Matches background */
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
  color: #333;
}

/* Title styling */
.auth-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Form layout */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0 15px;
}
.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Input fields */
.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: 17px;
  text-align: left;
  width: 100%; /* Align label to the input */
}

.form-group input {
  padding: 10px;
  font-size: 16px;
  width: 90%; /* Prevent input fields from touching edges */
  max-width: 360px; /* Keep them consistent in size */
  border: 2px solid white;
  border-radius: 8px;
  background-color: #ffffff;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
}

/* Button styling */
.btn {
  padding: 10px 15px;
  border: none;
  background-color: #ff4757; /* Button color */
  color: white;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: #e33d4f;
  transform: scale(1.05);
}

.btn:active {
  transform: scale(0.95);
}

/* Specific register button */
.register-button {
  font-family: "Comic Sans MS", "Comic Sans", cursive;
}

/* Error message styling */
.error-message {
  margin-top: 15px;
  color: #94001b;
  font-weight: bold;
  font-size: 14px;
}

/* Link to login */
.auth-link {
  margin-top: 20px;
  font-size: 14px;
  color: #333;
}

.auth-link a {
  color: #ff4757;
  font-weight: bold;
  text-decoration: none;
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>
