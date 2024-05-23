
    import {
      getAllCompanies,
      createCompany,
      updateCompany,
      deleteCompany
    } from "@/services/company";

    const state = {
      companies: [],
      processed: false
    };

    const getters = {
      getCompanies(state) {
        return state.companies;
      },
      companyProcessed(state){
        return state.processed;
      }
    };

    const actions = {
      fetchCompanies({ commit }, params) {
          return new Promise((resolve, reject) => {
            getAllCompanies(
              params
            )
              .then(response => {
                commit("SET_COMPANIES", response.data);
                resolve(response.data);
              })
              .catch(error => {
                reject(error);
              });
          });
        },
        createCompany({ commit }, company) {
          return new Promise((resolve, reject) => {
            createCompany(company)
              .then(response => {
                commit("CREATED_COMPANY");
                resolve(response.data);
              })
              .catch(error => {
                reject(error);
              });
          });
        },
        updateCompany({ commit }, company) {
          return new Promise((resolve, reject) => {
            updateCompany(company)
              .then(response => {
                commit("UPDATED_COMPANY");
                resolve(response.data);
              })
              .catch(error => {
                reject(error);
              });
          });
        },
        deleteCompany({ commit }, id) {
          return new Promise((resolve, reject) => {
            deleteCompany(id)
              .then(response => {
                commit("DELETED_COMPANY");
                resolve(response.data);
              })
              .catch(error => {
                reject(error);
              });
          });
        }
      };

    const mutations = {
      SET_COMPANIES(state, data) {
        state.companies = data;
        state.processed = false;
      },
      CREATED_COMPANY(state) {
        state.processed = true;
      },
      UPDATED_COMPANY(state) {
        state.processed = true;
      },
      DELETED_COMPANY(state) {
        state.processed = true;
      }
    };

    export default {
      state,
      getters,
      actions,
      mutations
    };
    