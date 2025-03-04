<template>
  <div class="ticket-form">
    <h2>Create Parking Ticket</h2>
    <div class="form-container">
      <div class="camera-section" v-if="showCamera">
        <div class="camera-container">
          <video ref="video" width="400" height="300" autoplay></video>
          <canvas ref="canvas" width="400" height="300" style="display: none;"></canvas>
        </div>
        <div class="camera-controls">
          <button @click="captureImage" class="btn btn-primary">Capture Plate</button>
          <button @click="toggleCamera" class="btn btn-secondary">Cancel</button>
        </div>
      </div>
      
      <form @submit.prevent="createTicket" class="form">
        <div class="form-group">
          <label for="vehicleNumber">Vehicle Number:</label>
          <div class="input-group">
            <input 
              id="vehicleNumber"
              v-model="vehicleNumber" 
              placeholder="Enter vehicle plate number" 
              required 
              class="form-control"
            />
            <button type="button" @click="toggleCamera" class="btn btn-info">
              <i class="fas fa-camera"></i> Scan
            </button>
          </div>
          <small v-if="plateRecognized" class="text-success">
            Plate recognized: {{ vehicleNumber }}
          </small>
        </div>
        
        <div class="form-group">
          <label for="vehicleType">Vehicle Type:</label>
          <select id="vehicleType" v-model="vehicleType" class="form-control" required>
            <option value="">Select vehicle type</option>
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="truck">Truck</option>
            <option value="bus">Bus</option>
          </select>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn btn-success">Create Ticket</button>
          <button type="button" @click="resetForm" class="btn btn-outline-secondary">Reset</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vehicleNumber: '',
      vehicleType: '',
      showCamera: false,
      plateRecognized: false,
      stream: null
    };
  },
  methods: {
    async createTicket() {
      try {
        const response = await fetch('/api/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            vehicleNumber: this.vehicleNumber,
            vehicleType: this.vehicleType,
            entryTime: new Date().toISOString()
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to create ticket');
        }
        
        const ticket = await response.json();
        this.$emit('ticket-created', ticket);
        this.resetForm();
        
        // Show success message
        alert(`Ticket created successfully for ${this.vehicleNumber}`);
      } catch (error) {
        console.error('Error creating ticket:', error);
        alert('Failed to create ticket. Please try again.');
      }
    },
    
    resetForm() {
      this.vehicleNumber = '';
      this.vehicleType = '';
      this.plateRecognized = false;
      this.stopCamera();
    },
    
    toggleCamera() {
      this.showCamera = !this.showCamera;
      if (this.showCamera) {
        this.startCamera();
      } else {
        this.stopCamera();
      }
    },
    
    async startCamera() {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (this.$refs.video) {
          this.$refs.video.srcObject = this.stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Could not access camera. Please check permissions.');
        this.showCamera = false;
      }
    },
    
    stopCamera() {
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
        this.stream = null;
      }
      this.showCamera = false;
    },
    
    captureImage() {
      const video = this.$refs.video;
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');
      
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get image data from canvas
      const imageData = canvas.toDataURL('image/jpeg');
      
      // In a real application, you would send this image to an ANPR API
      // For now, we'll simulate ANPR with a random plate number if empty
      this.processImageForANPR(imageData);
    },
    
    processImageForANPR(imageData) {
      // Simulate ANPR processing
      // In a real application, you would call an ANPR API here
      console.log('Processing image for ANPR...');
      
      // Simulate a delay for processing
      setTimeout(() => {
        // If no vehicle number is entered, generate a random one for demo purposes
        if (!this.vehicleNumber) {
          const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ';
          const randomLetters = () => letters.charAt(Math.floor(Math.random() * letters.length));
          const randomDigits = () => Math.floor(Math.random() * 10);
          
          this.vehicleNumber = `${randomLetters()}${randomLetters()} ${randomDigits()}${randomDigits()}${randomDigits()}${randomDigits()} ${randomLetters()}${randomLetters()}`;
        }
        
        this.plateRecognized = true;
        this.stopCamera();
      }, 1000);
    }
  },
  
  beforeUnmount() {
    this.stopCamera();
  }
};
</script>

<style scoped>
.ticket-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.camera-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.camera-container {
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
}

.camera-controls {
  display: flex;
  gap: 10px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input-group {
  display: flex;
  gap: 10px;
}

.form-control {
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  border: none;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #007bff;
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

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-outline-secondary {
  background-color: transparent;
  border: 1px solid #6c757d;
  color: #6c757d;
}

.btn:hover {
  opacity: 0.9;
}

.text-success {
  color: #28a745;
}
</style>
