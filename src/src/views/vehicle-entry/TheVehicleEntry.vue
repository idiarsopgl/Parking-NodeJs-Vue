<template>
    <div class="vehicle-entry-page">
        <div class="page-header">
            <h1 class="title is-4">Kendaraan Masuk</h1>
            <p class="subtitle is-6">Pencatatan kendaraan yang masuk area parkir</p>
        </div>

        <div class="columns">
            <div class="column is-8">
                <div class="card">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-4">Deteksi Plat Nomor</p>
                                <p class="subtitle is-6">Arahkan kamera ke plat nomor kendaraan</p>
                            </div>
                        </div>

                        <div class="content">
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
                                <div class="field">
                                    <label class="label">Tingkat Kepercayaan</label>
                                    <div class="control">
                                        <progress class="progress is-primary" value="0" max="100">0%</progress>
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
            <div class="column is-4">
                <div class="card">
                    <div class="card-content">
                        <p class="title is-4">Informasi Kendaraan</p>
                        <div class="content">
                            <div class="field">
                                <label class="label">Jenis Kendaraan</label>
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select>
                                            <option>Pilih jenis kendaraan</option>
                                            <option>Mobil</option>
                                            <option>Motor</option>
                                            <option>Truk/Bus</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Waktu Masuk</label>
                                <div class="control">
                                    <input class="input" type="text" :value="currentDateTime" readonly>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Catatan (Opsional)</label>
                                <div class="control">
                                    <textarea class="textarea" placeholder="Tambahkan catatan jika diperlukan"></textarea>
                                </div>
                            </div>
                            <div class="field mt-5">
                                <div class="control">
                                    <button class="button is-primary is-fullwidth">
                                        <span class="icon">
                                            <i class="mdi mdi-ticket-confirmation"></i>
                                        </span>
                                        <span>Cetak Tiket</span>
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
    name: 'TheVehicleEntry',
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
.vehicle-entry-page {
    padding: 20px;

    .page-header {
        margin-bottom: 20px;
    }

    .camera-container {
        background-color: #f5f5f5;
        border-radius: 6px;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;

        .camera-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #888;
        }
    }
}
</style>
