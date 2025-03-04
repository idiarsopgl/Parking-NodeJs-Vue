<template>
    <div class="user-management-page">
        <div class="page-header">
            <h1 class="title is-4">Manajemen Pengguna</h1>
            <p class="subtitle is-6">Kelola akun pengguna sistem</p>
        </div>

        <div class="columns">
            <div class="column is-8">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            <span class="icon mr-2">
                                <i class="mdi mdi-account-group"></i>
                            </span>
                            Daftar Pengguna
                        </p>
                        <div class="card-header-icon">
                            <div class="field has-addons">
                                <div class="control">
                                    <input class="input" type="text" placeholder="Cari pengguna...">
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
                                            <th>ID</th>
                                            <th>Nama</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Admin Utama</td>
                                            <td>admin</td>
                                            <td>admin@example.com</td>
                                            <td><span class="tag is-danger">Admin</span></td>
                                            <td><span class="tag is-success">Aktif</span></td>
                                            <td>
                                                <div class="buttons are-small">
                                                    <button class="button is-info" @click="editUser(1)">
                                                        <span class="icon">
                                                            <i class="mdi mdi-pencil"></i>
                                                        </span>
                                                    </button>
                                                    <button class="button is-warning" @click="resetPassword(1)">
                                                        <span class="icon">
                                                            <i class="mdi mdi-lock-reset"></i>
                                                        </span>
                                                    </button>
                                                    <button class="button is-danger" @click="deleteUser(1)">
                                                        <span class="icon">
                                                            <i class="mdi mdi-delete"></i>
                                                        </span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Petugas Parkir 1</td>
                                            <td>petugas1</td>
                                            <td>petugas1@example.com</td>
                                            <td><span class="tag is-info">Petugas</span></td>
                                            <td><span class="tag is-success">Aktif</span></td>
                                            <td>
                                                <div class="buttons are-small">
                                                    <button class="button is-info" @click="editUser(2)">
                                                        <span class="icon">
                                                            <i class="mdi mdi-pencil"></i>
                                                        </span>
                                                    </button>
                                                    <button class="button is-warning" @click="resetPassword(2)">
                                                        <span class="icon">
                                                            <i class="mdi mdi-lock-reset"></i>
                                                        </span>
                                                    </button>
                                                    <button class="button is-danger" @click="deleteUser(2)">
                                                        <span class="icon">
                                                            <i class="mdi mdi-delete"></i>
                                                        </span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Petugas Parkir 2</td>
                                            <td>petugas2</td>
                                            <td>petugas2@example.com</td>
                                            <td><span class="tag is-info">Petugas</span></td>
                                            <td><span class="tag is-warning">Nonaktif</span></td>
                                            <td>
                                                <div class="buttons are-small">
                                                    <button class="button is-info" @click="editUser(3)">
                                                        <span class="icon">
                                                            <i class="mdi mdi-pencil"></i>
                                                        </span>
                                                    </button>
                                                    <button class="button is-warning" @click="resetPassword(3)">
                                                        <span class="icon">
                                                            <i class="mdi mdi-lock-reset"></i>
                                                        </span>
                                                    </button>
                                                    <button class="button is-danger" @click="deleteUser(3)">
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
            </div>
            <div class="column is-4">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            <span class="icon mr-2">
                                <i class="mdi mdi-account-plus"></i>
                            </span>
                            {{ isEditing ? 'Edit Pengguna' : 'Tambah Pengguna Baru' }}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <form @submit.prevent="saveUser">
                                <div class="field">
                                    <label class="label">Nama Lengkap</label>
                                    <div class="control has-icons-left">
                                        <input class="input" type="text" v-model="userForm.name" placeholder="Masukkan nama lengkap">
                                        <span class="icon is-small is-left">
                                            <i class="mdi mdi-account"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Username</label>
                                    <div class="control has-icons-left">
                                        <input class="input" type="text" v-model="userForm.username" placeholder="Masukkan username">
                                        <span class="icon is-small is-left">
                                            <i class="mdi mdi-account-key"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Email</label>
                                    <div class="control has-icons-left">
                                        <input class="input" type="email" v-model="userForm.email" placeholder="Masukkan email">
                                        <span class="icon is-small is-left">
                                            <i class="mdi mdi-email"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Password</label>
                                    <div class="control has-icons-left">
                                        <input class="input" type="password" v-model="userForm.password" :placeholder="isEditing ? 'Kosongkan jika tidak ingin mengubah' : 'Masukkan password'">
                                        <span class="icon is-small is-left">
                                            <i class="mdi mdi-lock"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Role</label>
                                    <div class="control">
                                        <div class="select is-fullwidth">
                                            <select v-model="userForm.role">
                                                <option value="admin">Admin</option>
                                                <option value="petugas">Petugas</option>
                                                <option value="supervisor">Supervisor</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Status</label>
                                    <div class="control">
                                        <label class="radio">
                                            <input type="radio" v-model="userForm.status" value="active">
                                            Aktif
                                        </label>
                                        <label class="radio">
                                            <input type="radio" v-model="userForm.status" value="inactive">
                                            Nonaktif
                                        </label>
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="control">
                                        <button type="submit" class="button is-primary is-fullwidth">
                                            <span class="icon">
                                                <i class="mdi mdi-content-save"></i>
                                            </span>
                                            <span>{{ isEditing ? 'Update Pengguna' : 'Simpan Pengguna' }}</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="field" v-if="isEditing">
                                    <div class="control">
                                        <button type="button" class="button is-light is-fullwidth" @click="cancelEdit">
                                            <span class="icon">
                                                <i class="mdi mdi-cancel"></i>
                                            </span>
                                            <span>Batal</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheUserManagement',
    data() {
        return {
            isEditing: false,
            editingUserId: null,
            userForm: {
                name: '',
                username: '',
                email: '',
                password: '',
                role: 'petugas',
                status: 'active'
            }
        };
    },
    methods: {
        editUser(userId) {
            this.isEditing = true;
            this.editingUserId = userId;
            
            // In a real app, you would fetch user data from API
            // For demo purposes, we'll just set some dummy data
            if (userId === 1) {
                this.userForm = {
                    name: 'Admin Utama',
                    username: 'admin',
                    email: 'admin@example.com',
                    password: '',
                    role: 'admin',
                    status: 'active'
                };
            } else if (userId === 2) {
                this.userForm = {
                    name: 'Petugas Parkir 1',
                    username: 'petugas1',
                    email: 'petugas1@example.com',
                    password: '',
                    role: 'petugas',
                    status: 'active'
                };
            } else if (userId === 3) {
                this.userForm = {
                    name: 'Petugas Parkir 2',
                    username: 'petugas2',
                    email: 'petugas2@example.com',
                    password: '',
                    role: 'petugas',
                    status: 'inactive'
                };
            }
        },
        resetPassword(userId) {
            // In a real app, you would call an API to reset password
            alert(`Password untuk user ID ${userId} telah direset!`);
        },
        deleteUser(userId) {
            // In a real app, you would call an API to delete user
            if (confirm(`Apakah Anda yakin ingin menghapus user ID ${userId}?`)) {
                alert(`User ID ${userId} telah dihapus!`);
            }
        },
        saveUser() {
            // In a real app, you would call an API to save user
            if (this.isEditing) {
                alert(`User ID ${this.editingUserId} telah diupdate!`);
            } else {
                alert('User baru telah ditambahkan!');
            }
            
            // Reset form
            this.cancelEdit();
        },
        cancelEdit() {
            this.isEditing = false;
            this.editingUserId = null;
            this.userForm = {
                name: '',
                username: '',
                email: '',
                password: '',
                role: 'petugas',
                status: 'active'
            };
        }
    }
};
</script>

<style lang="scss" scoped>
.user-management-page {
    padding: 20px;

    .page-header {
        margin-bottom: 20px;
    }
}
</style>
