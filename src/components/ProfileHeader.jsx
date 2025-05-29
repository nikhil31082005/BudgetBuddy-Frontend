import React, { useState } from "react";
import EditProfile from "./EditProfile";

function ProfileHeader({ user }) {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleShowEdit = () => setShowEditForm(true);
  const handleCloseEdit = () => setShowEditForm(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0">
      {/* Profile Image */}
      <img
        src={user ? user.profileImage : "https://via.placeholder.com/100"}
        alt="Profile"
        className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-blue-200 shadow-md transform transition-transform duration-200 hover:scale-105"
      />

      {/* User Details */}
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
          {user?.name}
        </h3>
        <p className="text-gray-600 text-lg">{user?.email}</p>
        <p className="text-blue-700 font-medium mt-1">
          Profession: {user?.jobType}
        </p>
      </div>

      {/* Edit Button */}
      <div className="text-center md:text-right">
        <button
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 transition-all"
          onClick={handleShowEdit}
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Form */}
      {showEditForm && <EditProfile handleCloseEdit={handleCloseEdit} />}
    </div>
  );
}

export default ProfileHeader;
