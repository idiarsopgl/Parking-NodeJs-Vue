<template>
  <div class="ticket-list">
    <div class="header">
      <h2>Active Parking Tickets</h2>
      <div class="controls">
        <button @click="refreshTickets" class="btn btn-refresh">
          <i class="fas fa-sync"></i> Refresh
        </button>
        <input 
          v-model="searchQuery" 
          placeholder="Search by plate number..." 
          class="search-input"
          @input="filterTickets"
        />
      </div>
    </div>
    
    <div v-if="loading" class="loading">
      Loading tickets...
    </div>
    
    <div v-else-if="filteredTickets.length === 0" class="no-tickets">
      No parking tickets found.
    </div>
    
    <div v-else class="tickets-table-container">
      <table class="tickets-table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Vehicle Number</th>
            <th>Vehicle Type</th>
            <th>Entry Time</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in filteredTickets" :key="ticket.id" :class="{ 'long-stay': getStayDuration(ticket) > 180 }">
            <td>{{ ticket.id }}</td>
            <td>{{ ticket.vehicleNumber }}</td>
            <td>{{ ticket.vehicleType || 'Not specified' }}</td>
            <td>{{ formatDate(ticket.entryTime) }}</td>
            <td>{{ formatDuration(getStayDuration(ticket)) }}</td>
            <td class="actions">
              <button @click="checkoutTicket(ticket)" class="btn btn-checkout">
                Checkout
              </button>
              <button @click="viewDetails(ticket)" class="btn btn-view">
                Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Ticket Details Modal -->
    <div v-if="selectedTicket" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Ticket Details</h3>
          <button @click="selectedTicket = null" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="ticket-detail">
            <strong>Ticket ID:</strong> {{ selectedTicket.id }}
          </div>
          <div class="ticket-detail">
            <strong>Vehicle Number:</strong> {{ selectedTicket.vehicleNumber }}
          </div>
          <div class="ticket-detail">
            <strong>Vehicle Type:</strong> {{ selectedTicket.vehicleType || 'Not specified' }}
          </div>
          <div class="ticket-detail">
            <strong>Entry Time:</strong> {{ formatDate(selectedTicket.entryTime) }}
          </div>
          <div class="ticket-detail">
            <strong>Duration:</strong> {{ formatDuration(getStayDuration(selectedTicket)) }}
          </div>
          <div class="ticket-detail" v-if="selectedTicket.exitTime">
            <strong>Exit Time:</strong> {{ formatDate(selectedTicket.exitTime) }}
          </div>
          <div class="ticket-detail" v-if="selectedTicket.amount">
            <strong>Amount Paid:</strong> ${{ selectedTicket.amount.toFixed(2) }}
          </div>
        </div>
        <div class="modal-footer">
          <button @click="checkoutTicket(selectedTicket)" v-if="!selectedTicket.exitTime" class="btn btn-checkout">
            Checkout Vehicle
          </button>
          <button @click="selectedTicket = null" class="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
    
    <!-- Checkout Modal -->
    <div v-if="checkoutMode" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Checkout Vehicle</h3>
          <button @click="cancelCheckout" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="ticket-detail">
            <strong>Vehicle Number:</strong> {{ checkoutTicket.vehicleNumber }}
          </div>
          <div class="ticket-detail">
            <strong>Entry Time:</strong> {{ formatDate(checkoutTicket.entryTime) }}
          </div>
          <div class="ticket-detail">
            <strong>Duration:</strong> {{ formatDuration(getStayDuration(checkoutTicket)) }}
          </div>
          <div class="ticket-detail">
            <strong>Amount Due:</strong> ${{ calculateFee(checkoutTicket).toFixed(2) }}
          </div>
          <div class="payment-section">
            <label for="paymentMethod">Payment Method:</label>
            <select id="paymentMethod" v-model="paymentMethod" class="form-control">
              <option value="cash">Cash</option>
              <option value="card">Credit/Debit Card</option>
              <option value="mobile">Mobile Payment</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="processCheckout" class="btn btn-success">
            Complete Checkout
          </button>
          <button @click="cancelCheckout" class="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tickets'],
  
  data() {
    return {
      loading: false,
      searchQuery: '',
      filteredTickets: [],
      selectedTicket: null,
      checkoutMode: false,
      checkoutTicket: null,
      paymentMethod: 'cash'
    };
  },
  
  created() {
    this.filterTickets();
  },
  
  watch: {
    tickets() {
      this.filterTickets();
    }
  },
  
  methods: {
    filterTickets() {
      if (!this.searchQuery) {
        this.filteredTickets = [...this.tickets];
        return;
      }
      
      const query = this.searchQuery.toLowerCase();
      this.filteredTickets = this.tickets.filter(ticket => 
        ticket.vehicleNumber.toLowerCase().includes(query)
      );
    },
    
    refreshTickets() {
      this.loading = true;
      this.$emit('refresh-tickets');
      
      // Simulate loading delay
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      
      const date = new Date(dateString);
      return date.toLocaleString();
    },
    
    getStayDuration(ticket) {
      const entryTime = new Date(ticket.entryTime);
      const exitTime = ticket.exitTime ? new Date(ticket.exitTime) : new Date();
      
      // Duration in minutes
      return Math.floor((exitTime - entryTime) / (1000 * 60));
    },
    
    formatDuration(minutes) {
      if (minutes < 60) {
        return `${minutes} min`;
      }
      
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      
      if (hours < 24) {
        return `${hours}h ${remainingMinutes}m`;
      }
      
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      
      return `${days}d ${remainingHours}h ${remainingMinutes}m`;
    },
    
    calculateFee(ticket) {
      // Basic fee calculation based on duration and vehicle type
      const durationInHours = this.getStayDuration(ticket) / 60;
      let hourlyRate = 2; // Default rate
      
      // Adjust rate based on vehicle type
      if (ticket.vehicleType === 'motorcycle') {
        hourlyRate = 1;
      } else if (ticket.vehicleType === 'truck' || ticket.vehicleType === 'bus') {
        hourlyRate = 4;
      }
      
      // Calculate fee with minimum 1 hour
      return Math.max(hourlyRate, hourlyRate * Math.ceil(durationInHours));
    },
    
    viewDetails(ticket) {
      this.selectedTicket = { ...ticket };
    },
    
    checkoutTicket(ticket) {
      this.checkoutTicket = { ...ticket };
      this.checkoutMode = true;
      this.selectedTicket = null;
    },
    
    cancelCheckout() {
      this.checkoutMode = false;
      this.checkoutTicket = null;
      this.paymentMethod = 'cash';
    },
    
    async processCheckout() {
      try {
        const exitTime = new Date().toISOString();
        const amount = this.calculateFee(this.checkoutTicket);
        
        const response = await fetch(`/api/tickets/${this.checkoutTicket.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            exitTime,
            amount
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to checkout ticket');
        }
        
        // Refresh tickets after checkout
        this.$emit('refresh-tickets');
        
        // Show success message
        alert(`Checkout successful. Amount paid: $${amount.toFixed(2)}`);
        
        // Close modal
        this.cancelCheckout();
      } catch (error) {
        console.error('Error during checkout:', error);
        alert('Failed to process checkout. Please try again.');
      }
    }
  }
};
</script>

<style scoped>
.ticket-list {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  gap: 10px;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: 200px;
}

.loading, .no-tickets {
  text-align: center;
  padding: 20px;
  color: #6c757d;
}

.tickets-table-container {
  overflow-x: auto;
}

.tickets-table {
  width: 100%;
  border-collapse: collapse;
}

.tickets-table th,
.tickets-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.tickets-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.tickets-table tr:hover {
  background-color: #f8f9fa;
}

.long-stay {
  background-color: #fff3cd;
}

.actions {
  display: flex;
  gap: 5px;
}

.btn {
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  border: none;
  transition: background-color 0.2s;
}

.btn-refresh {
  background-color: #6c757d;
  color: white;
}

.btn-checkout {
  background-color: #28a745;
  color: white;
}

.btn-view {
  background-color: #17a2b8;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #dee2e6;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6c757d;
}

.ticket-detail {
  margin-bottom: 10px;
}

.payment-section {
  margin-top: 20px;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  margin-top: 5px;
}
</style>
