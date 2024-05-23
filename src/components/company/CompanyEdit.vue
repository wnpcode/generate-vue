<template>
      <div class="companyEdit">
        <div class="breadcrumbs">
          <nav style="display: inline">
            <li><router-link :to="{name: 'home', params:{} }"> Home </router-link></li> /
            <li><router-link :to="{name: 'company', params:{} }"> company </router-link></li>/
            <li><router-link class="breadcrumbs-active" :to="{name: 'companyEdit', params:{id: id} }"> edit company </router-link></li>
          </nav>
        </div>
        <h1> Edit company </h1>
        <company-form :id="id"></company-form>
      </div>
    </template>

    <script>
    import CompanyForm from './CompanyForm.vue';

    export default {
      name: 'company',
      data () {
        return {
          id: 'Teste'
        }
      },
      components: {
        CompanyForm
      },
      created () {
          this.id = this.$route.params.id;
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
    