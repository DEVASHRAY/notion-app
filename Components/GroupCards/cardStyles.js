export const styles = {
  StatusContainer: {
    display: "flex",
    justifyContent: "space-between",
    minWidth: "270px",
    marginRight: 4,
    ["@media (min-width:780px)"]: {},
  },

  flexStyle: {
    display: "flex",
  },

  hoverStyle: {
    "&:hover": {
      cursor: "pointer",
    },
  },

  addNewTaskBox: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    minWidth: 275,
    maxWidth: 275,
    padding: "8px 5px 8px 0px",
    marginTop: "22px",

    "&:hover": {
      backgroundColor: "rgba(236,236,236)",
      borderRadius: "4px",
      cursor: "pointer",
    },
  },

  groupPopup: {
    position: "relative",
  },

  groupOptions: {
    position: "absolute",
    width: "200px",
    top: 30,
    left: -160,
    zIndex: "999",
  },
};
