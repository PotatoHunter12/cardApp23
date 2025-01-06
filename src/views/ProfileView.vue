<script>
import api from '@/services/api';

export default {
  data() {
    return {
      profiles: [],
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
      console.log('Fetching profiles...');
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        const response = await api.get('/profiles', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Profiles response:', response.data);
        this.profiles = response.data;
      } catch (error) {
        console.error('Error fetching profiles:', error);
        this.errorMessage = 'Failed to load profiles. Please log in again.';
        this.$router.push('/login'); // Redirect to login if token is invalid
      }
    },
    async addProfile() {
      console.log('Adding profile...');
      try {
        const token = localStorage.getItem('token');
        await api.post(
          '/profiles',
          { name: this.newProfileName },
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
        await api.delete(`/profiles/${profileId}`, {
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
      <h1>Your Profiles</h1>
  
      <!-- Show error message if there's an error -->
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  
      <!-- Show profiles if they are fetched -->
      <ul v-if="profiles.length > 0">
        <li v-for="profile in profiles" :key="profile.id">
          {{ profile.name }}
          <button @click="deleteProfile(profile.id)">Delete</button>
        </li>
      </ul>
  
      <!-- Fallback message when no profiles are available -->
      <p v-else>No profiles found. Add a new profile below:</p>
  
      <!-- Input to add a new profile -->
      <div>
        <input v-model="newProfileName" placeholder="Enter profile name" />
        <button @click="addProfile" :disabled="newProfileName.trim() === ''">Add Profile</button>
      </div>
  
      <!-- Logout button -->
      <button @click="logout" style="margin-top: 10px;">Logout</button>
    </div>
  </template>
  