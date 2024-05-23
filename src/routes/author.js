
    import AuthorView from "@/components/author/AuthorView.vue";
    import AuthorIndex from "@/components/author/AuthorIndex.vue";
    import AuthorEdit from "@/components/author/AuthorEdit.vue";
    import AuthorCreate from "@/components/author/AuthorCreate.vue";

    const author = {
      path: "/author",
      name: "author",
      component: AuthorIndex,
      children: [
        { path: "view/:id", component: AuthorView , name: "authorView" },
        { path: "edit/:id", component: AuthorEdit , name: "authorEdit" },
        { path: "create", component: AuthorCreate , name: "authorCreate"}
      ]
    };

    export default author;
    