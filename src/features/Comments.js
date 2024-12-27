

import React from 'react';

function Comment({ name, body }) {
  return (
    <li className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-600">{body}</p>
    </li>
  );
}

export default Comment;
