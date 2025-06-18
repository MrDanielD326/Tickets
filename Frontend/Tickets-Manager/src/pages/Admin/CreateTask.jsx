import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuTrash } from 'react-icons/lu';
import { PRIORITY_DATA } from '../../utils/data';
import SelectDropdown from '../../components/Inputs/SelectDropdown';
import SelectUsers from '../../components/Inputs/SelectUsers';
import TodoListInput from '../../components/Inputs/TodoListInput';
import AddAttachmentsInput from '../../components/Inputs/AddAttachmentsInput';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment';
import Modal from '../../components/Modal/Modal';
import DeleteAlert from '../../components/Alert/DeleteAlert';
import toast from 'react-hot-toast';
import CreateTaskSkeleton from '../../components/Skeleton/CreateTaskSkeleton';

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const initialFormData = () => ({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: []
  });

  const [taskData, setTaskData] = useState(initialFormData());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleValueChange = (key, value) => setTaskData(prevData => ({ ...prevData, [key]: value }));

  const clearData = () => { setTaskData(initialFormData()) };

  const createTask = async () => {
    setLoading(true);
    try {
      const todoList = taskData.todoChecklist?.map((item) => ({
        text: item, completed: false
      }));
      await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate).toString() : null,
        todoChecklist: todoList
      });
      toast.success("Task created successfully...");
      clearData();
    } catch (error) {
      console.error("Error creating task: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Update Task
  const updateTask = async () => {
    setLoading(true);
    try {
      const todoList = taskData.todoChecklist?.map((item) => {
        const matchedTask = currentTask?.todoChecklist?.find(task => task.text === item);
        return { text: item, completed: matchedTask?.completed || false };
      });
      await axiosInstance.post(API_PATHS.TASKS.UPDATE_TASK(taskId), {
        ...taskData,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate).toString() : null,
        todoChecklist: todoList
      });
      toast.success("Task Updated Successfully...");
    } catch (error) {
      console.error("Error updating task:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setError(null);
    if (!taskData.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!taskData.description.trim()) {
      setError("Description is required.");
      return;
    }
    if (!taskData.dueDate) {
      setError("Due date is required.");
      return;
    }
    if (taskData.assignedTo?.length === 0) {
      setError("Task not assigned to any member");
      return;
    }
    if (taskData.todoChecklist?.length === 0) {
      setError("Add at least one todo task");
      return;
    }
    if (taskId) {
      await updateTask();
      return;
    }
    await createTask();
  };


  const getTaskDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId));
      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);
        setTaskData((prevData) => ({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate ? moment(taskInfo.dueDate).format("DD-MM-YYYY") : null,
          assignedTo: taskInfo?.assignedTo?.map((item) => item?.text || []),
          todoChecklist: taskInfo?.todoChecklist?.map((item) => item?.text || []),
          attachments: taskInfo?.attachments || []
        }))
      }
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  useEffect(() => {
    if (taskId) {
      getTaskDetailsById(taskId)
    }
  }, [taskId]);

  // Delete Task
  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
      setOpenDeleteAlert(false);
      toast.success("Task deleted successfully");
      navigate('/admin/tasks');
    } catch (error) {
      console.error("Error deleting task:", error.response?.data?.message || error.message);
    }
  };

  return (
    <DashboardLayout activeMenu={"Create Task"}>
      <div className="p-4 md:p-6 space-y-6">
        {(loading && taskId) ? <CreateTaskSkeleton /> : (
          <>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
              {taskId ? "Update Task" : "Create Task"}
            </h1>
            <div className="flex items-center justify-between mb-6">
              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-3 py-1.5 border border-rose-100 hover:border-rose-300 cursor-pointer transition-colors"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash className="text-base" /> Delete
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Task Title</label>
                <input
                  className="form-input w-full mt-1"
                  placeholder="Title of the Task"
                  value={taskData.title}
                  onChange={({ target }) => handleValueChange("title", target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="form-input w-full mt-1"
                  placeholder="Enter description of the task"
                  rows={4}
                  value={taskData.description}
                  onChange={({ target }) => handleValueChange("description", target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                  <label className="text-sm font-medium text-gray-700">Priority</label>
                  <SelectDropdown
                    options={PRIORITY_DATA}
                    value={taskData.priority}
                    onChange={(value) => handleValueChange("priority", value)}
                    placeholder="Select Priority"
                  />
                </div>
                <div className="md:col-span-4">
                  <label className="text-sm font-medium text-gray-700">Due Date</label>
                  <input
                    className="form-input w-full mt-1"
                    placeholder="Mention Due Date"
                    value={taskData.dueDate || ''}
                    onChange={({ target }) => handleValueChange("dueDate", target.value)}
                    type="date"
                  />
                </div>
                <div className="md:col-span-4">
                  <label className="text-sm font-medium text-gray-700">Assign To</label>
                  <SelectUsers
                    selectedUsers={taskData.assignedTo}
                    setSelectedUsers={(value) => handleValueChange("assignedTo", value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Todo Checklist</label>
                <TodoListInput
                  todoList={taskData?.todoChecklist}
                  setTodoList={(value) => handleValueChange("todoChecklist", value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Add Attachments</label>
                <AddAttachmentsInput
                  attachments={taskData?.attachments}
                  setAttachments={(value) => handleValueChange("attachments", value)}
                />
              </div>

              {error && (
                <p className="text-sm font-medium text-red-500">{error}</p>
              )}

              <div className="flex justify-end">
                <button
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {taskId ? "Update Task" : "Create Task"}
                </button>
              </div>
            </div>
          </>

        )}
      </div>

      <Modal title={"Delete Task"} isOpen={openDeleteAlert} onClose={() => setOpenDeleteAlert(false)}>
        <DeleteAlert content="Are you sure you want to delete this task?" onDelete={deleteTask} />
      </Modal>
    </DashboardLayout>
  )
}

export default CreateTask