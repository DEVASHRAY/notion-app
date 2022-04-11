import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import { style } from "./optionsStyles";

export default function SidePopup({
  label,
  performAction = () => {},
  ID,
  img,
}) {
  return (
    <CardContent
      sx={style.sideOptionsContent}
      onClick={(e) => {
        e.stopPropagation(e);
        performAction(e, ID, label);
      }}
    >
      <Image src={img} width={20} height={20} />
      <Typography
        style={style.task}
        sx={[{ marginLeft: "5px", paddingTop: "2px" }]}
      >
        {label}
      </Typography>
    </CardContent>
  );
}
