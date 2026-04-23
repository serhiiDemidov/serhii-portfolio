'use client';

import { useState, useRef, useEffect } from 'react';

interface DatePickerProps {
    value: string; // format: "YYYY-MM"
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export default function DatePicker({
    value,
    onChange,
    placeholder = 'Select date',
    disabled = false,
}: DatePickerProps) {
    const [open, setOpen] = useState(false);
    const [viewYear, setViewYear] = useState(
        value ? parseInt(value.split('-')[0]) : new Date().getFullYear()
    );
    const ref = useRef<HTMLDivElement>(null);

    const selectedYear = value ? parseInt(value.split('-')[0]) : null;
    const selectedMonth = value ? parseInt(value.split('-')[1]) - 1 : null;

    const displayValue =
        selectedYear !== null && selectedMonth !== null
            ? `${MONTHS[selectedMonth]} ${selectedYear}`
            : '';

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    function handleSelect(monthIndex: number) {
        const month = String(monthIndex + 1).padStart(2, '0');
        onChange(`${viewYear}-${month}`);
        setOpen(false);
    }

    return (
        <div ref={ref} className="relative">
            {/* Trigger button */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen(!open)}
                className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-sm text-left transition-colors focus:outline-none focus:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed hover:border-white/20 flex items-center justify-between"
            >
                <span className={displayValue ? 'text-white' : 'text-gray-600'}>
                    {displayValue || placeholder}
                </span>
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className={`text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
                >
                    <path
                        d="M2 4.5L7 9.5L12 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 mt-2 w-full bg-[#111116] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                    {/* Year navigation */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                        <button
                            type="button"
                            onClick={() => setViewYear((y) => y - 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path
                                    d="M9 2L4 7L9 12"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <span className="text-white text-sm font-medium">{viewYear}</span>
                        <button
                            type="button"
                            onClick={() => setViewYear((y) => y + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path
                                    d="M5 2L10 7L5 12"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Month grid */}
                    <div className="grid grid-cols-3 gap-1 p-3">
                        {MONTHS.map((month, index) => {
                            const isSelected = selectedMonth === index && selectedYear === viewYear;
                            const isCurrent =
                                new Date().getMonth() === index &&
                                new Date().getFullYear() === viewYear;

                            return (
                                <button
                                    key={month}
                                    type="button"
                                    onClick={() => handleSelect(index)}
                                    className={`
                    px-2 py-2 rounded-lg text-sm transition-colors text-center
                    ${
                        isSelected
                            ? 'bg-blue-600 text-white font-medium'
                            : isCurrent
                              ? 'text-blue-400 hover:bg-white/10'
                              : 'text-gray-400 hover:bg-white/10 hover:text-white'
                    }
                  `}
                                >
                                    {month.slice(0, 3)}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
