<template>
  <div class="ticket-form">
    <h2>Create Parking Ticket</h2>
    <div class="form-container">
      <div class="camera-section" v-if="showCamera">
        <div class="camera-container">
          <video ref="video" width="400" height="300" autoplay></video>
          <canvas
            ref="canvas"
            width="400"
            height="300"
            style="display: none"
          ></canvas>
        </div>
        <div class="camera-controls">
          <button @click="captureImage" class="btn btn-primary">
            Capture Plate
          </button>
          <button @click="toggleCamera" class="btn btn-secondary">
            Cancel
          </button>
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
          <select
            id="vehicleType"
            v-model="vehicleType"
            class="form-control"
            required
          >
            <option value="">Select vehicle type</option>
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="truck">Truck</option>
            <option value="bus">Bus</option>
          </select>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-success">Create Ticket</button>
          <button
            type="button"
            @click="resetForm"
            class="btn btn-outline-secondary"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const video = ref(null);
const canvas = ref(null);
const showCamera = ref(false);
const vehicleNumber = ref("");
const vehicleType = ref("");
const plateRecognized = ref(false);

const toggleCamera = async () => {
  showCamera.value = !showCamera.value;
  if (showCamera.value) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.value.srcObject = stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
      showCamera.value = false;
    }
  } else if (video.value?.srcObject) {
    const tracks = video.value.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    video.value.srcObject = null;
  }
};

const captureImage = () => {
  const context = canvas.value.getContext("2d");
  context.drawImage(video.value, 0, 0, 400, 300);
  // Here you would typically send the image to an ANPR service
  // For now, we'll just simulate plate recognition
  simulatePlateRecognition();
};

const simulatePlateRecognition = () => {
  // Simulate ANPR processing
  setTimeout(() => {
    const mockPlate = "ABC" + Math.floor(Math.random() * 1000);
    vehicleNumber.value = mockPlate;
    plateRecognized.value = true;
    toggleCamera();
  }, 1000);
};

const createTicket = async () => {
  try {
    const response = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vehicleNumber: vehicleNumber.value,
        vehicleType: vehicleType.value,
      }),
    });

    if (response.ok) {
      emit("ticket-created");
      resetForm();
    } else {
      throw new Error("Failed to create ticket");
    }
  } catch (error) {
    console.error("Error creating ticket:", error);
  }
};

const resetForm = () => {
  vehicleNumber.value = "";
  vehicleType.value = "";
  plateRecognized.value = false;
};

const emit = defineEmits(["ticket-created"]);

onMounted(() => {
  // Initialize any required resources
});
</script>

<style scoped>
.ticket-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
}

.camera-section {
  margin-bottom: 2rem;
  text-align: center;
}

.camera-container {
  margin-bottom: 1rem;
}

.camera-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.input-group {
  display: flex;
  gap: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}
.btn-secondary {
  background-color: #95a5a6;
  color: white;
}
.btn-info {
  background-color: #2ecc71;
  color: white;
}
.btn-success {
  background-color: #27ae60;
  color: white;
}
.btn-outline-secondary {
  background-color: transparent;
  border: 1px solid #95a5a6;
  color: #95a5a6;
}
</style>
