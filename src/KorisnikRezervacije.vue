<template>
  <div>
    <h2 class="mb-4 text-center">Zahtjev za rezervaciju</h2>
    <div class="card shadow-sm col-md-6 mx-auto p-4 mb-5">
      <form @submit.prevent="posaljiZahtjev">
        <div class="form-group">
          <label class="font-weight-bold">Odabrana oprema:</label>
          <input
            type="text"
            class="form-control bg-light"
            :value="odabranaOprema"
            disabled
          />
        </div>

        <div class="form-group">
          <label class="font-weight-bold">Datum preuzimanja (OD):</label>
          <input
            type="date"
            class="form-control"
            v-model="datumOd"
            :min="danasnjiDatum"
            required
          />
        </div>
        <div class="form-check mb-3">
          <input
            type="checkbox"
            class="form-check-input"
            id="istiDanCheck"
            v-model="istiDan"
            @change="IstiDanProvjera"
          />

          <label class="form-check-label text-primary" for="istiDanCheck">
            Oprema se vraća isti dan
          </label>
        </div>
        <div class="form-group">
          <label class="font-weight-bold">Datum povrata (DO)</label>
          <input
            type="date"
            class="form-control"
            v-model="datumDo"
            :min="datumOd || danasnjiDatum"
            :readonly="istiDan"
            required
          />
        </div>
        <div class="row">
          <div class="col-md-6 form-group">
            <label class="font-weight-bold">Vrijeme od:</label>
            <input
              type="time"
              class="form-control"
              v-model="vrijemeOd"
              required
            />
          </div>
          <div class="col-md-6 form-group">
            <label class="font-weight-bold">Vrijeme do:</label>
            <input
              type="time"
              class="form-control"
              v-model="vrijemeDo"
              required
            />
          </div>
        </div>
        <div class="d-flex justify-content-between mt-4">
          <button
            type="button"
            class="btn btn-secondary"
            @click="$router.push('/oprema')"
          >
            Odustani
          </button>
          <button type="submit" class="btn btn-success">Potvrdi zahtjev</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { auth, db } from "./firebase.js";
export default {
  name: "KorisnikRezervacije",
  data() {
    return {
      odabranaOprema: this.$route.query.oprema || "Nije odabrana oprema",
      datumOd: "",
      datumDo: "",
      istiDan: false,
      vrijemeOd: "",
      vrijemeDo: "",
      danasnjiDatum: new Date().toISOString().split("T")[0],
    };
  },
  watch: {
    datumOd(noviDatum) {
      if (this.istiDan) {
        this.datumDo = noviDatum;
      }
    },
  },
  methods: {
    posaljiZahtjev() {
      const timestampKreiranja = new Date().toISOString();

      const novaRezervacija = {
        oprema: this.odabranaOprema,
        datumOd: this.datumOd,
        datumDo: this.datumDo,
        vrijemeOd: this.vrijemeOd,
        vrijemeDo: this.vrijemeDo,
        status: "na_cekanju",
        korisnikId: auth.currentUser.uid,
        korisnikEmail: auth.currentUser.email,
        kreirano: timestampKreiranja,
      };
      console.log("Slanje nove rezervacije - - -", novaRezervacija);

      const poruka = `
    [SLANJE U BAZU]
    Oprema: ${this.odabranaOprema}
    Preuzimanje: ${this.formatiranjeDatuma(this.datumOd)} u ${this.vrijemeOd}h
    Povrat: ${this.formatiranjeDatuma(this.datumDo)} u ${this.vrijemeDo}h
    Kreirano (Timestamp): ${timestampKreiranja}
      `;

      db.collection("rezervacije")
        .add(novaRezervacija)
        .then((novaRez) => {
          console.log("Rezervacija spremljena - ID:", novaRez.id);
        });

      alert(poruka);
      this.$router.push("/oprema");
    },

    IstiDanProvjera() {
      if (this.istiDan) {
        this.datumDo = this.datumOd;
      }
    },

    formatiranjeDatuma(htmlDatum) {
      if (!htmlDatum) return "";
      const [godina, mjesec, dan] = htmlDatum.split("-");
      return `${dan}.${mjesec}.${godina}.`;
    },
  },
};
</script>

<style scoped>
.form-check-label {
  font-weight: 600;
  cursor: pointer;
}

.form-check-input {
  cursor: pointer;
}
</style>
