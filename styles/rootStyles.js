export const styles = {
  containers: {
    ["@media (min-width:780px)"]: {},
  },

  container: {
    paddingTop: 2,
    maxWidth: "100%",
    margin: "auto",
    // marginLeft: "150px",
    minWidth: "fit-content",
    padding: "40px 100px",
    ["@media (max-width:960px)"]: {
      // marginLeft: "10px",
      padding: "15px 10px",

    },
  },

  addGroupContainer: {
    display: "flex",
    alignItems: "center",
    // marginBottom: "3px",
    marginTop: "5px",
    minWidth: "200px",
  },

  addNewTaskBox: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",

    "&:hover": {
      backgroundColor: "rgba(236,236,236)",
      borderRadius: "4px",
      cursor: "pointer",
    },
  },
};
