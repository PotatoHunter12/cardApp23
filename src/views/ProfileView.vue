<script>
import axios from 'axios';

export default {
  data() {
    return {
      profile: [],
      newProfileName: '',
      pictures: ["spades.png", "hearts.png", "diamonds.png", "clubs.png"],
      selectedPicture: "spades.png",
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
    selectPicture(picture) {
      this.selectedPicture = picture; // Update selected picture
    },
    goBack() {
      this.$router.push({name:'home'}); // Replace with your "Back" route
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
    <!-- Profile Container -->
    <div class="profile-container">
      <h1 class="profile-title">
        Profile: {{ profile?.username || "Loading..." }}
      </h1>

      <!-- Profile Picture Section -->
      <div class="profile-picture-container">
        <img
          :src="`/${selectedPicture}`"
          alt="Profile Picture"
          class="profile-picture"
        />

        <div class="picture-selector">
          <button
            v-for="picture in pictures"
            :key="picture"
            @click="selectPicture(picture)"
            :class="{ selected: selectedPicture === picture }"
            class="picture-btn"
          >
            {{ picture.split('.')[0] }}
          </button>
        </div>
      </div>

      <!-- Logout Button -->
      <div class="button-container">
        <button class="btn logout-btn" @click="logout">Logout</button>
      </div>
    </div>

    <!-- Back Button -->
    <button class="btn back-btn" @click="goBack">Back</button>
  </div>
</template>


<style scoped>
/* Main container */
.profile-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f4f4f9; /* Matches app background */
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
  color: #333;
}

/* Title styling */
.profile-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-transform: uppercase;
}

/* Profile picture section */
.profile-picture-container {
  margin-bottom: 20px;
}

.profile-picture {
  width: 120px; /* Adjust the size of the circle */
  height: 120px; /* Adjust the size of the circle */
  border-radius: 50%; /* Keep the circular shape */
  border: 2px solid #ff4757; /* Border color */
  object-fit: scale-down; /* Ensures the entire image is visible inside the circle */
  margin-bottom: 10px;
  padding: 10px; /* Adds space between the image and the border */
  background-color: white; /* Background to highlight the image inside the circle */
}



.picture-selector {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.picture-btn {
  padding: 5px 10px;
  border: none;
  background-color: #ff4757;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
  transition: background-color 0.3s ease;
}

.picture-btn.selected {
  background-color: #ff4757; /* Highlight selected button */
  font-weight: bold;
}

.picture-btn:hover {
  background-color: #e33d4f;
}

/* Buttons Section */
.button-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.btn {
  padding: 10px 15px;
  border: none;
  background-color: #ff4757;
  color: white;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: #e33d4f;
}

.back-btn {
  background-color: #5a5a5a; /* Neutral color for back button */
}

.back-btn:hover {
  background-color: #424242;
}

.logout-btn {
  background-color: #ff4757; /* Logout-specific color */
}

.logout-btn:hover {
  background-color: #e33d4f;
}
</style>