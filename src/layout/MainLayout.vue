<template>
  <aside class="main-layout-aside">
    <section class="nav-bar-container">
      <Logo />
      <NavBar />
    </section>
  </aside>
  <section class="main-layout-main clearfix">
    <header class="main-layout-header"></header>
    <main class="main-layout-content">
      <router-view :key="$route.fullPath"/>
    </main>
  </section>
</template>
<script>
  import Logo from '../components/Logo'
  import NavBar from '../components/Navbar'
  export default {
    name: 'MainLayout',
    components: {
      Logo,
      NavBar
    }
  }
</script>
