<template>
        <div class="view">
          <div class="breadcrumbs">
            <nav style="display: inline">
              <li class="liTitle" ><router-link :to="{name: 'home', params:{} }"> Home </router-link></li> /
              <li class="liTitle" ><router-link :to="{name: 'company', params:{} }"> company </router-link></li>/
              <li class="liTitle" ><router-link class="breadcrumbs-active" :to="{name: 'companyView', params:{id: id} }"> view company </router-link></li>
            </nav>
          </div>

          <div class="row">
              <div class="card" style="width: 100%;">
                <div class="card-header">
                  View company
                </div>
                  <ul class="list-group list-group-flush">
                  
        <li v-if="company.name" class="list-group-item">
          <span class="liTitle">
            <strong> name: </strong>
          </span>{{company.name}}
        </li> 

        <li v-if="company.address" class="list-group-item">
          <span class="liTitle">
            <strong> address: </strong>
          </span>{{company.address}}
        </li> 

        <li v-if="company.active" class="list-group-item">
          <span class="liTitle">
            <strong> active: </strong>
          </span>{{company.active}}
        </li> 

                  </ul>
              </div>
          </div>

          <div class="row">
             <div class="col">
               <button
                 @click="edit(id)"
                 class="btn btn-warning "
               >
                 Edit
               </button>
               <button
                 type="button"
                 @click="goBack()"
                 name="button"
                 class="btn btn-default"
               >
                 Back
               </button>
             </div>
          </div>
      </div>
    </template>

    <script>
    import { getCompany } from "@/services/company";

    export default {
      data() {
        return {
            id: '',
            company: {}
        }
      },
      methods : {
        goBack() {
          this.$router.go(-1);
        },
        edit(id) {
          this.$router.push({ name: "companyEdit", params: { id: id }});
        },
        setInstace() {
          getCompany(this.id)
          .then((response) => {
            this.company = response.data;
          })
        }
      },
      created() {
        this.id = this.$route.params.id;
        this.setInstace();
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

      font-size: 0.8em;
    }
    .liTitle {
    text-transform: capitalize;
    }
    .breadcrumbs {
      background-color: white;
    }
    .breadcrumbs-active {
      text-decoration: underline;
      color: black;
      font-weight: bold;
    }
    button {
      margin: 8px;
      width: 30%;
      float: right;
    }
    </style>
    