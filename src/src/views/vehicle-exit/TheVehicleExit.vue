<template>
    <div class="vehicle-exit-page">
        <div class="page-header">
            <h1 class="title is-4">Kendaraan Keluar</h1>
            <p class="subtitle is-6">Proses kendaraan yang keluar dari area parkir</p>
        </div>

        <div class="columns">
            <div class="column is-6">
                <div class="card">
                    <div class="card-content">
                        <p class="title is-4">Scan Tiket</p>
                        <div class="content">
                            <div class="field">
                                <label class="label">Nomor Tiket</label>
                                <div class="control has-icons-left">
                                    <input class="input" type="text" placeholder="Masukkan nomor tiket">
                                    <span class="icon is-small is-left">
                                        <i class="mdi mdi-ticket"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <button class="button is-primary">
                                        <span class="icon">
                                            <i class="mdi mdi-magnify"></i>
                                        </span>
                                        <span>Cari Tiket</span>
                                    </button>
                                </div>
                            </div>
                            <div class="divider">ATAU</div>
                            <div class="camera-container">
                                <div class="camera-placeholder">
                                    <span class="icon is-large">
                                        <i class="mdi mdi-camera mdi-48px"></i>
                                    </span>
                                    <p>Kamera ANPR</p>
                                </div>
                            </div>
                            <div class="detection-result mt-4">
                                <div class="field">
                                    <label class="label">Hasil Deteksi Plat Nomor</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Plat nomor akan muncul di sini" readonly>
                                    </div>
                                </div>
                                <div class="buttons">
                                    <button class="button is-primary">
                                        <span class="icon">
                                            <i class="mdi mdi-camera"></i>
                                        </span>
                                        <span>Ambil Gambar</span>
                                    </button>
                                    <button class="button is-info">
                                        <span class="icon">
                                            <i class="mdi mdi-refresh"></i>
                                        </span>
                                        <span>Coba Lagi</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-6">
                <div class="card">
                    <div class="card-content">
                        <p class="title is-4">Informasi Parkir</p>
                        <div class="content">
                            <div class="field">
                                <label class="label">Plat Nomor</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="B 1234 XYZ" readonly>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column">
                                    <div class="field">
                                        <label class="label">Waktu Masuk</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="01/01/2025 08:00:00" readonly>
                                        </div>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="field">
                                        <label class="label">Waktu Keluar</label>
                                        <div class="control">
                                            <input class="input" type="text" :value="currentDateTime" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Durasi Parkir</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="2 jam 30 menit" readonly>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Biaya Parkir</label>
                                <div class="control">
                                    <input class="input is-success is-large" type="text" placeholder="Rp 10.000" readonly>
                                </div>
                            </div>
                            <div class="field mt-5">
                                <div class="control">
                                    <button class="button is-success is-fullwidth">
                                        <span class="icon">
                                            <i class="mdi mdi-cash-register"></i>
                                        </span>
                                        <span>Proses Pembayaran</span>
                                    </button>
                                </div>
                            </div>
                            <div class="field mt-2">
                                <div class="control">
                                    <button class="button is-danger is-outlined is-fullwidth">
                                        <span class="icon">
                                            <i class="mdi mdi-ticket-alert"></i>
                                        </span>
                                        <span>Tiket Hilang</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheVehicleExit',
    data() {
        return {
            currentDateTime: new Date().toLocaleString('id-ID', {
                dateStyle: 'full',
                timeStyle: 'medium'
            })
        };
    }
};
</script>

<style lang="scss" scoped>
.vehicle-exit-page {
    padding: 20px;

    .page-header {
        margin-bottom: 20px;
    }

    .camera-container {
        background-color: #f5f5f5;
        border-radius: 6px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;

        .camera-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #888;
        }
    }

    .divider {
        display: flex;
        align-items: center;
        text-align: center;
        margin: 15px 0;
        color: #888;
        
        &::before,
        &::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid #ddd;
        }
        
        &::before {
            margin-right: 10px;
        }
        
        &::after {
            margin-left: 10px;
        }
    }
}
</style>
