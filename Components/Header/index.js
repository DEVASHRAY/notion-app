import React from "react";
import Image from "next/image";
import taskLogo from "../../assets/task.png";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styles } from "./headerStyles";

const Header = () => {
  return (
    <>
      <Box sx={styles.drawerWidth}>
        <Image
          src={taskLogo}
          alt="Picture of the author"
          width={70}
          height={70}
        />
        <Typography sx={styles.headerText}>Task Board</Typography>
      </Box>

      <Box
        sx={{
          marginTop: 4,
          borderBottom: "1px solid #888",
          fontWeight: "500 !important",
        }}
      >
        <Typography>Task Board</Typography>
      </Box>
    </>
  );
};

export default Header;
