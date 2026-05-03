import React from 'react';

/**
 * A wrapper for Google Material Symbols (Sharp).
 * Usage: <MaterialIcon icon="menu" size={24} className="text-blue-600" />
 */
const MaterialIcon = ({ icon, size = 20, className = "", style = {} }) => {
  return (
    <span 
      className={`material-symbols-sharp ${className}`} 
      style={{ 
        fontSize: size, 
        width: size, 
        height: size, 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        lineHeight: 1,
        ...style 
      }}
    >
      {icon}
    </span>
  );
};

export default React.memo(MaterialIcon);
