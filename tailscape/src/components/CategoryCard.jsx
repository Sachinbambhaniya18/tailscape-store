import React from 'react';

export default function CategoryCard({ name, icon }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50 transition-colors">
      {icon}
      <h3 className="mt-4 text-lg font-semibold">{name}</h3>
    </div>
  );
}
