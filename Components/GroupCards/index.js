import React, { useState, useRef } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Box from "@mui/material/Box";
import { Input } from "../../Components";
import { styles } from "./cardStyles";

import status from "../../assets/Status.png";
import moreOptions from "../../assets/moreOptions.webp";
import addIcon from "../../assets/addIcon.png";
import deleteIcon from "../../assets/delete.png";
import TaskCards from "../Cards";
import SidePopup from "../SideOptions";
import { storeAllGroups, storeAllTask } from "../../Helpers/storeData";

export default function GroupCards({
  groupHeading = "",
  totalTask = 0,
  setOpenModal,
  taskList,
  groupID,
  showInputToAddTask,
  setShowInputToAddTask,
  selectedTaskID,
  setSelectedTaskID,
  enteredText,
  setEnteredText,
  setGroups,
  groups,
  addNewTask,
  setTaskList,
  setActiveTaskIDForModal,
  taskNo,
  showGroupPopup,
  setShowGroupPopup,
  activeGroupC,
  setActiveGroupC,
}) {
  const dragItem = useRef();
  const dragItemTaskID = useRef();

  const dragAndDropAnimation = (e, display) => {
    let isMobile = window.matchMedia("(max-width: 960px)");

    if (isMobile.matches) {
      display = "block";
    } else {
      display = display;
    }

    const target = e.target;

    setTimeout(() => {
      target.style.display = display;
    }, 0);
  };

  const dragStart = (e, position, taskID) => {
    dragItem.current = position;
    dragItemTaskID.current = taskID;

    dragAndDropAnimation(e, "none");
  };

  const dragEnter = (e, position, taskID) => {
    localStorage.setItem("moveToGroup", JSON.stringify(position));
  };

  const drop = (e, groupID, taskID) => {
    dragAndDropAnimation(e, "block");

    const taskListCopy = [...taskList];
    const newTaskList = taskListCopy.map((task, i) => {
      if (
        task.id === dragItem.current &&
        task.taskID === dragItemTaskID.current
      ) {
        return { ...task, id: parseInt(localStorage.getItem("moveToGroup")) };
      }
      return task;
    });

    setTaskList(newTaskList);
    storeAllTask(newTaskList);
  };

  const deleteGroup = (e, id) => {
    e.preventDefault();

    const newGroup = groups.filter((group) => group.id !== id);
    const newTaskList = taskList.filter((task) => task.id !== id);
    setGroups(newGroup);
    setTaskList(newTaskList);

    storeAllGroups(newGroup);
    storeAllTask(newTaskList);

    setShowGroupPopup(false);
  };

  const inputProps = {
    enteredText,
    setEnteredText,
    groupID,
    inputForTask: true,
    addNewTask,
  };

  return (
    <Box>
      <Box sx={styles.StatusContainer}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image src={status} width={20} height={20} />
          <Typography sx={{ marginLeft: "4px", fontWeight: "bold" }}>
            {groupHeading}
          </Typography>

          <Typography
            sx={{
              marginLeft: "4px",
              color: "#888",
              fontWeight: "light",
              marginLeft: 1,
              // fontSize: 15,
            }}
          >
            {taskNo[groupID] || 0}
          </Typography>
        </Box>

        <Box sx={styles.flexStyle}>
          <Box
            sx={[styles.hoverStyle, styles.groupPopup]}
            onClick={(e) => {
              e.stopPropagation();
              setActiveGroupC(groupID);
              setShowGroupPopup(true);
            }}
          >
            <Image src={moreOptions} width={30} height={30} />
            {showGroupPopup && groupID === activeGroupC && (
              <Card sx={styles.groupOptions}>
                <SidePopup
                  label={"Delete"}
                  performAction={deleteGroup}
                  ID={groupID}
                  img={deleteIcon}
                />
              </Card>
            )}
          </Box>
          <Box
            sx={styles.hoverStyle}
            onClick={() => {
              setSelectedTaskID(groupID);
              setShowInputToAddTask(true);
            }}
          >
            <Image src={addIcon} width={30} height={30} />
          </Box>
        </Box>
      </Box>

      {/* TASK LIST */}

      {taskList.map(
        (task) =>
          task.id === groupID && (
            <>
              <Box
                draggable={true}
                sx={{
                  minWidth: 280,
                  maxWidth: 280,
                  padding: "8px 5px 8px 0px",
                  marginTop: 2,
                }}
                id={
                  task.id +
                  task.title.substring(0, 3) +
                  Math.floor(Math.random() * 101)
                }
                onClick={() => {
                  setActiveTaskIDForModal(task.taskID);
                  setOpenModal(true);
                }}
                onDragStart={(e) => dragStart(e, groupID, task.taskID)}
                onDragEnter={(e) => dragEnter(e, groupID)}
                onDragEnd={drop}
              >
                <TaskCards task={task} />
              </Box>
            </>
          )
      )}

      {/* INPUT TO ADD TASK */}

      {showInputToAddTask && selectedTaskID === groupID ? (
        <Input {...inputProps} />
      ) : null}

      {/* INPUT TO ADD TASK */}

      {/* NEW BUTTON TO ADD TASK */}

      <Box
        sx={[styles.addNewTaskBox]}
        onClick={() => {
          setSelectedTaskID(groupID);
          setShowInputToAddTask(true);
        }}
        onDragStart={(e) => dragStart(e, groupID, task.taskID)}
        onDragEnter={(e) => dragEnter(e, groupID)}
        onDragEnd={drop}
      >
        <Image src={addIcon} width={30} height={30} />
        <Typography>New</Typography>
      </Box>

      {/* NEW BUTTON TO ADD TASK */}

      {/* TASK LIST */}
    </Box>
  );
}
