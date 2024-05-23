
    import service from "@/services/httpService";

    const END_POINT = "/authors";

    const getAuthor = id => service.get(END_POINT + "/" + id);

    const getAllAuthors = params => service.get(END_POINT, { params });

    const createAuthor = author => service.post(END_POINT,  author );

    const updateAuthor = author => service.put(END_POINT  + "/" + author.id,  author );

    const deleteAuthor = id => service.delete(END_POINT  + "/" + id);

    export {
      getAuthor,
      getAllAuthors,
      createAuthor,
      updateAuthor,
      deleteAuthor
    };
    