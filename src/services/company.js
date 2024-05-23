
    import service from "@/services/httpService";

    const END_POINT = "/company";

    const getCompany = id => service.get(END_POINT + "/" + id);

    const getAllCompanies = params => service.get(END_POINT, { params });

    const createCompany = company => service.post(END_POINT,  company );

    const updateCompany = company => service.put(END_POINT  + "/" + company.id,  company );

    const deleteCompany = id => service.delete(END_POINT  + "/" + id);

    export {
      getCompany,
      getAllCompanies,
      createCompany,
      updateCompany,
      deleteCompany
    };
    