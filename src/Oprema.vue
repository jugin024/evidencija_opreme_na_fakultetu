<template>
  <div>
    <h2 class="mb-2">Dostupna oprema</h2>
    <div class="form-group mb-4">
      <input
        v-model="pojamZaPretragu"
        type="text"
        class="form-control"
        placeholder="Pretraži opremu..."
      />
    </div>

    <div class="row">
      <div
        class="col-md-4 mb-4"
        v-for="predmet in filtriranaOprema"
        :key="predmet.id"
      >
        <div class="card h-100 shadow-sm">
          <img
            v-if="predmet.slikaUrl"
            :src="predmet.slikaUrl"
            :alt="predmet.naziv"
            class="card-img-top"
            style="height: 180px; object-fit: contain; background-color: white"
          />
          <div
            v-else
            class="bg-secondary text-white text-center d-flex align-items-center justify-content-center"
            style="height: 180px"
          >
            Slika: {{ predmet.naziv }}
          </div>

          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ predmet.naziv }}</h5>
            <p class="card-text text-muted">
              Kategorija: {{ predmet.kategorija }}
            </p>

            <p class="card-text">
              Status:
              <span
                v-if="predmet.ispravno"
                class="text-success font-weight-bold"
                >Dostupno</span
              >
              <span v-else class="text-danger font-weight-bold">U kvaru</span>
            </p>

            <button
              class="btn btn-primary mt-auto"
              :disabled="!predmet.ispravno"
              @click="idiNaRezervaciju(predmet.naziv)"
            >
              Zatraži rezervaciju
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "./firebase.js";
export default {
  name: "Oprema",
  data() {
    return {
      pojamZaPretragu: "",

      dostupnaOprema: [],
    };
  },
  created() {
    this.dohvatiOpremu();
  },
  computed: {
    filtriranaOprema() {
      return this.dostupnaOprema.filter((predmet) => {
        return predmet.naziv
          .toLowerCase()
          .includes(this.pojamZaPretragu.toLowerCase());
      });
    },
  },
  methods: {
    dohvatiOpremu() {
      db.collection("oprema")
        .get()
        .then((snapshot) => {
          const opremaIzBaze = [];
          snapshot.forEach((doc) => {
            opremaIzBaze.push({
              id: doc.id,
              naziv: doc.data().naziv,
              kategorija: doc.data().kategorija,
              ispravno: doc.data().ispravno,
              slikaUrl: doc.data().slikaUrl,
            });
          });
          this.dostupnaOprema = opremaIzBaze;
        })
        .catch((error) => {
          console.log(error.code, error.message);
        });
    },

    idiNaRezervaciju(biraniNaziv) {
      this.$router.push({
        path: "/rezervacije",
        query: { oprema: biraniNaziv },
      });
    },
  },
};
</script>

<style scoped>
.card:hover {
  transform: translateY(-5px);
  transition: 0.3s ease-in-out;
}
</style>
