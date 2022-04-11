import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styles } from "./cardStyles";

const TaskCards = ({ task }) => {
  return (
    <>
      <Box sx={styles.cardBox}>
        <Card sx={styles.cards}>
          <CardContent sx={styles.cardsContent}>
            <Typography style={styles.task}>{task.title}</Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default TaskCards;
