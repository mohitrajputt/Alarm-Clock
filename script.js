// <--------------- To convert Dark mode -> Light mode ---------------------->

var toggle_button = document.getElementsByClassName('toggle-label')[0];

const lightbg = document.body;
const toggleButtonCont = document.getElementsByClassName('toggle-button-container')[0];
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const toggleInnerLeftDiv1 = document.getElementsByClassName('toggle-inner-left-divs')[0];
const toggleInnerLeftDiv2 = document.getElementsByClassName('toggle-inner-left-divs')[1];
const toggleInnerLeftDiv3 = document.getElementsByClassName('toggle-inner-left-divs')[2];
const toggleInnerRightDiv = document.getElementsByClassName('toggle-inner-right-div')[0];
const lightAlarm = document.getElementsByClassName('alarm')[0];
const clockActiveButton = document.getElementsByClassName('clock-active-button')[0];
const clockButtonDesign = document.getElementsByClassName('clock-button-design')[0];
const setAlarmClock = document.getElementsByClassName('set-alarm-clock')[0];
const tools = document.getElementsByClassName('tools')[0];
const addIcon = document.getElementsByClassName('add-button')[0];
const editIcon = document.getElementsByClassName('edit-button')[0];

toggle_button.addEventListener('click', function () {
    lightbg.classList.toggle('light-body');
    toggleButtonCont.classList.toggle('light-toggle-button-container');
    toggleButton.classList.toggle('light-toggle-button');
    toggleInnerLeftDiv1.classList.toggle('light-inner-left-divs');
    toggleInnerLeftDiv2.classList.toggle('light-inner-left-divs');
    toggleInnerLeftDiv3.classList.toggle('light-inner-left-divs');
    toggleInnerRightDiv.classList.toggle('light-toggle-inner-right-div');
    lightAlarm.classList.toggle('light-alarm');
    clockActiveButton.classList.toggle('light-clock-active-button');
    clockButtonDesign.classList.toggle('light-clock-button-design');
    setAlarmClock.classList.toggle('light-set-alarm-clock');
    tools.classList.toggle('light-tools');
    addIcon.classList.toggle('light-add-button');
    editIcon.classList.toggle('light-edit-button');
})

// <--------------- Tools [ Add/Delete] ---------------------->

// ADD

var originalDiv = document.getElementsByClassName('alarm')[0];
var addButton = document.getElementsByClassName('add')[0];
var cloneDivCont = document.getElementsByClassName('alarm-container')[0];
var addcounter = 0;

addButton.addEventListener('click', function () {
    var cloneDiv = originalDiv.cloneNode(true);
    cloneDivCont.appendChild(cloneDiv);
    addcounter++;

    // Delete
    var dltbuttons = document.querySelectorAll('.delete-box');

    dltbuttons.forEach(function (button) {
        button.addEventListener('click', function () {
            var divToRemove = button.parentNode;
            divToRemove.remove();
        });
    });

});

// Show Delete icon

var editbutton = document.getElementsByClassName('edit')[0];
var isclicked;


editbutton.addEventListener('click', function () {
    if (!isclicked) {
        for (var i = 1; i <= addcounter; i++) {
            document.getElementsByClassName('delete-box')[i].style.display = "inline-block";
            document.getElementsByClassName('clock-active-button')[i].style.display = "none";
        }
        isclicked = true;
    }
    else {
        for (var i = 1; i <= addcounter; i++) {
            document.getElementsByClassName('delete-box')[i].style.display = "none";
            document.getElementsByClassName('clock-active-button')[i].style.display = "inline-block";
        }
        isclicked = false;
    }
});



// < ------------  scroll horizontal [ Alarm container add right side so it's scroll horizontal ] ---------- >

function horizontalScroll(event) {
    const container = document.getElementsByClassName('alarm-container')[0];
    container.scrollLeft += event.deltaY;
    event.preventDefault();
}

// <------------------- visible on click -------------------->

var clock_body = document.querySelectorAll('.alarm')[0];
var set_clock = document.getElementsByClassName('set-alarm-clock')[0];

clock_body.addEventListener('click', function () {
    set_clock.style.display = 'block';
});

// < -----------------  close on click  ------------------------------------------------->

var close_clock = document.getElementsByClassName('x-mark')[0];

close_clock.addEventListener('click', function () {
    set_clock.style.display = 'none';
    isActive.checked = false;
    document.getElementsByClassName('clock-active-button')[0].style.backgroundColor = "transparent";
    document.getElementsByClassName('clock-active-button')[0].style.border = "1px solid white";
    document.getElementsByClassName('clock-button-design')[0].style.backgroundColor = "white";
    document.getElementsByClassName('alarm')[0].style.color = "#737373";
});


// <--------------------------  Alarm set up --------------------------------------->

function setAlarm() {
    // current time and date
    const now = new Date();

    // input values
    const inputTime = document.getElementById('time').value;
    const inputDate = document.getElementById('date').valueAsDate;
    const inputName = document.getElementById('alarm-name').value;

    // check if values are not input
    if (!inputTime || !inputDate) {
        alert("Please enter a valid alarm time and date.");
    }

    // format alarm time and date
    const [hours, minutes] = inputTime.split(':');
    const alarmDateTime = new Date(
        inputDate.getFullYear(),
        inputDate.getMonth(),
        inputDate.getDate(),
        hours,
        minutes
    );

    // check if the alarm time is in the past
    if (alarmDateTime <= now) {
        alert("Invalid alarm time. Please choose a time in the future.");
        return;
    }
    else {
        document.getElementById('set-alarm-time').innerHTML = hours + ":" + minutes;
        function remainupdate() {
            var realtime = new Date();
            var remainHours = hours - realtime.getHours();
            var remainMinutes = minutes - realtime.getMinutes();
            document.getElementById('set-remain-time').innerHTML = " in " + remainHours + " hours, " + remainMinutes + " minutes";
            if(remainMinutes == 0){
                clearInterval(myinterval);
                document.getElementById('alarm-activate').checked = false;
                document.getElementsByClassName('clock-active-button')[0].style.backgroundColor = "transparent";
                document.getElementsByClassName('clock-active-button')[0].style.border = "1px solid white";
                document.getElementsByClassName('clock-button-design')[0].style.backgroundColor = "white";
                document.getElementsByClassName('alarm')[0].style.color = "#737373";
            }
        }
        const myinterval = setInterval(remainupdate, 500);
        if (inputName) {
            document.getElementById('set-alarm-name').innerHTML = inputName;
        }
        set_clock.style.display = 'none';
        document.getElementById('alarm-activate').checked = true;
        // Change active design
    }

    const timeUntilAlarm = alarmDateTime - now;

// pop up
document.getElementById('show-time').innerHTML = "It's " + inputTime;

// set up ringtone
const musicPlayer = document.getElementById("musicPlayer");

const popup = document.getElementById('popupContainer');
const closeButton = document.getElementById('closePopup');

const dismiss = document.getElementById('dismiss');

function closePopup() {
    popup.style.display = 'none';
    musicPlayer.pause();
}

    // Action 
    setTimeout(function () {
        popup.style.display = 'block';
        musicPlayer.play();
    }, timeUntilAlarm);

    // close pop up
    closeButton.addEventListener('click', closePopup);
    dismiss.addEventListener('click', closePopup);

}

// <-------------------------- Real time ---------------------------------->

function updateClock() {
    const currentTime = new Date();
    const currentHours = currentTime.getHours().toString().padStart(2, '0');
    const currentMinutes = currentTime.getMinutes().toString().padStart(2, '0');
    const currentSeconds = currentTime.getSeconds().toString().padStart(2, '0');
    const timeString = `${currentHours}:${currentMinutes}:${currentSeconds}`;
    document.getElementById('clock-time').textContent = timeString;
}

// Update the clock every second (1000 milliseconds)
setInterval(updateClock, 1000);

// Initial update to avoid delay
updateClock();


// <---------------- Highlight alarm clock when active  --------------------->

var isActive = document.getElementById('alarm-activate');
var modetoggle = document.getElementById('toggle-button')
// Error
isActive.addEventListener('change',function() {
    if(!modetoggle.checked){
        if(isActive.checked){
            document.getElementsByClassName('clock-active-button')[0].style.backgroundColor = "#db9ee5";
            document.getElementsByClassName('clock-active-button')[0].style.border = "1px solid #db9ee5";
            document.getElementsByClassName('clock-button-design')[0].style.backgroundColor = "black";
            document.getElementsByClassName('alarm')[0].style.color = "white";
        }
        else{
            document.getElementsByClassName('clock-active-button')[0].style.backgroundColor = "transparent";
            document.getElementsByClassName('clock-active-button')[0].style.border = "1px solid white";
            document.getElementsByClassName('clock-button-design')[0].style.backgroundColor = "white";
            document.getElementsByClassName('alarm')[0].style.color = "#737373";
        }
    }
});


