/**
 * Creates individual snippet pages.
 */
const createSnippetPages = (snippets, snippetPage, createPage) => {
  snippets.forEach(snippet => {
    if (!snippet.node.archived) {
      createPage({
        path: `/snippet${snippet.node.slug}`,
        component: snippetPage,
        context: {
          snippet: snippet.node,
        },
      });
    } else {
      createPage({
        path: `/archive${snippet.node.slug}`,
        component: snippetPage,
        context: {
          snippet: snippet.node,
        },
      });
    }
  });
};

/**
 * Tell plugins to add pages.
 * Takes a query string and a templates object.
 * Creates pages by running individual methods.
 */
const createPages = (query, templates) => ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(query)
    .then(result => {
      if (result.errors) throw result.errors;

      createSnippetPages(
        result.data.allSnippet.edges,
        templates['SnippetPage'],
        createPage
      );

      return null;
    });
};

export default createPages;