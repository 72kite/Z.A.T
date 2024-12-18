document.addEventListener('DOMContentLoaded', function () {
    // Auto-fill the current date
    document.getElementById('date').value = new Date().toISOString().split('T')[0];

    // Initialize the shift start and end time options
    populateTimeOptions();

    // Update shift end times when the start time is changed
    document.getElementById('shift-start').addEventListener('change', updateShiftEndOptions);

    // Add user to the table
    document.getElementById('add-user-btn').addEventListener('click', function () {
        const userName = document.getElementById('user-name').value || `CZAN_User${Date.now()}`;
        const shiftStart = document.getElementById('shift-start').value;
        const shiftEnd = document.getElementById('shift-end').value;
        const date = document.getElementById('date').value;

        if (!shiftStart || !shiftEnd) {
            alert('Please select both shift start and end times.');
            return;
        }

        // Convert the start and end times to Date objects
        const shiftStartTime = new Date(`1970-01-01T${shiftStart}:00`);
        const shiftEndTime = new Date(`1970-01-01T${shiftEnd}:00`);

        // Calculate Lunch (4 hours into the shift)
        const lunchTime = new Date(shiftStartTime.getTime() + 4 * 60 * 60 * 1000);
        const formattedLunchTime = formatTime(lunchTime);

        // Calculate First Break (2 hours into the shift)
        const firstBreakTime = new Date(shiftStartTime.getTime() + 2 * 60 * 60 * 1000);
        const formattedFirstBreakTime = formatTime(firstBreakTime);

        // Calculate Second Break (1 hour before the end of shift)
        const secondBreakTime = new Date(shiftEndTime.getTime() - 1 * 60 * 60 * 1000);
        const formattedSecondBreakTime = formatTime(secondBreakTime);

        // Calculate Dispensing Shift (starts 1 hour after lunch, but not before 7 AM)
        let dispensingShiftStart = new Date(lunchTime.getTime() + 1 * 60 * 60 * 1000); // 1 hour after lunch time

        // Ensure dispensing shift starts at or after 7 AM
        const sevenAM = new Date(shiftStartTime);
        sevenAM.setHours(7, 0, 0, 0); // Set 7 AM for the day

        if (dispensingShiftStart < sevenAM) {
            dispensingShiftStart = sevenAM; // Set dispensing shift to 7 AM if it's earlier
        }

        const formattedDispensingShift = formatTime(dispensingShiftStart);

        // Adding data to the table
        const tableBody = document.getElementById('shift-table-body');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${userName}</td>
            <td>${formatTime(shiftStartTime)}</td>
            <td>${formatTime(shiftEndTime)}</td>
            <td>${formattedLunchTime}</td>
            <td>${formattedFirstBreakTime}</td>
            <td>${formattedSecondBreakTime}</td>
            <td>${formattedDispensingShift}</td>
        `;
        tableBody.appendChild(row);
    });

    // Function to update shift end options based on the selected start time
    function updateShiftEndOptions() {
        const startTime = document.getElementById('shift-start').value;
        const shiftEndSelect = document.getElementById('shift-end');
        const validEndTimes = getValidEndTimes(startTime);

        // Clear current options
        shiftEndSelect.innerHTML = '';

        // Add new valid options based on the start time
        validEndTimes.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = formatTime(new Date(`1970-01-01T${time}:00`));
            shiftEndSelect.appendChild(option);
        });
    }

    // Function to get valid shift end times based on the selected start time
    function getValidEndTimes(startTime) {
        const startHour = parseInt(startTime.split(':')[0]);
        const endTimes = [];

        // Define the maximum allowed shift duration (9 hours)
        const maxDuration = 9 * 60; // 9 hours in minutes

        for (let i = 1; i <= maxDuration / 60; i++) {
            const endHour = startHour + i;
            if (endHour <= 22) { // Ensure the end time is before 10 PM
                const endTime = `${String(endHour).padStart(2, '0')}:00`;
                endTimes.push(endTime);
                const halfHourEndTime = `${String(endHour).padStart(2, '0')}:30`;
                endTimes.push(halfHourEndTime);
            }
        }

        return endTimes;
    }

    // Function to format the time into 12-hour format with AM/PM
    function formatTime(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0-23 hours to 12-hour format
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${formattedHours}:${formattedMinutes} ${period}`;
    }

    // Populate time options in 30-minute increments
    function populateTimeOptions() {
        const startSelect = document.getElementById('shift-start');
        const endSelect = document.getElementById('shift-end');

        for (let hour = 5; hour <= 22; hour++) {
            for (let minute of [0, 30]) {
                const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                const startOption = document.createElement('option');
                startOption.value = time;
                startOption.textContent = formatTime(new Date(`1970-01-01T${time}:00`));
                startSelect.appendChild(startOption);

                if (hour >= 5 && hour <= 22) {
                    const endOption = document.createElement('option');
                    endOption.value = time;
                    endOption.textContent = formatTime(new Date(`1970-01-01T${time}:00`));
                    endSelect.appendChild(endOption);
                }
            }
        }
    }
    // Functionality for the Download Button
document.getElementById('download-btn').addEventListener('click', () => {
    const table = document.getElementById('shift-table');
    const rows = table.querySelectorAll('tr');
    let csvContent = '';

    // Loop through table rows to build CSV content
    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        const rowData = Array.from(cells).map(cell => `"${cell.innerText}"`).join(',');
        csvContent += rowData + '\n';
    });

    // Create a execl or xls and trigger download of shift chart
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'shift_schedule.csv';
    link.click()
});

});
