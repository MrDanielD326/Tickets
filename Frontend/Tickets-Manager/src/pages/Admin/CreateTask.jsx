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

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const formData = {
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: []
  };

  const [taskData, setTaskData] = useState(formData);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleValueChange = (key, value) => setTaskData(prevData => ({ ...prevData, [key]: value }));

  const clearData = () => { setTaskData(formData) };

  const createTask = async () => {
    setLoading();

    try {
      const todoList = taskData.todoChecklist?.map((item) => ({
        text: item, completed: false
      }));
      await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toString(),
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
        dueDate: new Date(taskData.dueDate).toString(),
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

    // Input validation
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

    // If taskId exists, it's an update, otherwise it's a new task
    if (taskId) {
      await updateTask(); // Ensure you await async call
    } else {
      await createTask(); // Ensure you await async call
    }
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
      <div className='mt-5 w-full'>
        <div className='grid grid-cols-1 md:grid-cols-4 mt-4 w-full'>
          <div className='form-card col-span-3 w-full'>
            <div className='flex items-center justify-between w-full'>
              <h1 className='text-xl md:text-xl font-medium'>
                {taskId ? "Update Task" : "Create Task"}
              </h1>
              {taskId && (
                <button
                  className='flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer'
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash className='text-base' /> Delete
                </button>
              )}
            </div>
            <div className='mt-4 w-full'>
              <label className='text-xs font-medium text-slate-600'> Task Title </label>
              <input
                className='form-input w-full'
                placeholder='Title of the Task'
                value={taskData.title}
                onChange={({ target }) => handleValueChange("title", target.value)}
              />
            </div>
            <div className='mt-3 w-full'>
              <label className='text-xs font-medium text-slate-600'> Description </label>
              <textarea
                className='form-input w-full'
                placeholder='Description Task'
                rows={4}
                value={taskData.description}
                onChange={({ target }) => handleValueChange("description", target.value)}
              />
            </div>
            <div className='grid grid-cols-12 gap-4 mt-2 w-full'>
              <div className='col-span-6 md:col-span-4 w-full'>
                <label className='text-xs font-medium text-slate-600'> Priority </label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                />
              </div>
              <div className='col-span-6 md:col-span-6 w-full'>
                <label className='text-xs font-medium text-slate-600'> Due Date </label>
                <input
                  className='form-input w-full'
                  placeholder='Mention Due Date'
                  value={taskData.dueDate || ''}
                  onChange={({ target }) => handleValueChange("dueDate", target.value)}
                  type='date'
                />
              </div>
              <div className='col-span-12 md:col-span-3 w-full'>
                <label className='text-xs font-medium text-slate-600'> Assign To </label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => handleValueChange("assignedTo", value)}
                />
              </div>
            </div>
            <div className='mt-3 w-full'>
              <label className='text-xs font-medium text-slate-600'> Todo Checklist </label>
              <TodoListInput
                todoList={taskData?.todoChecklist}
                setTodoList={(value) => handleValueChange("todoChecklist", value)}
              />
            </div>
            <div className='mt-3 w-full'>
              <label className='text-xs font-medium text-slate-600'> Add Attachments </label>
              <AddAttachmentsInput
                attachments={taskData?.attachments}
                setAttachments={(value) => handleValueChange("attachments", value)}
              />
            </div>
            {error && <p className='text-xs font-medium text-red-500 mt-5'> {error} </p>}
            <div className='flex justify-end mt-7 w-full'>
              <button className='add-btn' onClick={handleSubmit} disabled={loading}>
                {taskId ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal title={"Delete Task"} isOpen={openDeleteAlert} onClose={() => setOpenDeleteAlert(false)}>
        <DeleteAlert content="Are you sure you want to delete this task?" onDelete={deleteTask} />
      </Modal>
    </DashboardLayout>
  )
}

export default CreateTask