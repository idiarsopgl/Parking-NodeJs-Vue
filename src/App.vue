<template>
  <div id="app">
    <header class="app-header">
      <div class="logo">
        <img src="./assets/logo.png" alt="Parking Logo" v-if="false" />
        <h1>Parking Management System</h1>
      </div>
      <nav class="main-nav">
        <button @click="activeTab = 'tickets'" :class="{ active: activeTab === 'tickets' }">
          Tickets
        </button>
        <button @click="activeTab = 'dashboard'" :class="{ active: activeTab === 'dashboard' }">
          Dashboard
        </button>
        <button @click="activeTab = 'settings'" :class="{ active: activeTab === 'settings' }">
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
        
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-title">Active Tickets</div>
            <div class="stat-value">{{ activeTicketsCount }}</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-title">Today's Revenue</div>
            <div class="stat-value">${{ todaysRevenue.toFixed(2) }}</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-title">Avg. Stay Duration</div>
            <div class="stat-value">{{ averageDuration }}</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-title">Total Vehicles Today</div>
            <div class="stat-value">{{ todaysVehicles }}</div>
          </div>
        </div>
        
        <div class="chart-container">
          <h3>Hourly Vehicle Count</h3>
          <div class="placeholder-chart">
            <div v-for="(value, index) in hourlyData" :key="index" 
                 class="chart-bar" 
                 :style="{ height: (value * 5) + 'px' }">
              <span class="bar-value">{{ value }}</span>
            </div>
          </div>
          <div class="chart-labels">
            <span v-for="hour in 12" :key="hour">{{ hour * 2 }}</span>
          </div>
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
                <input type="number" id="carRate" v-model="settings.rates.car" min="0" step="0.5" />
              </div>
            </div>
            
            <div class="rate-item">
              <label for="motorcycleRate">Motorcycle Rate (per hour):</label>
              <div class="rate-input">
                <span class="currency">$</span>
                <input type="number" id="motorcycleRate" v-model="settings.rates.motorcycle" min="0" step="0.5" />
              </div>
            </div>
            
            <div class="rate-item">
              <label for="truckRate">Truck Rate (per hour):</label>
              <div class="rate-input">
                <span class="currency">$</span>
                <input type="number" id="truckRate" v-model="settings.rates.truck" min="0" step="0.5" />
              </div>
            </div>
            
            <div class="rate-item">
              <label for="busRate">Bus Rate (per hour):</label>
              <div class="rate-input">
                <span class="currency">$</span>
                <input type="number" id="busRate" v-model="settings.rates.bus" min="0" step="0.5" />
              </div>
            </div>
          </div>
        </div>
        
        <div class="settings-section">
          <h3>ANPR Settings</h3>
          <div class="anpr-settings">
            <div class="setting-item">
              <label for="anprEnabled">Enable ANPR:</label>
              <input type="checkbox" id="anprEnabled" v-model="settings.anpr.enabled" />
            </div>
            
            <div class="setting-item" v-if="settings.anpr.enabled">
              <label for="anprConfidence">Minimum Confidence Level (%):</label>
              <input type="range" id="anprConfidence" v-model="settings.anpr.minConfidence" min="50" max="95" step="5" />
              <span>{{ settings.anpr.minConfidence }}%</span>
            </div>
          </div>
        </div>
        
        <div class="settings-actions">
          <button @click="saveSettings" class="btn-save">Save Settings</button>
          <button @click="resetSettings" class="btn-reset">Reset to Defaults</button>
        </div>
      </div>
    </main>
    
    <footer class="app-footer">
      <p>&copy; 2025 Parking Management System | Version 1.0.0</p>
    </footer>
  </div>
</template>

<script>
import TicketForm from './components/TicketForm.vue';
import TicketList from './components/TicketList.vue';

export default {
  components: {
    TicketForm,
    TicketList
  },
  
  data() {
    return {
      activeTab: 'tickets',
      tickets: [],
      settings: {
        rates: {
          car: 2,
          motorcycle: 1,
          truck: 4,
          bus: 4
        },
        anpr: {
          enabled: true,
          minConfidence: 75
        }
      },
      hourlyData: [3, 5, 8, 12, 10, 7, 9, 14, 20, 15, 12, 6]
    };
  },
  
  computed: {
    currentDate() {
      return new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    },
    
    activeTicketsCount() {
      return this.tickets.filter(ticket => !ticket.exitTime).length;
    },
    
    todaysRevenue() {
      const today = new Date().toDateString();
      return this.tickets
        .filter(ticket => ticket.exitTime && new Date(ticket.exitTime).toDateString() === today)
        .reduce((sum, ticket) => sum + (ticket.amount || 0), 0);
    },
    
    todaysVehicles() {
      const today = new Date().toDateString();
      return this.tickets
        .filter(ticket => new Date(ticket.entryTime).toDateString() === today)
        .length;
    },
    
    averageDuration() {
      const completedTickets = this.tickets.filter(ticket => ticket.exitTime);
      
      if (completedTickets.length === 0) {
        return '0h 0m';
      }
      
      const totalMinutes = completedTickets.reduce((sum, ticket) => {
        const entryTime = new Date(ticket.entryTime);
        const exitTime = new Date(ticket.exitTime);
        return sum + Math.floor((exitTime - entryTime) / (1000 * 60));
      }, 0);
      
      const avgMinutes = Math.floor(totalMinutes / completedTickets.length);
      const hours = Math.floor(avgMinutes / 60);
      const minutes = avgMinutes % 60;
      
      return `${hours}h ${minutes}m`;
    }
  },
  
  methods: {
    async fetchTickets() {
      try {
        const response = await fetch('/api/tickets');
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        this.tickets = await response.json();
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    },
    
    saveSettings() {
      // In a real app, you would save to localStorage or backend
      localStorage.setItem('parkingSettings', JSON.stringify(this.settings));
      alert('Settings saved successfully!');
    },
    
    resetSettings() {
      this.settings = {
        rates: {
          car: 2,
          motorcycle: 1,
          truck: 4,
          bus: 4
        },
        anpr: {
          enabled: true,
          minConfidence: 75
        }
      };
      localStorage.removeItem('parkingSettings');
      alert('Settings reset to defaults!');
    },
    
    loadSettings() {
      const savedSettings = localStorage.getItem('parkingSettings');
      if (savedSettings) {
        this.settings = JSON.parse(savedSettings);
      }
    }
  },
  
  mounted() {
    this.fetchTickets();
    this.loadSettings();
    
    // Refresh tickets every minute
    setInterval(this.fetchTickets, 60000);
  }
};
</script>

<style>
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --accent-color: #e74c3c;
  --text-color: #333;
  --light-gray: #f8f9fa;
  --border-color: #dee2e6;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: #f5f5f5;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo img {
  height: 40px;
}

.logo h1 {
  font-size: 1.5rem;
  color: var(--primary-color);
}

.main-nav {
  display: flex;
  gap: 1rem;
}

.main-nav button {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.main-nav button:hover {
  background-color: var(--light-gray);
}

.main-nav button.active {
  background-color: var(--primary-color);
  color: white;
}

.app-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.tickets-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dashboard-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.date-display {
  font-size: 1rem;
  color: #6c757d;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: var(--light-gray);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.stat-title {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 600;
  color: var(--primary-color);
}

.chart-container {
  margin-top: 2rem;
}

.placeholder-chart {
  height: 200px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 1rem;
  padding: 0 1rem;
  border-bottom: 1px solid var(--border-color);
}

.chart-bar {
  width: 30px;
  background-color: var(--primary-color);
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: height 0.5s;
}

.bar-value {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  color: #6c757d;
  font-size: 0.8rem;
}

.settings-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.settings-section {
  margin-bottom: 2rem;
}

.settings-section h3 {
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

.rate-settings, .anpr-settings {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.rate-item, .setting-item {
  margin-bottom: 1rem;
}

.rate-input {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
}

.currency {
  background-color: var(--light-gray);
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-right: none;
  border-radius: 4px 0 0 4px;
}

.rate-input input {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0 4px 4px 0;
  width: 100px;
}

.settings-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-save, .btn-reset {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-save {
  background-color: var(--secondary-color);
  color: white;
}

.btn-reset {
  background-color: var(--light-gray);
  color: var(--text-color);
}

.app-footer {
  background-color: white;
  padding: 1rem 2rem;
  text-align: center;
  color: #6c757d;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .rate-settings, .anpr-settings {
    grid-template-columns: 1fr;
  }
}
</style>
