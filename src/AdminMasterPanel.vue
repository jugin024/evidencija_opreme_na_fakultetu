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
            <td>{{ zahtjev.korisnikEmail }}</td>
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
import { db } from "./firebase";

export default {
  name: "AdminMasterPanel",
  data() {
    return {
      zahtjevi: [],
    };
  },
  created() {
    this.dohvatiRezervacie();
  },
  methods: {
    dohvatiRezervacie() {
      db.collection("rezervacije")
        .get()
        .then((snapshot) => {
          const zahtjeviUnutarBaze = [];

          snapshot.forEach((document) => {
            zahtjeviUnutarBaze.push({
              id: document.id,
              korisnikEmail: document.data().korisnikEmail,
              oprema: document.data().oprema,
              datumOd: document.data().datumOd,
              datumDo: document.data().datumDo,
              status: document.data().status,
            });
          });

          this.zahtjevi = zahtjeviUnutarBaze;
        });
    },
    promijeniStatus(id, noviStatus) {
      db.collection("rezervacije").doc(id).update({ status: noviStatus });

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
