<template>
    <div class="parking-management-page">
        <div class="page-header">
            <h1 class="title is-4">Manajemen Parkir</h1>
            <p class="subtitle is-6">Kelola dan monitor status area parkir</p>
        </div>

        <div class="columns">
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
                                <p class="title is-4 has-text-white">150</p>
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
                                    <i class="mdi mdi-parking mdi-48px"></i>
                                </span>
                            </div>
                            <div class="media-content">
                                <p class="title is-4 has-text-white">85</p>
                                <p class="subtitle is-6 has-text-white">Slot Tersedia</p>
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
                                    <i class="mdi mdi-car mdi-48px"></i>
                                </span>
                            </div>
                            <div class="media-content">
                                <p class="title is-4 has-text-white">65</p>
                                <p class="subtitle is-6 has-text-white">Kendaraan Aktif</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-3">
                <div class="card has-background-info has-text-white">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <span class="icon is-large">
                                    <i class="mdi mdi-cash-multiple mdi-48px"></i>
                                </span>
                            </div>
                            <div class="media-content">
                                <p class="title is-4 has-text-white">Rp 1.250.000</p>
                                <p class="subtitle is-6 has-text-white">Pendapatan Hari Ini</p>
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
                    Daftar Kendaraan Parkir
                </p>
                <div class="card-header-icon">
                    <div class="field has-addons">
                        <div class="control">
                            <input class="input" type="text" placeholder="Cari plat nomor...">
                        </div>
                        <div class="control">
                            <button class="button is-primary">
                                <span class="icon">
                                    <i class="mdi mdi-magnify"></i>
                                </span>
                            </button>
                        </div>
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
                                    <th>Durasi</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>TK-001</td>
                                    <td>B 1234 XYZ</td>
                                    <td>Mobil</td>
                                    <td>01/01/2025 08:00:00</td>
                                    <td>2 jam 30 menit</td>
                                    <td><span class="tag is-success">Aktif</span></td>
                                    <td>
                                        <div class="buttons are-small">
                                            <button class="button is-info">
                                                <span class="icon">
                                                    <i class="mdi mdi-eye"></i>
                                                </span>
                                            </button>
                                            <button class="button is-warning">
                                                <span class="icon">
                                                    <i class="mdi mdi-pencil"></i>
                                                </span>
                                            </button>
                                            <button class="button is-danger">
                                                <span class="icon">
                                                    <i class="mdi mdi-delete"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>TK-002</td>
                                    <td>B 5678 ABC</td>
                                    <td>Motor</td>
                                    <td>01/01/2025 09:15:00</td>
                                    <td>1 jam 15 menit</td>
                                    <td><span class="tag is-success">Aktif</span></td>
                                    <td>
                                        <div class="buttons are-small">
                                            <button class="button is-info">
                                                <span class="icon">
                                                    <i class="mdi mdi-eye"></i>
                                                </span>
                                            </button>
                                            <button class="button is-warning">
                                                <span class="icon">
                                                    <i class="mdi mdi-pencil"></i>
                                                </span>
                                            </button>
                                            <button class="button is-danger">
                                                <span class="icon">
                                                    <i class="mdi mdi-delete"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>TK-003</td>
                                    <td>B 9012 DEF</td>
                                    <td>Mobil</td>
                                    <td>01/01/2025 10:30:00</td>
                                    <td>45 menit</td>
                                    <td><span class="tag is-success">Aktif</span></td>
                                    <td>
                                        <div class="buttons are-small">
                                            <button class="button is-info">
                                                <span class="icon">
                                                    <i class="mdi mdi-eye"></i>
                                                </span>
                                            </button>
                                            <button class="button is-warning">
                                                <span class="icon">
                                                    <i class="mdi mdi-pencil"></i>
                                                </span>
                                            </button>
                                            <button class="button is-danger">
                                                <span class="icon">
                                                    <i class="mdi mdi-delete"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
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

        <div class="columns mt-5">
            <div class="column is-6">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            <span class="icon mr-2">
                                <i class="mdi mdi-chart-line"></i>
                            </span>
                            Tren Parkir Harian
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="chart-placeholder">
                                <p>Grafik tren parkir akan ditampilkan di sini</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-6">
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
                                <p>Grafik distribusi jenis kendaraan akan ditampilkan di sini</p>
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
    name: 'TheParkingManagement'
};
</script>

<style lang="scss" scoped>
.parking-management-page {
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
