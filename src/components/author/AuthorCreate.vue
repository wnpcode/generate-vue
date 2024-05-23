<template>
      <div class="authorCreate">
        <div class="breadcrumbs">
          <nav style="display: inline">
            <li><router-link :to="{name: 'home', params:{} }"> Home </router-link></li> /
            <li><router-link :to="{name: 'author', params:{} }"> author </router-link></li>/
            <li><router-link class="breadcrumbs-active" :to="{name: 'authorCreate', params:{} }"> create author </router-link></li>
          </nav>
        </div>
        <h1> Create author </h1>
        <author-form></author-form>
      </div>
    </template>
    <script>
    import AuthorForm from './AuthorForm.vue';

    export default {
      name: 'author',
      components: {
        AuthorForm
      },
      created() {
        this.$emit("showParent", false);
      }
    }
    </script>

    <style lang="css" scoped>
      h1 {
        text-transform: capitalize;
        text-align: center;
      }
      li {
        display: inline;
        text-transform: capitalize;
        font-size: 0.8em;
      }
      .breadcrumbs {
        background-color: white;
      }
      .breadcrumbs-active {
        text-decoration: underline;
        color: black;
        font-weight: bold;
      }
    </style>
    