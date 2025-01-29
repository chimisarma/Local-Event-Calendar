const events = {
"2025-01-14":"Magh Bihu",
"2025-01-28":"Bathou Puja",
"2025-01-31":"Medam Mephi,Assam Sahitya Sabha"
};

const eventDetails = document.getElementById('event-details');
const eventInfo = document.getElementById('event-info');
const closeDetails = document.getElementById('close-details');
const daysContainer = document.getElementById('days');
const monthYear = document.getElementById('month-year');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');


let currentDate = new Date();

function renderCalendar(date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  const firstDayWeekday = firstDayOfMonth.getDay();
  const lastDateOfMonth = lastDayOfMonth.getDate();
  
  const todayString = `${year}-${(month + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

  const daysArray = [];
  for (let i = 0; i < firstDayWeekday; i++) {
    daysArray.push('');
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    const dayString = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
    daysArray.push({ day: i, event: events[dayString] || null, isToday: dayString === todayString });
  }

  daysContainer.innerHTML = '';
  daysArray.forEach(day => {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    
    if (day) {
      dayElement.textContent = day.day;
      if (day.isToday) {
        dayElement.classList.add('today');
      }
      if (day.event) {
        dayElement.classList.add('event-day');
        dayElement.onclick = () => showEventDetails(day.event);
      }
    }
    
    daysContainer.appendChild(dayElement);
  });
}

function showEventDetails(event) {
  eventInfo.textContent = event;
  eventDetails.style.display = 'block';
}

closeDetails.onclick = () => {
  eventDetails.style.display = 'none';
};

// Button to go to the previous month
prevMonthButton.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
};

// Button to go to the next month
nextMonthButton.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
};

// Initial render
renderCalendar(currentDate);




