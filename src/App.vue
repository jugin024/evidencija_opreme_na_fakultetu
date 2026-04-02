<script>
import { auth, db } from "./firebase.js";
export default {
  name: "App",
  data() {
    return {
      korisnik: null,
      uloga: "",
    };
  },

  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.korisnik = user;

        db.collection("korisnici")
          .doc(user.uid)
          .get()
          .then((dokument) => {
            if (dokument.exists) {
              this.uloga = dokument.data().uloga;
            }
          });
      } else {
        this.korisnik = null;
        this.uloga = "";
      }
    });
  },

  methods: {
    odjaviSe() {
      auth.signOut().then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link v-if="!korisnik" class="navbar-brand" to="/"
          >Oprema na fakultetu</router-link
        >
        <span v-else class="navbar-brand mb-0" style="cursor: default"
          >Oprema na fakultetu</span
        >
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto" v-if="korisnik">
            <li class="nav-item">
              <router-link class="nav-link" to="/oprema">Oprema</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/rezervacije"
                >Moje rezervacije</router-link
              >
            </li>
            <li class="nav-item" v-if="uloga === 'admin'">
              <router-link class="nav-link text-warning" to="/admin"
                >Admin Panel</router-link
              >
            </li>
          </ul>

          <ul class="navbar-nav ml-auto">
            <li class="nav-item" v-if="!korisnik">
              <router-link class="nav-link text-danger" to="/"
                >Prijava / Registracija</router-link
              >
            </li>
            <li class="nav-item" v-if="korisnik">
              <a
                class="nav-link text-danger"
                href="#"
                @click.prevent="odjaviSe"
              >
                Odjava ({{ korisnik.email }})
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
