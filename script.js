let timerInterval;
let startTime = 0;
let elapsedTime = 0;
let activityLogs = [];
let isTracking = false;

// Dark Mode Toggle Functionality
// document.getElementById("darkModeCheckbox").addEventListener("change", function() {
//   document.body.classList.toggle("dark-mode", this.checked);
// });

// Toggle Button to Start/Stop Timer
document.getElementById("toggleButton").addEventListener("click", toggleActivity);

// Activity Dropdown Change Event
document.getElementById("activitySelect").addEventListener("change", resetTimer);

// Function to Update Timer Display
function updateTimer() {
  const time = new Date(elapsedTime);
  const minutes = time.getUTCMinutes().toString().padStart(2, "0");
  const seconds = time.getUTCSeconds().toString().padStart(2, "0");
  document.getElementById("timerDisplay").innerText = `${minutes}:${seconds}`;
}

// Function to Start/Stop Timer
function toggleActivity() {
  if (isTracking) {
    // Stop Tracking
    clearInterval(timerInterval);
    document.getElementById("toggleButton").innerText = "Start";
    activityLogs.push({
      activity: document.getElementById("activitySelect").value,
      time: elapsedTime
    });
    renderActivityLogs();
    elapsedTime = 0; // Reset time after stop
  } else {
    // Start Tracking
    document.getElementById("toggleButton").innerText = "Stop";
    timerInterval = setInterval(function() {
      elapsedTime += 1000;
      updateTimer();
    }, 1000);
  }
  isTracking = !isTracking;
}

// Reset Timer when Activity is Changed
function resetTimer() {
  if (isTracking) {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateTimer();
    document.getElementById("toggleButton").innerText = "Start";
    isTracking = false;
  }
}

// Render Activity Logs
function renderActivityLogs() {
  const activityLogContainer = document.getElementById("activityLog");
  activityLogContainer.innerHTML = "";
  activityLogs.forEach(log => {
    const logItem = document.createElement("li");
    logItem.innerText = `${log.activity}: ${new Date(log.time).toISOString().substr(14, 5)}`;
    activityLogContainer.appendChild(logItem);
  });
}

// Function to Download Activity Log as Excel File
document.getElementById("downloadBtn").addEventListener("click", function() {
  const worksheet = XLSX.utils.json_to_sheet(activityLogs);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Activity Log");
  XLSX.writeFile(workbook, "activity_log.xlsx");
});

// // Download Activity Log as Excel File
// document.getElementById("downloadBtn").addEventListener("click", function() {
//   const worksheet = XLSX.utils.json_to_sheet(activityLogs);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Activity Log");
//   XLSX.writeFile(workbook, "activity_log.xlsx");
// });