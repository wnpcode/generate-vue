<template>
        <div class="view">
          <div class="breadcrumbs">
            <nav style="display: inline">
              <li class="liTitle" ><router-link :to="{name: 'home', params:{} }"> Home </router-link></li> /
              <li class="liTitle" ><router-link :to="{name: 'author', params:{} }"> author </router-link></li>/
              <li class="liTitle" ><router-link class="breadcrumbs-active" :to="{name: 'authorView', params:{id: id} }"> view author </router-link></li>
            </nav>
          </div>

          <div class="row">
              <div class="card" style="width: 100%;">
                <div class="card-header">
                  View author
                </div>
                  <ul class="list-group list-group-flush">
                  
        <li v-if="author.name" class="list-group-item">
          <span class="liTitle">
            <strong> name: </strong>
          </span>{{author.name}}
        </li> 

        <li v-if="author.birth" class="list-group-item">
          <span class="liTitle">
            <strong> birth: </strong>
          </span>{{author.birth}}
        </li> 

        <li v-if="author.active" class="list-group-item">
          <span class="liTitle">
            <strong> active: </strong>
          </span>{{author.active}}
        </li> 

        <li v-if="author.sponsor" class="list-group-item">
          <span class="liTitle">
            <strong> sponsor: </strong>
          </span>{{author.sponsor}}
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
    import { getAuthor } from "@/services/author";

    export default {
      data() {
        return {
            id: '',
            author: {}
        }
      },
      methods : {
        goBack() {
          this.$router.go(-1);
        },
        edit(id) {
          this.$router.push({ name: "authorEdit", params: { id: id }});
        },
        setInstace() {
          getAuthor(this.id)
          .then((response) => {
            this.author = response.data;
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
    