import React from 'react';
import PropTypes from 'prop-types';

const NotificationItem = React.memo(({ notification, onClick }) => (
    <div 
      className={`flex items-center justify-between p-4 border-b hover:bg-gray-100 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
      onClick={() => onClick(notification)} // Updated to use onClick and pass notification
    >
      <div className="flex-1">
        <p className="text-sm text-gray-800">{notification.message}</p>
        <small className="text-xs text-gray-500">
          {new Date(notification.timestamp?.toDate()).toLocaleTimeString()}
        </small>
      </div>
        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>}
      </div>
  ));

NotificationItem.displayName = 'NotificationItem';
  
  NotificationItem.propTypes = {
    notification: PropTypes.shape({
      id: PropTypes.string.isRequired,
      read: PropTypes.bool.isRequired,
      message: PropTypes.string.isRequired,
      timestamp: PropTypes.object.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired, // Updated propType to onClick
  };
  
  export default NotificationItem;