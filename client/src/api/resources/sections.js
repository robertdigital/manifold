export default {
  show(id) {
    return {
      endpoint: `/api/v1/text_sections/${id}`,
      method: "GET",
      options: {}
    };
  },

  update(id, textSection) {
    return {
      endpoint: `/api/v1/text_sections/${id}`,
      method: "PUT",
      options: {
        body: JSON.stringify({ type: "text_sections", data: textSection })
      }
    };
  },

  create(textSection) {
    return {
      endpoint: "/api/v1/text_sections",
      method: "POST",
      options: {
        body: JSON.stringify({ type: "text_sections", data: textSection })
      }
    };
  },

  forText(textId) {
    return {
      endpoint: `/api/v1/texts/${textId}/relationships/text_sections`,
      method: "GET",
      options: {}
    };
  }
};
