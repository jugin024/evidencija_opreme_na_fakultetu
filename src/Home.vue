<template>
  <div class="row justify-content-center">
    <div class="col-md-6" v-if="prikaziPrijavu">
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

          <div class="mt-3 text-center">
            <a href="#" @click.prevent="prikaziPrijavu = false"
              >Nemate račun? Registrirajte se.</a
            >
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-6" v-else>
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
              <small class="form-text text-muted"
                >Lozinka mora imati min. 8 znakova, veliko slovo, broj i
                specijalan znak.</small
              >
            </div>
            <button type="submit" class="btn btn-success btn-block">
              Registriraj se
            </button>
          </form>
          <div class="mt-3 text-center">
            <a href="#" @click.prevent="prikaziPrijavu = true"
              >Imate račun? Prijavite se.</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "./firebase.js";
export default {
  name: "Home",
  data() {
    return {
      prikaziPrijavu: true,
      loginEmail: "",
      loginLozinka: "",

      regIme: "",
      regEmail: "",
      regLozinka: "",
    };
  },
  methods: {
    prijaviKorisnika() {
      auth
        .signInWithEmailAndPassword(this.loginEmail, this.loginLozinka)
        .then(() => {
          this.$router.push("/oprema");
        })
        .catch(function (error) {
          alert("greška pri prijavi " + error.message);
        });
    },
    registrirajKorisnika() {
      if (!this.regEmail.includes("@")) {
        alert("greska: Email mora imati @!");
        return;
      }
      if (this.regLozinka.length < 8) {
        alert("greška: lozinka mora imati barem 8 znakova!");
        return;
      }
      let imaVelikoSlovo = /[A-Z]/.test(this.regLozinka);
      let imaBroj = /[0-9]/.test(this.regLozinka);
      let imaSpecijalniZnak = /[",!#$%&/()=?*\\|@{}<>¤]/.test(this.regLozinka);

      if (!imaVelikoSlovo || !imaBroj || !imaSpecijalniZnak) {
        alert(
          "Greška: lozinka mora imat barem jedno veliko slovo, jedan broj te jedan specijalni znak!"
        );
        return;
      }

      console.log("Registracija ime+mail", this.regIme, this.regEmail);
      auth
        .createUserWithEmailAndPassword(this.regEmail, this.regLozinka)
        .then((rezultat) => {
          db.collection("korisnici")
            .doc(rezultat.user.uid)
            .set({
              imePrezime: this.regIme,
              email: this.regEmail,
              uloga: "student",
            })
            .then(() => {
              alert("Registracija uspješna, prijavite se");
              this.regIme = "";
              this.regEmail = "";
              this.regLozinka = "";
              this.prikaziPrijavu = true;
            });
        });
    },
  },
};
</script>
