export const storeAllTask = (taskArray) => {
  localStorage.setItem("allTaskList", JSON.stringify(taskArray));
};

export const storeAllGroups = (groupsArray) => {
  localStorage.setItem("groupsName", JSON.stringify(groupsArray));
};
