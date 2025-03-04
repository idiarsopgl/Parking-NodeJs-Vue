<template>
    <div class="reports-page">
        <div class="page-header">
            <h1 class="title is-4">Laporan</h1>
            <p class="subtitle is-6">Lihat dan unduh laporan parkir</p>
        </div>

        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    <span class="icon mr-2">
                        <i class="mdi mdi-filter"></i>
                    </span>
                    Filter Laporan
                </p>
            </header>
            <div class="card-content">
                <div class="content">
                    <div class="columns">
                        <div class="column is-3">
                            <div class="field">
                                <label class="label">Jenis Laporan</label>
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select v-model="reportType">
                                            <option value="daily">Laporan Harian</option>
                                            <option value="monthly">Laporan Bulanan</option>
                                            <option value="yearly">Laporan Tahunan</option>
                                            <option value="custom">Periode Kustom</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="field">
                                <label class="label">Tanggal Mulai</label>
                                <div class="control">
                                    <input class="input" type="date" v-model="startDate">
                                </div>
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="field">
                                <label class="label">Tanggal Selesai</label>
                                <div class="control">
                                    <input class="input" type="date" v-model="endDate" :disabled="reportType !== 'custom'">
                                </div>
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="field">
                                <label class="label">&nbsp;</label>
                                <div class="control">
                                    <button class="button is-primary is-fullwidth" @click="generateReport">
                                        <span class="icon">
                                            <i class="mdi mdi-file-search"></i>
                                        </span>
                                        <span>Tampilkan Laporan</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="columns mt-5">
            <div class="column is-3">
                <div class="card has-background-primary has-text-white">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <span class="icon is-large">
                                    <i class="mdi mdi-car-multiple mdi-48px"></i>
                                </span>
                            </div>
                            <div class="media-content">
                                <p class="title is-4 has-text-white">1,250</p>
                                <p class="subtitle is-6 has-text-white">Total Kendaraan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-3">
                <div class="card has-background-success has-text-white">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <span class="icon is-large">
                                    <i class="mdi mdi-cash-multiple mdi-48px"></i>
                                </span>
                            </div>
                            <div class="media-content">
                                <p class="title is-4 has-text-white">Rp 12.500.000</p>
                                <p class="subtitle is-6 has-text-white">Total Pendapatan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-3">
                <div class="card has-background-warning has-text-white">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <span class="icon is-large">
                                    <i class="mdi mdi-clock-outline mdi-48px"></i>
                                </span>
                            </div>
                            <div class="media-content">
                                <p class="title is-4 has-text-white">2.5 jam</p>
                                <p class="subtitle is-6 has-text-white">Rata-rata Durasi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-3">
                <div class="card has-background-danger has-text-white">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <span class="icon is-large">
                                    <i class="mdi mdi-ticket-alert mdi-48px"></i>
                                </span>
                            </div>
                            <div class="media-content">
                                <p class="title is-4 has-text-white">15</p>
                                <p class="subtitle is-6 has-text-white">Tiket Hilang</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="columns mt-5">
            <div class="column is-8">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            <span class="icon mr-2">
                                <i class="mdi mdi-chart-line"></i>
                            </span>
                            Grafik Pendapatan
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="chart-placeholder">
                                <p>Grafik pendapatan akan ditampilkan di sini</p>
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
                                <i class="mdi mdi-chart-pie"></i>
                            </span>
                            Distribusi Jenis Kendaraan
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="chart-placeholder">
                                <p>Grafik distribusi akan ditampilkan di sini</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mt-5">
            <header class="card-header">
                <p class="card-header-title">
                    <span class="icon mr-2">
                        <i class="mdi mdi-format-list-bulleted"></i>
                    </span>
                    Detail Transaksi
                </p>
                <div class="card-header-icon">
                    <div class="buttons">
                        <button class="button is-success">
                            <span class="icon">
                                <i class="mdi mdi-file-excel"></i>
                            </span>
                            <span>Export Excel</span>
                        </button>
                        <button class="button is-danger">
                            <span class="icon">
                                <i class="mdi mdi-file-pdf"></i>
                            </span>
                            <span>Export PDF</span>
                        </button>
                    </div>
                </div>
            </header>
            <div class="card-content">
                <div class="content">
                    <div class="table-container">
                        <table class="table is-fullwidth is-hoverable">
                            <thead>
                                <tr>
                                    <th>No. Tiket</th>
                                    <th>Plat Nomor</th>
                                    <th>Jenis Kendaraan</th>
                                    <th>Waktu Masuk</th>
                                    <th>Waktu Keluar</th>
                                    <th>Durasi</th>
                                    <th>Biaya</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>TK-001</td>
                                    <td>B 1234 XYZ</td>
                                    <td>Mobil</td>
                                    <td>01/01/2025 08:00:00</td>
                                    <td>01/01/2025 10:30:00</td>
                                    <td>2 jam 30 menit</td>
                                    <td>Rp 15.000</td>
                                </tr>
                                <tr>
                                    <td>TK-002</td>
                                    <td>B 5678 ABC</td>
                                    <td>Motor</td>
                                    <td>01/01/2025 09:15:00</td>
                                    <td>01/01/2025 10:30:00</td>
                                    <td>1 jam 15 menit</td>
                                    <td>Rp 5.000</td>
                                </tr>
                                <tr>
                                    <td>TK-003</td>
                                    <td>B 9012 DEF</td>
                                    <td>Mobil</td>
                                    <td>01/01/2025 10:30:00</td>
                                    <td>01/01/2025 11:15:00</td>
                                    <td>45 menit</td>
                                    <td>Rp 5.000</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colspan="6" class="has-text-right">Total</th>
                                    <th>Rp 25.000</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                        <a class="pagination-previous">Previous</a>
                        <a class="pagination-next">Next page</a>
                        <ul class="pagination-list">
                            <li><a class="pagination-link is-current" aria-label="Page 1" aria-current="page">1</a></li>
                            <li><a class="pagination-link" aria-label="Goto page 2">2</a></li>
                            <li><a class="pagination-link" aria-label="Goto page 3">3</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheReports',
    data() {
        return {
            reportType: 'daily',
            startDate: new Date().toISOString().substr(0, 10),
            endDate: new Date().toISOString().substr(0, 10)
        };
    },
    methods: {
        generateReport() {
            // Logic to generate report based on selected filters
            console.log('Generating report for:', this.reportType, this.startDate, this.endDate);
        }
    }
};
</script>

<style lang="scss" scoped>
.reports-page {
    padding: 20px;

    .page-header {
        margin-bottom: 20px;
    }

    .chart-placeholder {
        background-color: #f5f5f5;
        border-radius: 6px;
        height: 250px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #888;
    }
}
</style>
