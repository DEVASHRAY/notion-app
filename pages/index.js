import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { GroupCards, Header, Input, Modal, TaskCards } from "../Components";
import { Typography } from "@mui/material";
import Image from "next/image";
import addIcon from "../assets/addIcon.png";
import { sharedStyles } from "../styles/sharedStyles";
import { styles } from "../styles/rootStyles";
import { storeAllGroups, storeAllTask } from "../Helpers/storeData";

export default function Index() {
  const [openModal, setOpenModal] = useState(false);
  const [enteredText, setEnteredText] = useState("");

  //Group States
  const [groups, setGroups] = useState([]);
  const [openInputToAddGroup, setOpenInputToAddGroup] = useState(false);

  //Task States
  const [taskList, setTaskList] = useState([]);
  const [showInputToAddTask, setShowInputToAddTask] = useState(false);
  const [selectedTaskID, setSelectedTaskID] = useState("");
  const [activeTaskIDForModal, setActiveTaskIDForModal] = useState("");
  const [taskNo, setTaskNo] = useState({});

  useEffect(() => {
    const getGroup = JSON.parse(localStorage.getItem("groupsName"));
    const getTasks = JSON.parse(localStorage.getItem("allTaskList"));

    if (getGroup && getGroup.length > 0) {
      setGroups(getGroup);
    } else {
      setGroups([
        {
          id: 0,
          groupName: "No Status",
          uniqueID: generateRandomID(),
        },
      ]);
    }

    if (getTasks && getTasks.length > 0) {
      setTaskList(getTasks);
    }
  }, []);

  useEffect(() => {
    getTaskCount(taskList);
  }, [taskList]);

  const showInputForGroup = (e) => {
    e.stopPropagation();
    setOpenInputToAddGroup(true);
  };

  const generateRandomID = () => {
    return Math.random().toString(36).slice(2);
  };

  const addNewGroup = (event, id) => {
    event.preventDefault();

    if (enteredText === "") {
      alert("Group Name cant be empty");
      return;
    }

    for (let i = 0; i < groups.length; i++) {
      if (enteredText === groups[i].groupName) {
        alert("Group Name already exist. Please add a new group name");
        return;
      }
    }

    let uniqueID = generateRandomID(); //Generate uniqueID for each group created

    const newGroup = {
      id: groups[groups.length - 1]?.id + 1,
      groupName: enteredText,
      uniqueID,
    };

    setGroups((prev) => [...prev, newGroup]);
    storeAllGroups([...groups, newGroup]);
    setOpenInputToAddGroup(false);
    setEnteredText("");
  };

  const addNewTask = (event, id) => {
    event.preventDefault();

    if (enteredText === "") {
      alert("Task cannot be empty");
      return;
    }

    const newTask = {
      id: id,
      title: enteredText,
      description: "",
      Status: "In Progress",
      taskID: taskList.length + Math.random().toString(36).slice(2),
    };

    setTaskList((prev) => [...prev, newTask]);
    storeAllTask([...taskList, newTask]);

    setShowInputToAddTask(false);
    setEnteredText("");
  };

  const inputProps = {
    enteredText,
    setEnteredText,
    addGroup: true,
    addNewGroup,
  };

  const getTaskCount = (taskList) => {
    let ids = [];

    taskList.forEach((task) => {
      ids = [...ids, task.id];
    });

    const count = {};

    for (const element of ids) {
      if (count[element]) {
        count[element] += 1;
      } else {
        count[element] = 1;
      }
    }

    setTaskNo(count);
  };

  const groupProps = {
    totalTask: 2,
    groups,
    setGroups,
    setOpenModal,
    taskList,
    showInputToAddTask,
    setShowInputToAddTask,
    selectedTaskID,
    setSelectedTaskID,
    enteredText,
    setEnteredText,
    addNewTask,
    setTaskList,
    setActiveTaskIDForModal,
    taskNo,
  };

  const renderGroups = () => {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: 3,
          }}
        >
          {React.Children.toArray(
            groups.map((group, i) => {
              const passProps = {
                ...groupProps,
                groupHeading: group.groupName,
                groupID: group.id,
              };
              return (
                <>
                  <GroupCards {...passProps} />
                </>
              );
            })
          )}

          {!openInputToAddGroup && (
            <Box
              sx={[styles.addGroupContainer, sharedStyles.hoverStyle]}
              onClick={(e) => showInputForGroup(e)}
            >
              <Image src={addIcon} width={20} height={20} />
              <Typography sx={{ color: "#888" }}>Add a group</Typography>
            </Box>
          )}

          {openInputToAddGroup && <Input {...inputProps} />}
        </Box>
      </>
    );
  };

  return (
    <Box
      sx={styles.container}
      onClick={(e) => {
        e.stopPropagation();
        setOpenInputToAddGroup(false);
        setEnteredText("");
      }}
    >
      <Header />

      {/* DISPLAY GROUP & ADD GROUPS CTA */}

      <Box sx={{ minWidth: 280, padding: "8px 5px 0px", marginTop: 2 }}>
        {renderGroups()}
      </Box>

      {/* DISPLAY GROUP & ADD GROUPS CTA */}

      {openModal && (
        <Modal
          taskList={taskList}
          openModal={openModal}
          setOpenModal={setOpenModal}
          selectedTaskID={selectedTaskID}
          activeTaskIDForModal={activeTaskIDForModal}
          setTaskList={setTaskList}
        />
      )}
    </Box>
  );
}
