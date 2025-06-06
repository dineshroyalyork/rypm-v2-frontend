import React, { useState, useEffect, useRef } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  addDays,
  isSameDay,
  isToday,
  parse,
  isBefore,
  startOfDay,
} from "date-fns";
import { DropDownIcon, BackIcon, NextIcon } from "@/ui/icons";

interface CustomCalendarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  value,
  onChange,
  placeholder = "dd/mm/yyyy",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? parse(value, "yyyy-MM-dd", new Date()) : null
  );
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(
    selectedDate
  );

  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 76 }, (_, i) => currentYear + i);

  const today = startOfDay(new Date());
  const currentMonth = startOfMonth(new Date());

  useEffect(() => {
    if (value) {
      const parsedDate = parse(value, "yyyy-MM-dd", new Date());
      setSelectedDate(parsedDate);
      setTempSelectedDate(parsedDate);
      setCurrentDate(parsedDate);
    }
  }, [value]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowYearPicker(false);
        setTempSelectedDate(selectedDate);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, selectedDate]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setShowYearPicker(false);
        setTempSelectedDate(selectedDate);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, selectedDate]);

  const openCalendar = () => {
    setIsOpen(true);
    setTempSelectedDate(selectedDate);
  };

  const closeCalendar = () => {
    setIsOpen(false);
    setShowYearPicker(false);
    setTempSelectedDate(selectedDate);
  };

  const handleOk = () => {
    if (tempSelectedDate) {
      setSelectedDate(tempSelectedDate);
      onChange(format(tempSelectedDate, "yyyy-MM-dd"));
    }
    setIsOpen(false);
    setShowYearPicker(false);
  };

  const handleDateClick = (date: Date) => {
    const dateToCheck = startOfDay(date);
    if (!isBefore(dateToCheck, today)) {
      setTempSelectedDate(date);
    }
  };

  const handlePrevMonth = () => {
    const prevMonth = subMonths(currentDate, 1);
    if (!isBefore(startOfMonth(prevMonth), currentMonth)) {
      setCurrentDate(prevMonth);
    }
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setShowYearPicker(false);
  };

  const toggleYearPicker = () => {
    setShowYearPicker(!showYearPicker);
  };

  const isPrevMonthDisabled = isBefore(
    startOfMonth(subMonths(currentDate, 1)),
    currentMonth
  );

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = monthStart;
  const formattedDate = format(currentDate, "MMMM yyyy");

  const totalDays =
    Math.ceil(
      (monthEnd.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
  const startWeekday = monthStart.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const totalCells = Math.ceil((totalDays + startWeekday) / 7) * 7;

  for (let i = 0; i < totalCells; i++) {
    if (i < startWeekday) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    } else if (i < startWeekday + totalDays) {
      const currentDay = addDays(monthStart, i - startWeekday);
      const isSelected =
        tempSelectedDate && isSameDay(currentDay, tempSelectedDate);
      const isTodayDate = isToday(currentDay);
      const isPastDate = isBefore(
        startOfDay(currentDay),
        startOfDay(new Date())
      );

      days.push(
        <div
          key={currentDay.toString()}
          className={`
  h-10 w-10 flex items-center justify-center text-sm rounded-full
  transition-all duration-200
  ${
    isPastDate
      ? "text-[#E5E7EB] cursor-not-allowed"
      : "text-gray-700 cursor-pointer hover:bg-gray-100"
  }
  ${isSelected ? "bg-[#001D3D] text-white hover:bg-[#001D3D]" : ""}
  ${
    isTodayDate && !isSelected && !isPastDate
      ? "ring-2 ring-[#001D3D] ring-opacity-100 border-2 border-[#001D3D]"
      : ""
  }
`}
          onClick={() => !isPastDate && handleDateClick(currentDay)}
        >
          <span>{format(currentDay, dateFormat)}</span>
        </div>
      );
    } else {
      days.push(<div key={`empty-end-${i}`} className="h-10 w-10"></div>);
    }

    if ((i + 1) % 7 === 0) {
      rows.push(
        <div className="flex justify-between" key={`row-${Math.floor(i / 7)}`}>
          {days}
        </div>
      );
      days = [];
    }
  }

  const displayValue = selectedDate ? format(selectedDate, "dd/MM/yyyy") : "";

  return (
    <>
      <div
        ref={inputRef}
        className={`
    relative flex items-center justify-between py-1.5 px-2 rounded-md border border-[#F3F4F6]
    cursor-pointer hover:border-gray-300 transition-colors
    ${className}
  `}
        onClick={openCalendar}
      >
        <div></div>
        <span
          className={`text-sm ${
            displayValue ? "text-[#001D3D]" : "text-[#99A1AF]"
          }`}
        >
          {displayValue || placeholder}
        </span>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{
            background: "rgba(0, 29, 61, 0.20)",
            backdropFilter: "blur(2px)",
          }}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="calendar-title"
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto transform transition-all duration-300 scale-100"
          >
            <div className="px-6 py-4 pb-4 border-b border-[#001D3D] flex-shrink-0">
              <div className="text-left">
                <h3
                  id="calendar-title"
                  className="text-sm font-medium text-[#001D3D] mb-4"
                >
                  Select date
                </h3>
                <div className="text-2xl font-medium text-[#001D3D]">
                  {tempSelectedDate
                    ? format(tempSelectedDate, "EEE, MMM d")
                    : format(new Date(), "EEE, MMM d")}
                </div>
              </div>
            </div>

            <div
              className="px-4 flex-1 flex flex-col"
              style={{ minHeight: "20rem" }}
            >
              {!showYearPicker ? (
                <>
                  <div className="flex items-center justify-between py-4">
                    <button
                      onClick={toggleYearPicker}
                      className="flex items-center space-x-1 py-2 px-3 hover:bg-gray-100 rounded-lg transition-colors"
                      type="button"
                    >
                      <span className="font-medium text-gray-900">
                        {formattedDate}
                      </span>
                      <DropDownIcon className="ml-2" />
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handlePrevMonth}
                        disabled={isPrevMonthDisabled}
                        className={`p-2 rounded-full transition-colors ${
                          isPrevMonthDisabled
                            ? "cursor-not-allowed"
                            : "hover:bg-gray-100"
                        }`}
                        type="button"
                      >
                        <BackIcon
                          showBackground={false}
                          color={isPrevMonthDisabled ? "#E5E7EB" : "#001D3D"}
                        />
                      </button>

                      <button
                        onClick={handleNextMonth}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        type="button"
                      >
                        <NextIcon showBackground={false} />
                      </button>
                    </div>
                  </div>

                  {/* Weekday Headers */}
                  <div className="grid grid-cols-7 mb-2">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                      <div
                        key={`${day}-${index}`}
                        className="h-10 flex items-center justify-center"
                      >
                        <span className="text-sm font-medium text-gray-600">
                          {day}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="flex-1 flex flex-col justify-start"
                    style={{ minHeight: "15rem" }}
                  >
                    <div className="space-y-1">{rows}</div>
                  </div>
                </>
              ) : (
                /* Year Picker */
                <div className="flex-1 py-4">
                  <div className="max-h-[35vh] overflow-y-auto">
                    <div className="grid grid-cols-3 gap-2 p-2">
                      {years.map((year) => (
                        <button
                          key={year}
                          onClick={() => handleYearSelect(year)}
                          className={`
            h-[8vh] flex items-center justify-center
            rounded-4xl text-sm font-medium transition-colors
            text-gray-700 hover:bg-gray-100
          `}
                          type="button"
                        >
                          <span
                            className={`
              px-4 py-2 rounded-full
              ${
                year === currentDate.getFullYear()
                  ? "bg-[#001D3D] text-white"
                  : ""
              }
            `}
                          >
                            {year}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 p-6 pt-4 border-t border-[#001D3D] flex-shrink-0">
              <button
                onClick={closeCalendar}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleOk}
                className="px-6 py-2 bg-[#001D3D] text-white text-sm font-medium rounded-lg hover:bg-[#002A5C] transition-colors"
                type="button"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomCalendar;
