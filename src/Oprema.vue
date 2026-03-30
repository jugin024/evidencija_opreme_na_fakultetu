<template>
  <div>
    <h2 class="mb-2">Dostupna oprema</h2>
    <!--VALJDA RADI -->
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
          <div
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
export default {
  name: "Oprema",
  data() {
    return {
      pojamZaPretragu: "",
      //dummy podaci
      dostupnaOprema: [
        {
          id: 1,
          naziv: "Projektor ACER H6546Ki, DLP, FHD 1920x1080px",
          kategorija: "Projektori",
          ispravno: true,
        },
        {
          id: 2,
          naziv: "Projektor ACER Vero PD2527i, DLP, FHD 1920x1200px",
          kategorija: "Projektori",
          ispravno: true,
        },
        // ubaciti napomene za admina tipa rezervirano samo za prof i asistente
        {
          id: 3,
          naziv: "Projektor EPSON EB-L630U, 3LCD, 1920 x 1200",
          kategorija: "Projektori",
          ispravno: true,
        },
        {
          id: 4,
          naziv: "Laptop LENOVO ThinkPad E14 Gen 7",
          kategorija: "Laptopi",
          ispravno: true,
        },
        {
          // napomena opisa kvara
          id: 5,
          naziv: "Laptop LENOVO ThinkPad X1 Carbon Gen 13",
          kategorija: "Laptopi",
          ispravno: false,
        },
        {
          id: 6,
          naziv: "Laptop APPLE MacBook Pro 16",
          kategorija: "Laptopi",
          ispravno: true,
        },
        {
          id: 7,
          naziv: "Laptop APPLE MacBook Pro 16",
          kategorija: "Laptopi",
          ispravno: true,
        },
        {
          id: 8,
          naziv: "Laptop APPLE MacBook Pro 14",
          kategorija: "Laptopi",
          ispravno: true,
        },
        {
          id: 9,
          naziv: "Web kamera LOGITECH Rally Bar",
          kategorija: "Kamere",
          ispravno: true,
        },
        {
          id: 10,
          naziv: "Konferencijska kamera LOGITECH CONNECT USB",
          kategorija: "Kamere",
          ispravno: true,
        },
        {
          id: 11,
          naziv: "Prezenter LOGITECH R400",
          kategorija: "Ostalo",
          ispravno: true,
        },
        {
          id: 12,
          naziv: "Prezenter LOGITECH Spotlight Slate",
          kategorija: "Ostalo",
          ispravno: true,
        },
      ],
    };
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
    idiNaRezervaciju(biraniNaziv) {
      this.$router.push({
        path: "/rezervacije",
        query: { oprema: biraniNaziv }, // Šaljemo naziv opreme u URL-u!
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
