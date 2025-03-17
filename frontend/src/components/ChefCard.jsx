/* eslint-disable react/prop-types */
const ChefCard = ({ user }) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
      <img
        src={user.profilePic || "/default-profile.png"} 
        alt="Profile"
        className="rounded-full w-12 h-12 object-cover border border-gray-300"
      />
      <div>
        <p className="text-lg font-semibold">{user.name|| "No Name Available"}</p>
      </div>
    </div>
  );
};

export default ChefCard;