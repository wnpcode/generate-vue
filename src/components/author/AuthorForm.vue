<template>
      <div id="authorForm" class="form">
       <form @submit.prevent="handleSubmit">
        	<div class="form-group">
		<label for="name">name</label>
	<input id="name" class="form-control"  type="text"  required="true"  v-model="author.name">

</div>
	<div class="form-group">
		<label for="birth">birth</label>
	<input id="birth" class="form-control"  type="date"  required="true"  v-model="author.birth">

</div>
	<div class="form-group">
		<label for="active">active</label>
<br />	<input type="radio" id="Active" value="true" v-model="author.active">
	<label for="Active">true</label><br>

	<input type="radio" id="Inactive" value="false" v-model="author.active">
	<label for="Inactive">false</label><br>

</div>
	<div class="form-group">
		<label for="sponsor">sponsor</label>

          <multiselect
            v-model="author.sponsor"
            :options="author.relations.sponsor"
            :searchable="true"
            :close-on-select="true"
            :show-labels="false"
            placeholder="Pick a value"
            />
</div>

    <button v-if="id" type="submit"  name="buttonUpdate" class="btn btn-primary " >Update</button>
    <button v-else type="submit"  name="buttonCreate" class="btn btn-success " >Save</button>
    <button  type="button" @click="goBack" name="button" class="btn btn-default" >Back</button>
    
       </form>
      </div>
    </template>
    
<script>
  import { getAuthor } from "@/services/author";
  
  import { mapActions } from "vuex";

  

  export default {
    props: ["id"],
    data () {
      return {
        author: {
          relations: {
            sponsor: ["Patreon","Legacy"],

          },
          name: '',
birth: '',
active: '',
sponsor: '',

        }
      }
    },
    created() {
      this.setInstace();
    },
    methods: {
      ...mapActions("author", ["createAuthor", "updateAuthor"]),
      
      async handleSubmit() {
        if (this.id) {
          //Implements here your submit method UPDATE
          /**
          * type equals 0 means that this modal disappear automatically after 1500 milliseconds
          * type equals 1 means that this modal  will have button close without timer
          * type equals 2 means that this modal will have button close and ok without timer
          */
          let option = await this.$modal.show({title: "Warning", message: "Do you have sure that want complete this updated?", alert: "warning", type: 2});
          if (option) {
            let author = this.author;
            delete author.relations;

            this.updateAuthor(author)
            .then( (response) => {
              if ( response ) {
                  this.$modal.show({title: "Success", message: "author was updated with successfull!", alert: "success"});
                  this.goBack();
              }
            }).catch(error => {
              this.$modal.show({title: "Error", message: "Server response with error" + error, alert: "danger", type: 1});
            });
          }
        } else {
          //Implements here your submit method CREATE
          let option = await this.$modal.show({title: "Warning", message: "Do you want to continue?", alert: "warning", type: 2});
          if (option){
            let author = this.author;
            delete author.relations;

            this.createAuthor(author)
            .then( response => {
                if (response) {
                  this.$modal.show({title: "Success", message: "author was created with successfull!", alert: "success"});
                  this.goBack();
                }
            }).catch(error => {
              this.$modal.show({title: "Error", message: "Server response with error" + error, alert: "danger", type: 1});
            })
          }
        }
      },
      goBack() {
        this.$router.go(-1);
      },
      setInstace() {
        if (this.id) {
          this.author.id = this.id;
          getAuthor(this.id)
            .then(response => {
              let instance = response.data;
              for (let property in instance) {
                if (instance.hasOwnProperty(property) && this.author.hasOwnProperty(property)) {
                  this.author[property] = instance[property];
                }
              }
            })
        }
        this.setDependencies();
      },
      setDependencies() {
        
      }
    },
    components: {
      
    }
  }
</script>
<style lang="css" scoped>
  label {
    text-transform: capitalize;
  }
  button {
    margin: 8px;
    width: 30%;
    float: right;
  }
  form {
    overflow: hidden;
  }
</style>

