export const styles = {
  cardBox: {
    minWidth: "270px",
    maxHeight: "40px",
    overFlow: "hidden",
  },

  ["@media (min-width:780px)"]: {},

  cards: {
    "& .MuiCardContent-root": {
      // padding: "0px",
      paddingBottom: "8px !important",
      paddingTop: 1,
      "&:hover": {
        backgroundColor: "rgba(236,236,236,1)",
      },
    },
  },

  cardsContent: {},
  task: {
    overflow: "hidden",
  },
};
