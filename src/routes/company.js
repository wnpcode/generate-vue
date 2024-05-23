
    import CompanyView from "@/components/company/CompanyView.vue";
    import CompanyIndex from "@/components/company/CompanyIndex.vue";
    import CompanyEdit from "@/components/company/CompanyEdit.vue";
    import CompanyCreate from "@/components/company/CompanyCreate.vue";

    const company = {
      path: "/company",
      name: "company",
      component: CompanyIndex,
      children: [
        { path: "view/:id", component: CompanyView , name: "companyView" },
        { path: "edit/:id", component: CompanyEdit , name: "companyEdit" },
        { path: "create", component: CompanyCreate , name: "companyCreate"}
      ]
    };

    export default company;
    