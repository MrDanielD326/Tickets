import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuUsers } from 'react-icons/lu';
import Modal from '../Modal/Modal';
import AvatarGroup from '../Avatar/AvatarGroup';

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempSelectedUsers, setTempSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
            if (response.data?.length > 0) {
                setAllUsers(response.data);
            }
        } catch (error) {
            console.error("Error fetching users: ", error);
        }
    };

    const toggleUserSelection = (userId) => {
        setTempSelectedUsers((prev) =>
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
    };

    const handleAssign = () => {
        setSelectedUsers(tempSelectedUsers);
        setIsModalOpen(false);
    };

    const selectedUsersAvatars = allUsers
        .filter((user) => selectedUsers.includes(user._id))
        .map((user) => user.profileImageUrl);

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        if (selectedUsers.length === 0) {
            setTempSelectedUsers([]);
        }
    }, [selectedUsers]);

    const filteredUsers = [...allUsers]
        .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className='space-y-4 mt-2'>
            {selectedUsersAvatars.length === 0 && (
                <button className='card-btn' onClick={() => setIsModalOpen(true)}>
                    <LuUsers className='text-sm' /> Add Member(s) to the Task
                </button>
            )}
            {selectedUsersAvatars.length > 0 && (
                <div className='cursor-pointer' onClick={() => setIsModalOpen(true)}>
                    <AvatarGroup avatars={selectedUsersAvatars} maxVisible={3} />
                </div>
            )}
            <Modal title={"Select Users"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <div className='space-y-4'>
    <div className='sticky top-0 z-10 bg-white'>
      <input
        type='text'
        placeholder='Search by name...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full px-4 py-2 text-sm border rounded-md border-gray-300 focus:outline-none'
      />
    </div>
    <div className='h-[55vh] overflow-y-auto space-y-2 pr-1'>
      {filteredUsers.map((user) => (
        <div className='flex items-center gap-4 p-3 border-b border-gray-200' key={user._id}>
          <img className='w-10 h-10 rounded-full border-1 border-black' src={user.profileImageUrl} alt={user.name} />
          <div className='flex-1'>
            <p className='text-[13px] text-gray-500 font-semibold'>{user.name}</p>
            <p className='text-[13px] text-gray-500'>{user.email}</p>
          </div>
          <input
            className='w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none'
            type='checkbox'
            checked={tempSelectedUsers.includes(user._id)}
            onChange={() => toggleUserSelection(user._id)}
          />
        </div>
      ))}
    </div>
  </div>
  <div className='flex justify-end gap-4 pt-4'>
    <button className='card-btn' onClick={() => setIsModalOpen(false)}> CANCEL </button>
    <button className='card-btn-fill' onClick={handleAssign}> DONE </button>
  </div>
</Modal>

        </div>
    );
};

export default SelectUsers;
