<template>
    <div class="anpr-settings-page">
        <div class="page-header">
            <h1 class="title is-4">Pengaturan ANPR</h1>
            <p class="subtitle is-6">Konfigurasi sistem pengenalan plat nomor otomatis</p>
        </div>

        <div class="columns">
            <div class="column is-8">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            <span class="icon mr-2">
                                <i class="mdi mdi-cctv"></i>
                            </span>
                            Kamera ANPR
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="field">
                                        <label class="label">Kamera Masuk</label>
                                        <div class="control">
                                            <div class="select is-fullwidth">
                                                <select v-model="entryCameraId">
                                                    <option value="">Pilih Kamera</option>
                                                    <option value="cam1">Kamera 1</option>
                                                    <option value="cam2">Kamera 2</option>
                                                    <option value="cam3">Kamera 3</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Status</label>
                                        <div class="control">
                                            <span class="tag is-success">Aktif</span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Resolusi</label>
                                        <div class="control">
                                            <div class="select is-fullwidth">
                                                <select v-model="entryResolution">
                                                    <option value="720p">720p</option>
                                                    <option value="1080p">1080p</option>
                                                    <option value="1440p">1440p</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">FPS</label>
                                        <div class="control">
                                            <input class="input" type="number" v-model="entryFps" min="1" max="60">
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <button class="button is-primary">
                                                <span class="icon">
                                                    <i class="mdi mdi-content-save"></i>
                                                </span>
                                                <span>Simpan Pengaturan</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="camera-preview">
                                        <div class="camera-placeholder">
                                            <span class="icon is-large">
                                                <i class="mdi mdi-camera-off mdi-48px"></i>
                                            </span>
                                            <p>Preview Kamera Masuk</p>
                                        </div>
                                    </div>
                                    <div class="buttons mt-3">
                                        <button class="button is-info">
                                            <span class="icon">
                                                <i class="mdi mdi-refresh"></i>
                                            </span>
                                            <span>Refresh</span>
                                        </button>
                                        <button class="button is-warning">
                                            <span class="icon">
                                                <i class="mdi mdi-camera-iris"></i>
                                            </span>
                                            <span>Test Capture</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <hr>

                            <div class="columns">
                                <div class="column is-6">
                                    <div class="field">
                                        <label class="label">Kamera Keluar</label>
                                        <div class="control">
                                            <div class="select is-fullwidth">
                                                <select v-model="exitCameraId">
                                                    <option value="">Pilih Kamera</option>
                                                    <option value="cam1">Kamera 1</option>
                                                    <option value="cam2">Kamera 2</option>
                                                    <option value="cam3">Kamera 3</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Status</label>
                                        <div class="control">
                                            <span class="tag is-success">Aktif</span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Resolusi</label>
                                        <div class="control">
                                            <div class="select is-fullwidth">
                                                <select v-model="exitResolution">
                                                    <option value="720p">720p</option>
                                                    <option value="1080p">1080p</option>
                                                    <option value="1440p">1440p</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">FPS</label>
                                        <div class="control">
                                            <input class="input" type="number" v-model="exitFps" min="1" max="60">
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <button class="button is-primary">
                                                <span class="icon">
                                                    <i class="mdi mdi-content-save"></i>
                                                </span>
                                                <span>Simpan Pengaturan</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="camera-preview">
                                        <div class="camera-placeholder">
                                            <span class="icon is-large">
                                                <i class="mdi mdi-camera-off mdi-48px"></i>
                                            </span>
                                            <p>Preview Kamera Keluar</p>
                                        </div>
                                    </div>
                                    <div class="buttons mt-3">
                                        <button class="button is-info">
                                            <span class="icon">
                                                <i class="mdi mdi-refresh"></i>
                                            </span>
                                            <span>Refresh</span>
                                        </button>
                                        <button class="button is-warning">
                                            <span class="icon">
                                                <i class="mdi mdi-camera-iris"></i>
                                            </span>
                                            <span>Test Capture</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-4">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            <span class="icon mr-2">
                                <i class="mdi mdi-tune"></i>
                            </span>
                            Pengaturan Pengenalan
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="field">
                                <label class="label">Metode Pengenalan</label>
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select v-model="recognitionMethod">
                                            <option value="ocr">OCR Standard</option>
                                            <option value="deep">Deep Learning</option>
                                            <option value="hybrid">Hybrid</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Ambang Batas Kepercayaan ({{ confidenceThreshold }}%)</label>
                                <div class="control">
                                    <input class="slider is-fullwidth" type="range" v-model="confidenceThreshold" min="50" max="95" step="5">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Pra-pemrosesan Gambar</label>
                                <div class="control">
                                    <label class="checkbox">
                                        <input type="checkbox" v-model="preprocessing.grayscale">
                                        Grayscale
                                    </label>
                                </div>
                                <div class="control">
                                    <label class="checkbox">
                                        <input type="checkbox" v-model="preprocessing.contrast">
                                        Peningkatan Kontras
                                    </label>
                                </div>
                                <div class="control">
                                    <label class="checkbox">
                                        <input type="checkbox" v-model="preprocessing.noise">
                                        Reduksi Noise
                                    </label>
                                </div>
                                <div class="control">
                                    <label class="checkbox">
                                        <input type="checkbox" v-model="preprocessing.edge">
                                        Deteksi Tepi
                                    </label>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Format Plat Nomor</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="plateFormat" placeholder="Contoh: L NNNN LL">
                                </div>
                                <p class="help">L = Huruf, N = Angka, ? = Keduanya</p>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <button class="button is-primary is-fullwidth">
                                        <span class="icon">
                                            <i class="mdi mdi-content-save"></i>
                                        </span>
                                        <span>Simpan Pengaturan</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mt-5">
                    <header class="card-header">
                        <p class="card-header-title">
                            <span class="icon mr-2">
                                <i class="mdi mdi-history"></i>
                            </span>
                            Riwayat Kalibrasi
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="timeline">
                                <div class="timeline-item">
                                    <div class="timeline-marker is-primary"></div>
                                    <div class="timeline-content">
                                        <p class="heading">01/01/2025</p>
                                        <p>Kalibrasi kamera masuk</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-marker is-primary"></div>
                                    <div class="timeline-content">
                                        <p class="heading">15/12/2024</p>
                                        <p>Kalibrasi kamera keluar</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-marker is-primary"></div>
                                    <div class="timeline-content">
                                        <p class="heading">01/12/2024</p>
                                        <p>Update model pengenalan</p>
                                    </div>
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
    name: 'TheAnprSettings',
    data() {
        return {
            entryCameraId: 'cam1',
            entryResolution: '1080p',
            entryFps: 30,
            exitCameraId: 'cam2',
            exitResolution: '1080p',
            exitFps: 30,
            recognitionMethod: 'deep',
            confidenceThreshold: 75,
            preprocessing: {
                grayscale: true,
                contrast: true,
                noise: true,
                edge: false
            },
            plateFormat: 'L NNNN LL'
        };
    }
};
</script>

<style lang="scss" scoped>
.anpr-settings-page {
    padding: 20px;

    .page-header {
        margin-bottom: 20px;
    }

    .camera-preview {
        background-color: #f5f5f5;
        border-radius: 6px;
        height: 200px;
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

    .timeline {
        margin-top: 1rem;
        
        .timeline-item {
            padding-bottom: 1rem;
            position: relative;
            
            &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 7px;
                height: 100%;
                width: 2px;
                background: #dbdbdb;
            }
            
            &:last-child:before {
                height: 0;
            }
        }
        
        .timeline-marker {
            position: absolute;
            top: 4px;
            left: 0;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #4a4a4a;
            
            &.is-primary {
                background: #00d1b2;
            }
        }
        
        .timeline-content {
            padding-left: 2rem;
            
            .heading {
                font-weight: 600;
                margin-bottom: 0.25rem;
            }
        }
    }
}
</style>
