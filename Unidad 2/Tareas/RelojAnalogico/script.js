function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    document.getElementById("hour").style.transform = `rotate(${30 * hours + minutes / 2}deg)`;
    document.getElementById("minute").style.transform = `rotate(${6 * minutes}deg)`;
    document.getElementById("second").style.transform = `rotate(${6 * seconds}deg)`;
}
setInterval(updateClock, 1000);
updateClock();
