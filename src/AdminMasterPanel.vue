<template>
  <div>
    <h2 class="mb-4">Admin Panel - Pristigli zahtjevi</h2>
    <div class="d-flex justify-content-center">
      <table
        class="table table-hover table-bordered bg-white shadow-sm text-center"
      >
        <thead class="thead-dark" style="text-align: center">
          <tr>
            <th>Korisnik</th>
            <th>Oprema</th>
            <th>Od - Do</th>
            <th>Sati</th>
            <th>Status</th>
            <th>Akcija</th>
            <th>Datum zahtjeva</th>
          </tr>
        </thead>

        <tbody class="align-middle">
          <tr v-for="zahtjev in zahtjevi" :key="zahtjev.id">
            <td>{{ zahtjev.korisnikEmail }}</td>
            <td style="vertical-align: middle; width: 350px; min-width: 300px">
              <div
                style="
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  text-overflow: ellipsis;
                "
              >
                {{ zahtjev.oprema }}
              </div>
            </td>
            <td>
              {{ formatDatuma(zahtjev.datumOd, zahtjev.datumDo) }}
            </td>
            <td style="white-space: nowrap">
              {{ zahtjev.vrijemeOd }} - {{ zahtjev.vrijemeDo }}
            </td>
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
              <div
                v-if="zahtjev.status === 'na_cekanju'"
                style="display: flex; justify-content: center; gap: 10px"
              >
                <button
                  class="btn btn-success"
                  style="width: 100px; font-weight: bold"
                  @click="promijeniStatus(zahtjev.id, 'odobreno')"
                >
                  Odobri
                </button>
                <button
                  class="btn btn-danger"
                  style="width: 100px; font-weight: bold"
                  @click="promijeniStatus(zahtjev.id, 'odbijeno')"
                >
                  Odbij
                </button>
              </div>
              <div v-else style="white-space: nowrap">Riješeno</div>
            </td>
            <td class="white-space: nowrap; text-nowrap">
              {{ formatTimestamp(zahtjev.kreirano) }}
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
              vrijemeOd: document.data().vrijemeOd,
              vrijemeDo: document.data().vrijemeDo,
              kreirano: document.data().kreirano,
            });
          });

          this.zahtjevi = zahtjeviUnutarBaze;
        });
    },
    formatDatuma(prvi_D, drugi_D) {
      let datum_prvi = prvi_D.split("-");
      let datum_Drugi = drugi_D.split("-");
      return (
        datum_prvi[2] +
        ".-" +
        datum_Drugi[2] +
        "." +
        datum_Drugi[1] +
        "." +
        datum_Drugi[0] +
        "."
      );
    },

    formatTimestamp(iso) {
      // "2026-06-04T15:07:42.488Z"
      let datum = iso.slice(0, 10);
      let vrijeme = iso.slice(11, 19);
      let d = datum.split("-");

      return vrijeme + "-" + d[2] + "." + d[1] + "." + d[0] + ".";
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
  font-size: 18px;
}
.btn-fiksno {
  width: 80px;
  font-weight: bold;
}
</style>
