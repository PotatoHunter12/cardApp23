<script>
import axios from 'axios';

export default {
  data() {
    return {
      profile: [],
      newProfileName: '',
      errorMessage: '',
    };
  },
  created() {
  const token = localStorage.getItem('token');
  if (!token) {
    this.$router.push('/login'); // Redirect to login if no token exists
  } else {
    this.fetchProfiles(); // Fetch profiles if authenticated
  }
},

  methods: {
    async fetchProfiles() {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        
        const response = await axios.get('http://localhost:3000/api/users/profiles', {
          headers: {
            Authorization: token,
          },
        });
        this.profile = response.data;
        console.log(this.profile);
        
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Failed to fetch profile.';
      }
    },
    async addProfile() {
      console.log('Adding profile...');
      try {
        const token = localStorage.getItem('token');
        await axios.post(
          '/api/users',
          { username: this.newProfileName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Profile added successfully');
        this.newProfileName = '';
        this.fetchProfiles(); // Refresh profiles
      } catch (error) {
        console.error('Error adding profile:', error);
        this.errorMessage = 'Error adding profile.';
      }
    },
    async deleteProfile(profileId) {
      console.log('Deleting profile:', profileId);
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`api/users/${profileId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Profile deleted successfully');
        this.fetchProfiles(); // Refresh profiles
      } catch (error) {
        console.error('Error deleting profile:', error);
        this.errorMessage = 'Error deleting profile.';
      }
    },
    logout() {
      console.log('Logging out...');
      localStorage.removeItem('token'); // Clear token
      this.$router.push('/login'); // Redirect to login page
    },
  },
};
</script>

<template>
    <div>
      <h1>{{ this.profile.username }}</h1>
  
      <!-- Show error message if there's an error -->
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  
      <!-- Show profiles if they are fetched -->
      <div>
        {{ this.profile.username }}
      </div>

      <!-- Input to add a new profile -->
      <div>
        <input v-model="newProfileName" placeholder="Enter profile name" />
        <button @click="addProfile" :disabled="newProfileName.trim() === ''">Add Profile</button>
      </div>
  
      <!-- Logout button -->
      <button @click="logout" style="margin-top: 10px;">Logout</button>
    </div>
  </template>
  