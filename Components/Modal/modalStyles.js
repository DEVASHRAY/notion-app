export const style = {
  modalContainer: {
    border: "none",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    height: "70vh",
    border: "1px solid #FFF !important",
    outline: "none !important",
  },

  inputBox: {
    width: "fit-content",

    "& .MuiTextField-root": {
      width: "100%",
      border: "none",
      outline: "none",
    },
  },

  inputField: {
    "& .MuiInputBase-input": {
      fontSize: 30,
      fontWeight: "bold",
    },
  },

  descriptionInput: {
    "& .MuiInputBase-input": {
      fontSize: 15,
    },
  },

  statusBox: {
    display: "flex",
    // maxWidth: "200px",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15px",

    "&:last-child": {
      marginTop: "15px",
    },
  },

  flex: {
    display: "flex",
    alignItems: "center",
  },

  leftLabel: {
    marginRight: "10px",
    minWidth: "160px",
  },

  rightLabel: {
    flex: 2,
    padding: "5px 10px",
    position: "relative",

    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgba(236,236,236 , 1)",
      borderRadius: "4px",
    },
  },

  descriptionBox: {
    marginTop: 4,
  },

  sidePopup: {
    position: "absolute",
    width: "200px",
    top: 40,
    left: -50,
    zIndex: "999",
  },

  statusPopup: {
    position: "absolute",
    width: "200px",
    top: 36,
    left: -50,
    zIndex: "999",
  },

  sideOptionsContent: {
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    paddingBottom: "15px !important",

    "&:hover": {
      cursor: "pointer !important",
    },
  },

  cursor: {
    cursor: "pointer",
  },
};
