<template>
  <div id="app">
    <header class="app-header">
      <div class="logo">
        <img src="./assets/logo.png" alt="Parking Logo" v-if="false" />
        <h1>Parking Management System</h1>
      </div>
      <nav class="main-nav">
        <button
          @click="activeTab = 'tickets'"
          :class="{ active: activeTab === 'tickets' }"
        >
          Tickets
        </button>
        <button
          @click="activeTab = 'dashboard'"
          :class="{ active: activeTab === 'dashboard' }"
        >
          Dashboard
        </button>
        <button
          @click="activeTab = 'settings'"
          :class="{ active: activeTab === 'settings' }"
        >
          Settings
        </button>
      </nav>
    </header>

    <main class="app-content">
      <div v-if="activeTab === 'tickets'" class="tickets-container">
        <TicketForm @ticket-created="fetchTickets" />
        <TicketList :tickets="tickets" @refresh-tickets="fetchTickets" />
      </div>

      <div v-else-if="activeTab === 'dashboard'" class="dashboard-container">
        <div class="dashboard-header">
          <h2>Parking Dashboard</h2>
          <div class="date-display">{{ currentDate }}</div>
        </div>
      </div>

      <div v-else-if="activeTab === 'settings'" class="settings-container">
        <h2>Application Settings</h2>

        <div class="settings-section">
          <h3>Parking Rates</h3>
          <div class="rate-settings">
            <div class="rate-item">
              <label for="carRate">Car Rate (per hour):</label>
              <div class="rate-input">
                <span class="currency">$</span>
                <input
                  type="number"
                  id="carRate"
                  v-model="settings.rates.car"
                  min="0"
                  step="0.5"
                />
              </div>
            </div>

            <div class="rate-item">
              <label for="motorcycleRate">Motorcycle Rate (per hour):</label>
              <div class="rate-input">
                <span class="currency">$</span>
                <input
                  type="number"
                  id="motorcycleRate"
                  v-model="settings.rates.motorcycle"
                  min="0"
                  step="0.5"
                />
              </div>
            </div>

            <div class="rate-item">
              <label for="truckRate">Truck Rate (per hour):</label>
              <div class="rate-input">
                <span class="currency">$</span>
                <input
                  type="number"
                  id="truckRate"
                  v-model="settings.rates.truck"
                  min="0"
                  step="0.5"
                />
              </div>
            </div>

            <div class="rate-item">
              <label for="busRate">Bus Rate (per hour):</label>
              <div class="rate-input">
                <span class="currency">$</span>
                <input
                  type="number"
                  id="busRate"
                  v-model="settings.rates.bus"
                  min="0"
                  step="0.5"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <h3>ANPR Settings</h3>
          <div class="anpr-settings">
            <div class="setting-item">
              <label for="anprEnabled">Enable ANPR:</label>
              <input
                type="checkbox"
                id="anprEnabled"
                v-model="settings.anpr.enabled"
              />
            </div>

            <div class="setting-item" v-if="settings.anpr.enabled">
              <label for="anprConfidence">Minimum Confidence Level (%):</label>
              <input
                type="range"
                id="anprConfidence"
                v-model="settings.anpr.minConfidence"
                min="50"
                max="95"
                step="5"
              />
              <span>{{ settings.anpr.minConfidence }}%</span>
            </div>
          </div>
        </div>

        <div class="settings-actions">
          <button @click="saveSettings" class="btn-save">Save Settings</button>
          <button @click="resetSettings" class="btn-reset">
            Reset to Defaults
          </button>
        </div>
      </div>
    </main>

    <footer class="app-footer">
      <p>&copy; 2025 Parking Management System | Version 1.0.0</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TicketForm from "./components/TicketForm.vue";
import TicketList from "./components/TicketList.vue";

const activeTab = ref("tickets");
const tickets = ref([]);
const currentDate = ref(new Date().toLocaleDateString());

const fetchTickets = async () => {
  try {
    const response = await fetch("/api/tickets");
    tickets.value = await response.json();
  } catch (error) {
    console.error("Error fetching tickets:", error);
  }
};

onMounted(() => {
  fetchTickets();
});
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

.app-header {
  background-color: #34495e;
  padding: 1rem;
  color: white;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo img {
  height: 40px;
}

.main-nav {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.main-nav button {
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.main-nav button.active {
  background-color: #2c3e50;
}

.app-content {
  padding: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.date-display {
  font-size: 1.1rem;
  color: #666;
}
</style>
