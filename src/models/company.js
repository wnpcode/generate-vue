const resource = {
  endPoint: "company",
};

const model = {
  name: {
    type: "text",
    required: true,
  },
  address: {
    type: "textarea",
    required: true,
  },
  active: {
    type: "radio",
    options: [
      { id: "Active", value: true },
      { id: "Inactive", value: false },
    ],
  },
  // sponsor: {
  //   type: "select",
  //   options: ["Patreon", "Legacy"]
  // }
};

module.exports = { model, resource };
