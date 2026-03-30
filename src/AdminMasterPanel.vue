<template>
  <div>
    <h2 class="mb-4">Admin Panel - Pristigli zahtjevi</h2>
    <div class="table-responsive">
      <table class="table table-hover table-bordered bg-white shadow-sm">
        <thead class="thead-dark">
          <tr>
            <th>Korisnik</th>
            <th>Oprema</th>
            <th>Od - Do</th>
            <th>Status</th>
            <th>Akcija</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="zahtjev in zahtjevi" :key="zahtjev.id">
            <td>{{ zahtjev.korisnik }}</td>
            <td>{{ zahtjev.oprema }}</td>
            <td>{{ zahtjev.datumOd }} - {{ zahtjev.datumDo }}</td>

            <td>
              <span
                v-if="zahtjev.status === 'na_cekanju'"
                class="badge badge-warning"
                >Na čekanju</span
              >
              <span
                v-if="zahtjev.status === 'odobreno'"
                class="badge badge-success"
                >Odobreno</span
              >
              <span
                v-if="zahtjev.status === 'odbijeno'"
                class="badge badge-danger"
                >Odbijeno</span
              >
            </td>

            <td>
              <div v-if="zahtjev.status === 'na_cekanju'">
                <button
                  class="btn btn-sm btn-success mr-2"
                  @click="promijeniStatus(zahtjev.id, 'odobreno')"
                >
                  Odobri
                </button>
                <button
                  class="btn btn-sm btn-danger"
                  @click="promijeniStatus(zahtjev.id, 'odbijeno')"
                >
                  Odbij
                </button>
              </div>
              <div v-else class="text-muted font-italic">Riješeno</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminMasterPanel",
  data() {
    return {
      zahtjevi: [
        {
          id: 1,
          korisnik: "Pero Perić",
          oprema: "Web kamera LOGITECH Rally Bar",
          datumOd: "15.05.2026",
          datumDo: "18.05.2026",
          status: "na_cekanju",
        },
        {
          id: 2,
          korisnik: "Ana Anić",
          oprema: "Prezenter LOGITECH R400",
          datumOd: "20.05.2026",
          datumDo: "22.05.2026",
          status: "na_cekanju",
        },
        {
          id: 3,
          korisnik: "Marko Marić",
          oprema: "Laptop APPLE MacBook Pro 16",
          datumOd: "10.05.2026",
          datumDo: "12.05.2026",
          status: "odobreno",
        },
      ],
    };
  },
  methods: {
    promijeniStatus(id, noviStatus) {
      const pronadjeniZahtjev = this.zahtjevi.find((z) => z.id === id);
      if (pronadjeniZahtjev) {
        pronadjeniZahtjev.status = noviStatus;
      }
    },
  },
};
</script>
<style scoped>
.table {
  font-size: 20px;
}
</style>
