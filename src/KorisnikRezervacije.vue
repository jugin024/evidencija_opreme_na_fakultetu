<template>
  <div>
    <h2 class="mb-4 text-center">Zahtjev za rezervaciju</h2>
    <div class="card shadow-sm col-md-6 mx-auto p-4">
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
          <label class="font-weight-bold">Datum OD:</label>
          <input type="date" class="form-control" v-model="datumOd" required />
        </div>

        <div class="form-group">
          <label class="font-weight-bold">Datum DO:</label>
          <input type="date" class="form-control" v-model="datumDo" required />
        </div>

        <button type="submit" class="btn btn-success btn-block mt-4">
          Potvrdi podatke i pošalji zahtjev
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "KorisnikRezervacije",
  data() {
    return {
      odabranaOprema: this.$route.query.oprema || "Nije odabrana oprema",
      datumOd: "",
      datumDo: "",
    };
  },
  methods: {
    posaljiZahtjev() {
      alert(
        `Vaš zahtjev je zaprimljen!\n\nOprema: ${this.odabranaOprema}\nOd: ${this.datumOd}\nDo: ${this.datumDo}`
      );
      this.$router.push("/oprema");
    },
  },
};
</script>

<style scoped>
.card {
  margin-top: 20px;
}
</style>
