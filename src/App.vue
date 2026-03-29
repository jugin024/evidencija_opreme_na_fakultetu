<script>
export default {
  name: "App",
};
</script>

<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/"
          >Oprema na fakultetu</router-link
        >
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/oprema">Oprema</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/rezervacije"
                >Moje rezervacije</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin"
                >Admin Panel</router-link
              >
            </li>
          </ul>

          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link text-danger" to="/"
                >Odjava</router-link
              >
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
