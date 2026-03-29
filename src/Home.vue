<template>
  <div class="row">
    <div class="col-md-6">
      <div class="card mb-4 shadow-sm">
        <div class="card-header bg-primary text-white">
          <h4 class="mb-0">Prijava</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="prijaviKorisnika">
            <div class="form-group">
              <label>Email adresa</label>
              <input
                type="email"
                class="form-control"
                v-model="loginEmail"
                placeholder="Unesite email"
                required
              />
            </div>
            <div class="form-group">
              <label>Lozinka</label>
              <input
                type="password"
                class="form-control"
                v-model="loginLozinka"
                placeholder="Unesite lozinku"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary btn-block">
              Prijavi se
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Desna kolona: Registracija -->
    <div class="col-md-6">
      <div class="card mb-4 shadow-sm">
        <div class="card-header bg-success text-white">
          <h4 class="mb-0">Registracija</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="registrirajKorisnika">
            <div class="form-group">
              <label>Ime i prezime</label>
              <input
                type="text"
                class="form-control"
                v-model="regIme"
                placeholder="Ivan Ivić"
                required
              />
            </div>
            <div class="form-group">
              <label>Email adresa</label>
              <input
                type="email"
                class="form-control"
                v-model="regEmail"
                placeholder="Unesite email"
                required
              />
            </div>
            <div class="form-group">
              <label>Lozinka</label>
              <input
                type="password"
                class="form-control"
                v-model="regLozinka"
                placeholder="Unesite lozinku"
                minlength="8"
                required
              />
            </div>
            <button type="submit" class="btn btn-success btn-block">
              Registriraj se
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      loginEmail: "",
      loginLozinka: "",

      regIme: "",
      regEmail: "",
      regLozinka: "",
    };
  },
  methods: {
    prijaviKorisnika() {
      console.log("Prijava mail", this.loginEmail);

      this.$router.push("/oprema");
    },
    registrirajKorisnika() {
      console.log("Registracija ime+mail", this.regIme, this.regEmail);

      alert("Registracija prošla");

      this.regIme = "";
      this.regEmail = "";
      this.regLozinka = "";
    },
  },
};
</script>
