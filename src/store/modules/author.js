
    import {
      getAllAuthors,
      createAuthor,
      updateAuthor,
      deleteAuthor
    } from "@/services/author";

    const state = {
      authors: [],
      processed: false
    };

    const getters = {
      getAuthors(state) {
        return state.authors;
      },
      authorProcessed(state){
        return state.processed;
      }
    };

    const actions = {
      fetchAuthors({ commit }, params) {
          return new Promise((resolve, reject) => {
            getAllAuthors(
              params
            )
              .then(response => {
                commit("SET_AUTHORS", response.data);
                resolve(response.data);
              })
              .catch(error => {
                reject(error);
              });
          });
        },
        createAuthor({ commit }, author) {
          return new Promise((resolve, reject) => {
            createAuthor(author)
              .then(response => {
                commit("CREATED_AUTHOR");
                resolve(response.data);
              })
              .catch(error => {
                reject(error);
              });
          });
        },
        updateAuthor({ commit }, author) {
          return new Promise((resolve, reject) => {
            updateAuthor(author)
              .then(response => {
                commit("UPDATED_AUTHOR");
                resolve(response.data);
              })
              .catch(error => {
                reject(error);
              });
          });
        },
        deleteAuthor({ commit }, id) {
          return new Promise((resolve, reject) => {
            deleteAuthor(id)
              .then(response => {
                commit("DELETED_AUTHOR");
                resolve(response.data);
              })
              .catch(error => {
                reject(error);
              });
          });
        }
      };

    const mutations = {
      SET_AUTHORS(state, data) {
        state.authors = data;
        state.processed = false;
      },
      CREATED_AUTHOR(state) {
        state.processed = true;
      },
      UPDATED_AUTHOR(state) {
        state.processed = true;
      },
      DELETED_AUTHOR(state) {
        state.processed = true;
      }
    };

    export default {
      state,
      getters,
      actions,
      mutations
    };
    