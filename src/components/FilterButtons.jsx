// src/components/FilterButtons.jsx
import React from 'react';

export default function FilterButtons({ currentFilter, onFilterChange }) {
    const buttonStyle = "px-5 py-2 rounded-full font-semibold transition-colors duration-300";
    const activeStyle = "bg-blue-600 text-white shadow-md";
    const inactiveStyle = "bg-gray-200 text-gray-700 hover:bg-gray-300";

    return (
        <div className="flex justify-center items-center gap-3 mb-8">
            <button
                onClick={() => onFilterChange('all')}
                className={`${buttonStyle} ${currentFilter === 'all' ? activeStyle : inactiveStyle}`}
            >
                Todos
            </button>
            <button
                onClick={() => onFilterChange('staff')}
                className={`${buttonStyle} ${currentFilter === 'staff' ? activeStyle : inactiveStyle}`}
            >
                Staff
            </button>
            <button
                onClick={() => onFilterChange('asesory')}
                className={`${buttonStyle} ${currentFilter === 'asesory' ? activeStyle : inactiveStyle}`}
            >
                Asesores
            </button>
        </div>
    );
}