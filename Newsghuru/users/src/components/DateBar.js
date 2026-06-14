import React, { useState, useEffect, useRef } from "react";
import "../styles/DateBar.css";
import { FaCalendarAlt, FaClock, FaSun, FaMoon, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom"; // Added for routing without reload

const thithis = [
  "Prathamai", "Dwithiyai", "Thrithiyai", "Chathurthi", "Panchami", "Sashti", "Saptami", "Ashtami", 
  "Navami", "Dasami", "Ekadashi", "Dwadashi", "Thrayodashi", "Chathurdashi", "Pournami", "Amavasai"
];

const natchathirams = [
  "Ashwini", "Bharani", "Karthikai", "Rohini", "Mirugasiridam", "Thiruvathirai", "Punarpoosam", "Poosam",
  "Aayilyam", "Magam", "Pooram", "Uthiram", "Hastham", "Chithirai", "Swathi", "Visagam", "Anusham",
  "Kettai", "Moolam", "Pooradam", "Uthiradam", "Thiruvonam", "Avittam", "Sathayam", "Poorattathi", "Uthirattathi", "Revathi"
];

const yogams = ["Siddha Yogam", "Amirtha Yogam", "Marana Yogam"];
const karanams = ["Bhavam", "Balavam", "Kaulavam", "Thaitula", "Karasai", "Vanasai", "Bhadrai"];

const dailyThoughts = [
  "Love and virtue make a happy home.",
  "Avoiding enmity is the way to peace.",
  "Learn flawlessly, and act accordingly.",
  "Wisdom is finding the truth in everything.",
  "Discipline is greater than life itself.",
  "Speaking harshly instead of sweetly is like eating unripe fruit.",
  "Patience is greater than the ocean. Those who endure will rule the world.",
  "Love is God. Doing good deeds for others elevates us.",
  "Effort brings wealth; lack of it brings poverty.",
  "Live with fame, or it's better not to live.",
  "Truthfulness is speaking without causing harm.",
  "It is not good to forget a favor.",
  "Anger destroys oneself and one's family.",
  "Weigh the strengths of all before acting.",
  "Do not wish harm to anyone.",
  "Wisdom is a fortress that cannot be destroyed.",
  "Speak only words that are useful.",
  "A pure mind is the foundation of all virtues.",
  "He who is truthful lives in the hearts of all.",
  "Rain provides food and is itself food.",
  "Think before you act; acting first is foolish.",
  "A timely favor is larger than the world.",
  "True greatness is always humble.",
  "Knowledge grows as much as you learn.",
  "True friendship is like a hand that catches a falling garment.",
  "Education is the only imperishable wealth.",
  "Control your tongue, or suffer the consequences.",
  "Just as the alphabet starts with 'A', the world begins with God.",
  "Even great men find it hard to control sudden anger.",
  "Laugh in the face of adversity; there is nothing like it.",
  "Farming is the most important work in the world."
];

const dayOfWeekTimings = {
  0: {
    nallaNeramMorning: "07:30 AM - 08:30 AM",
    nallaNeramEvening: "03:30 PM - 04:30 PM",
    raghuKalam: "04:30 PM - 06:00 PM",
    yamagandam: "12:00 PM - 01:30 PM",
    kuligai: "03:00 PM - 04:30 PM",
    soolam: "West",
    parigaram: "Jaggery",
    chandrashtamam: "Pooradam"
  },
  1: {
    nallaNeramMorning: "06:30 AM - 07:30 AM",
    nallaNeramEvening: "04:30 PM - 05:30 PM",
    raghuKalam: "07:30 AM - 09:00 AM",
    yamagandam: "10:30 AM - 12:00 PM",
    kuligai: "01:30 PM - 03:00 PM",
    soolam: "East",
    parigaram: "Curd",
    chandrashtamam: "Uthiradam"
  },
  2: {
    nallaNeramMorning: "07:30 AM - 08:30 AM",
    nallaNeramEvening: "04:30 PM - 05:30 PM",
    raghuKalam: "03:00 PM - 04:30 PM",
    yamagandam: "09:00 AM - 10:30 AM",
    kuligai: "12:00 PM - 01:30 PM",
    soolam: "North",
    parigaram: "Milk",
    chandrashtamam: "Thiruvonam"
  },
  3: {
    nallaNeramMorning: "09:00 AM - 10:30 AM",
    nallaNeramEvening: "04:30 PM - 05:30 PM",
    raghuKalam: "12:00 PM - 01:30 PM",
    yamagandam: "07:30 AM - 09:00 AM",
    kuligai: "10:30 AM - 12:00 PM",
    soolam: "North",
    parigaram: "Tamarind Water",
    chandrashtamam: "Avittam"
  },
  4: {
    nallaNeramMorning: "09:00 AM - 10:30 AM",
    nallaNeramEvening: "04:30 PM - 05:30 PM",
    raghuKalam: "01:30 PM - 03:00 PM",
    yamagandam: "06:00 AM - 07:30 AM",
    kuligai: "09:00 AM - 10:30 AM",
    soolam: "South",
    parigaram: "Curd",
    chandrashtamam: "Sathayam"
  },
  5: {
    nallaNeramMorning: "09:00 AM - 10:30 AM",
    nallaNeramEvening: "04:30 PM - 05:30 PM",
    raghuKalam: "10:30 AM - 12:00 PM",
    yamagandam: "03:00 PM - 04:30 PM",
    kuligai: "07:30 AM - 09:00 AM",
    soolam: "West",
    parigaram: "Sugar",
    chandrashtamam: "Poorattathi"
  },
  6: {
    nallaNeramMorning: "07:30 AM - 08:30 AM",
    nallaNeramEvening: "05:00 PM - 06:00 PM",
    raghuKalam: "09:00 AM - 10:30 AM",
    yamagandam: "01:30 PM - 03:00 PM",
    kuligai: "06:00 AM - 07:30 AM",
    soolam: "East",
    parigaram: "Oil",
    chandrashtamam: "Uthirattathi"
  }
};

const getDynamicCalendarInfo = (targetDate) => {
  const dVal = targetDate.getDate();
  const dayVal = targetDate.getDay();

  const timings = dayOfWeekTimings[dayVal] || dayOfWeekTimings[0];
  const thithi = thithis[(dVal - 1) % thithis.length];
  const natchathiram = natchathirams[(dVal - 1) % natchathirams.length];
  const yogam = yogams[(dVal + dayVal) % yogams.length];
  const karanam = karanams[(dVal * 2) % karanams.length];
  const thought = dailyThoughts[(dVal - 1) % dailyThoughts.length];

  return {
    ...timings,
    thithi,
    natchathiram,
    yogam,
    karanam,
    thought
  };
};

const DateBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Read initial date from URL React Router searchParams safely
  const getUrlDate = () => {
    try {
      const dateParam = searchParams.get('date');
      if (dateParam) {
        const d = new Date(dateParam);
        if (!isNaN(d.getTime())) return d;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef(null);

  const urlDate = getUrlDate();
  const displayDate = urlDate || currentTime;
  const info = getDynamicCalendarInfo(displayDate);

  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date((urlDate || new Date()).getFullYear(), (urlDate || new Date()).getMonth(), 1));
  const calendarWrapperRef = useRef(null);

  // Sync calendarMonth when displayDate changes or calendar is toggled open
  const displayYear = displayDate.getFullYear();
  const displayMonth = displayDate.getMonth();
  useEffect(() => {
    setCalendarMonth(new Date(displayYear, displayMonth, 1));
  }, [displayYear, displayMonth, showCalendar]);

  /* CLOSE CUSTOM CALENDAR WHEN CLICKING OUTSIDE */
  useEffect(() => {
    const handleClickOutsideCalendar = (event) => {
      if (calendarWrapperRef.current && !calendarWrapperRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideCalendar);
    return () => document.removeEventListener("mousedown", handleClickOutsideCalendar);
  }, []);

  const prevMonth = (e) => {
    e.stopPropagation();
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1));
  };

  const nextMonth = (e) => {
    e.stopPropagation();
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
  };

  const getCalendarDays = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevTotalDays = new Date(year, month, 0).getDate();

    const days = [];

    // Prev month days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevTotalDays - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Next month days to pad to 42
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const handleCalendarDayClick = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    if (targetDate <= today) {
      navigateToDate(date);
      setShowCalendar(false);
    }
  };

  // Fixed: Reset parameters without triggering a hard window refresh
  const handleCalendarClear = (e) => {
    e.stopPropagation();
    navigate("/", { replace: true });
  };

  const handleCalendarToday = (e) => {
    e.stopPropagation();
    navigateToDate(new Date());
  };

  /* LIVE CLOCK */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* CLOSE DROPDOWN WHEN CLICKING OUTSIDE */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fixed: Replaced window.location.href with soft React-Router navigate
  const navigateToDate = (newDate) => {
    const dateString = newDate.toISOString().split('T')[0];
    navigate(`?date=${dateString}`, { replace: true });
  };

  const handlePrevDay = () => {
    const prevDate = new Date(displayDate);
    prevDate.setDate(prevDate.getDate() - 1);
    navigateToDate(prevDate);
  };

  const handleNextDay = () => {
    if (isNextDisabled) return; 
    const nextDate = new Date(displayDate);
    nextDate.setDate(nextDate.getDate() + 1);
    navigateToDate(nextDate);
  };

  /* TAMIL CALENDAR DATA METRICS */
  const tamilWeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const tamilMonths = ["Chithirai", "Vaikasi", "Aani", "Aadi", "Aavani", "Purattasi", "Aippasi", "Karthikai", "Margazhi", "Thai", "Maasi", "Panguni"];
  const tamilYears = [
    "Prabhava","Vibhava","Sukla","Pramodhootha","Prachorpaththi","Aangirasa","Srimuga","Bhava","Yuva","Dhaathu","Eesvara","Vehudhanya","Pramathi",
    "Vikrama","Vishu","Chitrabaanu","Subaanu","Dhaarana","Paarthiba","Viya","Sarvajith","Sarvadhari","Virodhi","Vikruthi","Kara","Nandhana","Vijaya",
    "Jaya","Manmatha","Dhunmugi","Hevilambi","Vilambi","Vikari","Sarvari","Plava","Subakrithu","Sobakrithu","Krodhi","Visuvaavasu","Parabhava",
    "Plavanga","Keelaka","Saumiya","Sadharana","Virodhikrithu","Paridhaabi","Pramaadhisa","Aanandha","Rakshasa","Nala","Pingala","Kalayukthi",
    "Siddharthi","Raudhri","Dhunmathi","Dhundhubhi","Rudhrodhgaari","Raktakshi","Krodhana","Akshaya"
  ];

  const day = displayDate.getDay();
  const date = displayDate.getDate();
  const year = displayDate.getFullYear();

  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const tamilMonthLengths = [31, 31, 32, 31, 31, 30, 30, 29, 29, 30, 30, isLeapYear ? 32 : 31];
  const tamilNewYear = new Date(year, 3, 14);

  let diffDays = Math.floor((displayDate - tamilNewYear) / (1000 * 60 * 60 * 24));
  let cycleYear = year;

  if (diffDays < 0) {
    cycleYear = year - 1;
    const prevNY = new Date(year - 1, 3, 14);
    diffDays = Math.floor((displayDate - prevNY) / (1000 * 60 * 60 * 24));
  }

  let tamilMonthIndex = 0;
  while (diffDays >= tamilMonthLengths[tamilMonthIndex]) {
    diffDays -= tamilMonthLengths[tamilMonthIndex];
    tamilMonthIndex++;
    if (tamilMonthIndex === 12) tamilMonthIndex = 0;
  }

  const tamilDate = diffDays + 1;
  const tamilMonth = tamilMonths[tamilMonthIndex];
  const tamilYearIndex = ((cycleYear - 1987) % 60 + 60) % 60;
  const tamilYear = tamilYears[tamilYearIndex];

  const normalDate = `${date} ${displayDate.toLocaleString("en-US", { month: "long" })} ${year}`;
  const tamilFullDate = `${tamilDate} ${tamilMonth}, ${tamilYear} Year`;

  const time = currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const hour = currentTime.getHours();
  const TimeIcon = hour >= 6 && hour < 18 ? FaSun : FaMoon;

  const todayDateObj = new Date();
  todayDateObj.setHours(0, 0, 0, 0);
  const currentDisplayDateObj = new Date(displayDate);
  currentDisplayDateObj.setHours(0, 0, 0, 0);
  const isNextDisabled = currentDisplayDateObj >= todayDateObj;

  return (
    <div className="date-bar-container" ref={dropdownRef}>
      <div className="date-bar" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="date-section">
          <FaCalendarAlt className="date-icon" />
          <div className="date-content">
            <span className="date-text">{normalDate}</span>
            <span> | </span>
            <span className="date-text">{tamilWeekDays[day]}</span>
            <span> | </span>
            <span className="tamil-date-text">{tamilFullDate}</span>
          </div>
          <FaChevronDown className={`dropdown-icon ${isExpanded ? "open" : ""}`} />
        </div>

        <div className="time-section">
          <TimeIcon className="time-icon" />
          <span className="time-text">{time}</span>
          <FaClock className="clock-icon" />
        </div>
      </div>

      {isExpanded && (
        <div className="date-dropdown-menu">
          <div className="dinamalar-calendar-panel" onClick={(e) => e.stopPropagation()}>
            {/* Row 1: Header Navigation */}
            <div className="dc-header">
              <button type="button" className="dc-nav-btn" onClick={handlePrevDay}>&lt; Previous</button>
              
              <div 
                className="dc-date-picker-wrapper" 
                ref={calendarWrapperRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCalendar(!showCalendar);
                }}
                title="Date Select"
              >
                <FaCalendarAlt className="dc-cal-icon" />
                <span className="dc-date-input-text">
                  {displayDate.toLocaleDateString("en-GB").replace(/\//g, "-")}
                </span>
                <FaChevronDown className="dc-cal-chevron" />
                
                {showCalendar && (
                  <div className="custom-calendar-popup" onClick={(e) => e.stopPropagation()}>
                    <div className="cc-header">
                      <span className="cc-month-year">
                        {calendarMonth.toLocaleString("en-US", { month: "long" })}, {calendarMonth.getFullYear()}
                      </span>
                      <div className="cc-nav-arrows">
                        <button type="button" className="cc-arrow-btn" onClick={prevMonth} title="Previous Month">
                          <FaChevronUp size={10} />
                        </button>
                        <button type="button" className="cc-arrow-btn" onClick={nextMonth} title="Next Month">
                          <FaChevronDown size={10} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="cc-weekdays">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                        <div key={d} className="cc-weekday">{d}</div>
                      ))}
                    </div>
                    
                    <div className="cc-days-grid">
                      {getCalendarDays().map(({ date: d, isCurrentMonth }, idx) => {
                        const isSelected = d.toDateString() === displayDate.toDateString();
                        const isToday = d.toDateString() === new Date().toDateString();
                        
                        const checkDay = new Date(d);
                        checkDay.setHours(0,0,0,0);
                        const isFuture = checkDay > todayDateObj;
                        
                        return (
                          <div 
                            key={idx} 
                            className={`cc-day ${isCurrentMonth ? "" : "other-month"} ${isSelected ? "selected" : ""} ${isToday ? "today" : ""} ${isFuture ? "disabled-day" : ""}`}
                            onClick={() => !isFuture && handleCalendarDayClick(d)}
                            style={isFuture ? { opacity: 0.4, cursor: "not-allowed" } : {}}
                          >
                            {d.getDate()}
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="cc-footer">
                      <button type="button" className="cc-footer-btn" onClick={handleCalendarClear}>
                        Clear
                      </button>
                      <button type="button" className="cc-footer-btn" onClick={handleCalendarToday}>
                        Today
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button 
                type="button"
                className={`dc-nav-btn ${isNextDisabled ? "disabled" : ""}`} 
                onClick={handleNextDay}
                disabled={isNextDisabled}
              >
                Next &gt;
              </button>
            </div>

            {/* Row 2: Display Info */}
            <div className="dc-big-dates-row">
              <div className="dc-big-date-box left-box">
                <div className="dc-month-text">{displayDate.toLocaleString("en-US", { month: "long" })}</div>
                <div className="dc-huge-text">{date}</div>
              </div>
              <div className="dc-big-date-box right-box">
                <div className="dc-month-text">{tamilMonth} <br/> {tamilYear} Year</div>
                <div className="dc-huge-text highlight-text">{tamilDate}</div>
                <div className="dc-special-days"></div>
              </div>
            </div>

            {/* Row 3: Info Bar */}
            <div className="dc-day-info-bar">
              <span>{displayDate.toLocaleString("en-US", { month: "long" })} {date}, {year}</span>
              <span className="dc-day-name">{tamilWeekDays[day]}</span>
              <span></span>
            </div>

            {/* Row 4: Timings Section */}
            <div className="dc-timings-section" onClick={(e) => e.stopPropagation()}>
              <div className="dc-timings-col">
                <div className="dc-timing-item">
                  <span className="dc-label">Good Time (Morning)</span>
                  <span className="dc-val">{info.nallaNeramMorning}</span>
                </div>
                <div className="dc-timing-item">
                  <span className="dc-label">Good Time (Evening)</span>
                  <span className="dc-val">{info.nallaNeramEvening}</span>
                </div>
                <div className="dc-timing-item">
                  <span className="dc-label">Rahu Kalam</span>
                  <span className="dc-val">{info.raghuKalam}</span>
                </div>
              </div>

              <div className="dc-timings-icon">
                <FaSun size={30} style={{ color: "#eab308" }} />
              </div>

              <div className="dc-timings-col">
                <div className="dc-timing-item">
                  <span className="dc-label">Yama Gandam</span>
                  <span className="dc-val">{info.yamagandam}</span>
                </div>
                <div className="dc-timing-item">
                  <span className="dc-label">Kuligai</span>
                  <span className="dc-val">{info.kuligai}</span>
                </div>
                <div className="dc-timing-item">
                  <span className="dc-label">Soolam / Parigaram</span>
                  <span className="dc-val">{info.soolam} / {info.parigaram}</span>
                </div>
              </div>
            </div>

            {/* Row 5: Panchangam Section */}
            <div className="dc-panchangam-section" onClick={(e) => e.stopPropagation()}>
              <div className="dc-panchangam-col">
                <div className="dc-timing-item">
                  <span className="dc-label">Thithi</span>
                  <span className="dc-val">{info.thithi}</span>
                </div>
                <div className="dc-timing-item">
                  <span className="dc-label">Star</span>
                  <span className="dc-val">{info.natchathiram}</span>
                </div>
              </div>
              <div className="dc-panchangam-col">
                <div className="dc-timing-item">
                  <span className="dc-label">Yogam</span>
                  <span className="dc-val">{info.yogam}</span>
                </div>
                <div className="dc-timing-item">
                  <span className="dc-label">Karanam</span>
                  <span className="dc-val">{info.karanam}</span>
                </div>
                <div className="dc-timing-item">
                  <span className="dc-label">Chandrashtamam</span>
                  <span className="dc-val">{info.chandrashtamam}</span>
                </div>
              </div>
            </div>

            {/* Row 6: Daily Quote Box */}
            <div className="dc-info-box" onClick={(e) => e.stopPropagation()}>
              <div className="dc-info-text">
                <p style={{ margin: "0 0 5px 0", color: "var(--text-primary)", fontWeight: "700" }}>Thought of the Day:</p>
                <p style={{ fontSize: "14.5px", color: "var(--accent-orange)", fontStyle: "italic", fontWeight: "600", margin: 0 }}>
                  "{info.thought}"
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default DateBar;