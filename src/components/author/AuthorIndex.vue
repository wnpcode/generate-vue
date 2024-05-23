<template>
      <div class="index container">

      <transition name="fade">
        <router-view @showParent="showParent">
        </router-view>
      </transition>

      <div v-if="showParentPage">
        <div class="breadcrumbs">
          <nav style="display: inline">
            <li><router-link :to="{name: 'home', params:{} }"> Home </router-link></li> /
            <li><router-link class="breadcrumbs-active" :to="{name: 'author', params:{} }"> author </router-link></li>
          </nav>
        </div>

        <div class="row">
          <div class="col">
            <router-link class="btn btn-primary create-button" :to="{ name: 'authorCreate', params: {} }">Create <i class="fa fa-plus" aria-hidden="true"></i></router-link>
          </div>
        </div>

        <div class="row">
          <div class="form-group has-search col">
              <span class="fa fa-search form-control-feedback"></span>
              <input type="text" v-model="search" class="form-control search">
          </div>
          <div class="col">
            <div  class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">Show</div>
              </div>
                <select v-model="pagination.numberRegisterForPage" id="inlineFormInputGroup" class="form-control" >
                  <option v-for="n in [5,10,25,50,100]" :key="n" v-bind:value="n">
                    {{n}}
                  </option>
                </select>
            </div>
          </div>
        </div>

        <div class="table-container">
          <div class="total-pages col">
            <small v-if="mainList.length > 0">Total {{mainList.length}} entryes.</small>
            <small v-else >Not found entryes or server response.</small>
            <small v-if="search != ''"> Searching term for: "{{search}}"</small>
          </div>
          <table class="table table-striped" >
            <thead>
              <tr>
                  <th @click="sortBy('name')"> name <i style="float: right" class="fa fa-sort"> </i></th>
<th @click="sortBy('birth')"> birth <i style="float: right" class="fa fa-sort"> </i></th>
<th @click="sortBy('active')"> active <i style="float: right" class="fa fa-sort"> </i></th>
<th @click="sortBy('sponsor')"> sponsor <i style="float: right" class="fa fa-sort"> </i></th>

                  <th>
                    <div class="options-th">
                      Options
                    </div>
                  </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(author, index) in authorList" :key="index">
                <td>{{author.name}}</td>
<td>{{author.birth}}</td>
<td>{{author.active}}</td>
<td>{{author.sponsor}}</td>

    <td>
      <div class="options-button">
        <button class="btn btn-info" @click="view(author.id)" >
          <i class="fa fa-eye" aria-hidden="true"></i>
        </button>
        <button class="btn btn-warning" @click="edit(author.id)" >
          <i class="fa fa-edit" aria-hidden="true"></i>
        </button>
        <button class="btn btn-danger" @click="remove(author.id)">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
    </td>
    
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination row">
          <div class="col" >
            <button type="button" class="btn btn-default" @click="pagination.current = 0" name="button">First</button>
            <button type="button" class="btn btn-default" @click="pagination.current -= 1 " name="button"><i class="fa fa-backward"></i></button>
            <span>Page:<strong> {{pagination.current + 1}}  </strong></span>
            <button type="button" class="btn btn-default" @click="pagination.current += 1" name="button"><i class="fa fa-forward"></i></button>
            <button type="button" class="btn btn-default" @click="pagination.current = pagination.numberPages" name="button">Last</button>
          </div>
        </div>
      </div>
    </div>
  </template>

    <script>
    import { mapActions, mapGetters } from "vuex";

    export default {
      data(){
        return {
          pagination: {
            current: 0,
            numberPages: 0,
            numberRegisterForPage: 5
          },
          authorList: [],
          mainList:[],
          showParentPage: true,
          sort: {
            key: null
          },
          search : ''
        }
      },
      computed: {
        ...mapGetters("author", ["authorProcessed", "getAuthors"]),
      },
      methods: {
        ...mapActions("author", ["deleteAuthor", "fetchAuthors"]),
        view(id){
          this.$router.push({ name: 'authorView', params: { id: id }})
        },
        edit(id){
          this.$router.push({ name: "authorEdit", params: { id: id }})
        },
        async remove(id){
          let option = await this.$modal.show({title: "Danger", message: "Do you want delete this author?" , alert : "danger"});
          if(option){
            this.deleteAuthor(id)
              .then( response => {
                this.$modal.show({title: "Success", message: "author was deleted with successfull!", alert: "info"});
                this.getResources();
              }).catch(err => {
                  this.$modal.show({title: "Error", message: "Server response with error" + error, alert: "danger", type: 1});
              });
          }
        },
        getResources () {
          if (this.authorProcessed || this.mainList.length === 0) {
            this.fetchAuthors()
              .then(response => {
                this.mainList = response;
              })
              .catch(error => {
                this.$modal.show({title: "Error", message: "Server response with error" + error, alert: "danger", type: 1});
              });
          } else {
            this.mainList = this.getAuthors;
          }
        },
        sortBy(param){
          if (this.sort.key == param){
            this.mainList.reverse();
            return
          }

          this.mainList.sort((a, b) => {
            if(a[param] < b[param]) return -1;
            if(a[param] > b[param]) return 1;
            return 0;
          });
          this.sort.key = param;
        },
        showParent(show) {
          this.showParentPage = show;
        }
      },
      watch: {
        'pagination.current': function(value){
          this.pagination.numberPages = parseInt(this.mainList.length / this.pagination.numberRegisterForPage);
          if (value < 1) {
            this.pagination.current = 0;
          }
          if(value > this.pagination.numberPages){
            this.pagination.current = this.pagination.numberPages;
          }
          this.authorList = this.mainList.slice((this.pagination.current * this.pagination.numberRegisterForPage), ((this.pagination.current * this.pagination.numberRegisterForPage) + this.pagination.numberRegisterForPage ));
        },
        'pagination.numberRegisterForPage': function(){
            this.pagination.current = -1;
        },
        'mainList': function(value){
          this.authorList = value.slice((this.pagination.current * this.pagination.numberRegisterForPage), ((this.pagination.current * this.pagination.numberRegisterForPage) + this.pagination.numberRegisterForPage ));
        },
        'search': function( text){
          this.authorList = this.mainList.filter( object => JSON.stringify(object).includes(text))
        }
      },
      created() {
        this.getResources();

        this.authorList = this.mainList.slice(0,10);
        this.pagination.numberPages = parseInt(this.mainList.length / this.pagination.numberRegisterForPage);
      },
      beforeRouteUpdate(to, from, next) {
        const toDepth = to.path.split("/").length;
        const fromDepth = from.path.split("/").length;
        this.showParentPage = toDepth < fromDepth;
        if (this.showParentPage) {
          this.getResources();
        }
        next();
      }
    }
    </script>

    <style lang="css" scoped>
    .container {
      text-align: left;
    }
    .options-button {
      float: right;
      min-width: 100px;
      width: 100px;
      margin-right: 23px;

    }
    .create-button {
      float: right;
      min-width: 100px;
      width: 130px;
      margin: 8px;
    }
    .options-th {
      float: right;
      width: 80px;
    }
    table tbody tr:hover {
      background-color: #ccc;
    }
    th{
      text-transform: capitalize;
    }
    .table-container {
      overflow-x: auto;
      white-space: nowrap;
    }
    .table-container table {
      width: 100%;
    }
    .total-pages {
      float: right;
    }
    .pagination {
      width: 98%;
      margin-left: auto;
      margin-right: auto;
      vertical-align: center;
      text-align: center;
    }
    .pagination button {
      margin: 2px;
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
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    .has-search .form-control-feedback {
      position: absolute;
      z-index: 2;
      display: block;
      width: 2.375rem;
      height: 2.375rem;
      line-height: 2.375rem;
      text-align: center;
      pointer-events: none;
      color: #aaa;
    }
    .search {
      padding-left: 2.378rem;
    }

    </style>

    