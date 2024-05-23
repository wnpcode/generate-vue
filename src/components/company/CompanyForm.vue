<template>
      <div id="companyForm" class="form">
       <form @submit.prevent="handleSubmit">
        	<div class="form-group">
		<label for="name">name</label>
	<input id="name" class="form-control"  type="text"  required="true"  v-model="company.name">

</div>
	<div class="form-group">
		<label for="address">address</label>
	<textarea id="address" style="width: 100%" v-model="company.address" rows="10">You text here...</textarea>

</div>
	<div class="form-group">
		<label for="active">active</label>
<br />	<input type="radio" id="Active" value="true" v-model="company.active">
	<label for="Active">true</label><br>

	<input type="radio" id="Inactive" value="false" v-model="company.active">
	<label for="Inactive">false</label><br>

</div>

    <button v-if="id" type="submit"  name="buttonUpdate" class="btn btn-primary " >Update</button>
    <button v-else type="submit"  name="buttonCreate" class="btn btn-success " >Save</button>
    <button  type="button" @click="goBack" name="button" class="btn btn-default" >Back</button>
    
       </form>
      </div>
    </template>
    
<script>
  import { getCompany } from "@/services/company";
  
  import { mapActions } from "vuex";

  

  export default {
    props: ["id"],
    data () {
      return {
        company: {
          relations: {
            
          },
          name: '',
address: '',
active: '',

        }
      }
    },
    created() {
      this.setInstace();
    },
    methods: {
      ...mapActions("company", ["createCompany", "updateCompany"]),
      
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
            let company = this.company;
            delete company.relations;

            this.updateCompany(company)
            .then( (response) => {
              if ( response ) {
                  this.$modal.show({title: "Success", message: "company was updated with successfull!", alert: "success"});
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
            let company = this.company;
            delete company.relations;

            this.createCompany(company)
            .then( response => {
                if (response) {
                  this.$modal.show({title: "Success", message: "company was created with successfull!", alert: "success"});
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
          this.company.id = this.id;
          getCompany(this.id)
            .then(response => {
              let instance = response.data;
              for (let property in instance) {
                if (instance.hasOwnProperty(property) && this.company.hasOwnProperty(property)) {
                  this.company[property] = instance[property];
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

