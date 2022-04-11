import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import SideOptions from "../SideOptions";

import statusIcon from "../../assets/modalStatus.png";
import assignIcon from "../../assets/assign.png";
import moreOptions from "../../assets/moreOptions.webp";
import deleteIcon from "../../assets/delete.png";
import SidePopup from "../SideOptions";
import { style } from "./modalStyles";
import { storeAllTask } from "../../Helpers/storeData";

const options = [
  {
    id: 0,
    img: statusIcon,
    label: "Status",
  },
  {
    id: 1,
    img: assignIcon,
    label: "Assign",
  },
];

const sideOptions = [
  {
    id: 0,
    img: deleteIcon,
    label: "Delete",
  },
];

const statusOptions = ["In Progress", "Completed", "Pending"];

export default function BasicModal({
  taskList,
  selectedTaskID,
  openModal,
  setOpenModal,
  activeTaskIDForModal,
  setTaskList,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalData, setModalData] = useState({});
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [showMoreOptionModal, setShowMoreOptionModal] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);

  useEffect(() => {
    const filteredData = taskList.filter((task) => {
      if (task.taskID === activeTaskIDForModal) {
        setModalData({ ...task });
        setEnteredTitle(task.title);
        setEnteredDescription(task.description);
        setSelectedStatus(task.Status);
      }
    });
  }, []);

  const modifyTaskfromModal = (e, changeInTitle = false) => {
    e.preventDefault();
    const { value } = e.target;

    const newTaskList = taskList.map((task) => {
      if (task.taskID === activeTaskIDForModal) {
        return changeInTitle
          ? { ...task, title: value }
          : { ...task, description: value };
      }
      return task;
    });

    setTaskList(newTaskList);
    storeAllTask(newTaskList);
  };

  const deleteTask = (e, taskID) => {
    const newTaskList = taskList.filter((task) => task.taskID !== taskID);

    storeAllTask(newTaskList);

    setTaskList(newTaskList);

    setOpenModal(false);
  };

  const updateStatus = (e, taskID, updateStatus) => {
    const newTaskList = taskList.map((task) => {
      if (task.taskID === taskID) {
        return { ...task, Status: updateStatus };
      }
      return task;
    });
    storeAllTask(newTaskList);
    setTaskList(newTaskList);
    setSelectedStatus(updateStatus);
    setShowStatusPopup(false);
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="Modal"
        sx={style.modalContainer}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onClick={() => setOpenModal(false)}
      >
        <Box
          sx={style.modal}
          onClick={(e) => {
            e.stopPropagation();
            setShowMoreOptionModal(false);
            setShowStatusPopup(false);
          }}
        >
          <Box
            sx={{
              marginLeft: "auto",
              width: "fit-content",
              position: "relative",
            }}
          >
            <Image
              src={moreOptions}
              width={50}
              height={50}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                setShowMoreOptionModal(true);
                setShowStatusPopup(false);
              }}
            />
            {showMoreOptionModal && (
              <>
                <Card
                  sx={style.sidePopup}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {sideOptions.map((option) => (
                    <>
                      <SidePopup
                        label={option.label}
                        performAction={deleteTask}
                        ID={modalData?.taskID}
                        img={option.img}
                      />
                    </>
                  ))}
                </Card>
              </>
            )}
          </Box>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={style.inputBox}
          >
            <TextField
              id="standard-size-normal"
              variant="standard"
              sx={style.inputField}
              autoFocus
              InputProps={{ disableUnderline: true }}
              value={enteredTitle}
              onChange={(event) => {
                event.preventDefault();
                setEnteredTitle(event.target.value);
                // setEnteredText(event.target.value);
              }}
              onBlur={(e) => modifyTaskfromModal(e, true)}
            />
          </Box>

          {React.Children.toArray(
            options.map((option, i) => (
              <Box sx={style.statusBox}>
                <Box sx={[style.flex, style.leftLabel]}>
                  <Image src={option.img} width={20} height={20} />
                  <Typography style={{ marginLeft: 8 }}>
                    {option.label}
                  </Typography>
                </Box>

                <Box
                  sx={style.rightLabel}
                  onClick={(e) => {
                    e.stopPropagation();
                    i === 0
                      ? (() => {
                          setShowStatusPopup(true);
                          setShowMoreOptionModal(false);
                        })()
                      : null;
                  }}
                >
                  <Typography>{i === 0 ? selectedStatus : "Me"}</Typography>

                  {showStatusPopup && i === 0 && (
                    <>
                      <Card sx={style.statusPopup}>
                        {statusOptions.map((staus) => {
                          return (
                            <>
                              <SidePopup
                                label={staus}
                                performAction={updateStatus}
                                ID={modalData?.taskID}
                                img={moreOptions}
                              />
                            </>
                          );
                        })}
                      </Card>
                    </>
                  )}
                </Box>
              </Box>
            ))
          )}

          <Box sx={style.descriptionBox}>
            <TextField
              id="standard-size-normal"
              variant="standard"
              sx={style.descriptionInput}
              InputProps={{ disableUnderline: true }}
              value={enteredDescription}
              autoComplete={"off"}
              placeholder="Add description here"
              onChange={(event) => {
                event.preventDefault();
                setEnteredDescription(event.target.value);
                // setEnteredText(event.target.value);
              }}
              onBlur={(e) => modifyTaskfromModal(e, false)}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
