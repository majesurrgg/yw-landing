// 1. Hero Section: El banner principal como en tu imagen

// src/components/HeroSection.jsx
import React from 'react';

export default function HeroSection({ onScrollButtonClick }) {
    return (
        <div className="relative w-full h-[400px] bg-black text-white">
            <img
                src="/assets/volunteer.png"
                alt="Voluntarios de Yachay Wasi con niños"
                className="absolute inset- w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative h-full flex flex-col justify-center items-center text-center p-4">
                <p className="font-semibold tracking-wider mb-2">SÉ PARTE DE YACHAY WASI</p>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Convocatoria Abierta</h1>
                <button
                    onClick={onScrollButtonClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md transition-colors duration-300"
                >
                    ENTÉRATE MÁS
                </button>
            </div>
        </div>
    );
}