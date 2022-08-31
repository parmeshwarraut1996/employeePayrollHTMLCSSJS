/**
 * The below function shiws the time
 */
const showTime = () => {
    const date = new Date();
    return date.getHours() + " Hrs : " + date.getMinutes() + " Minutes : " + date.getSeconds() + " Seconds : ";
}

const showSessionExpire = () => {
    console.log("Activity-B : Your session expired at " + showTime());
}

// the following line will executed at first position
console.log("Activity-A : Triggering Activity-B at " + showTime());
//the below line will execute lastly
setTimeout(showSessionExpire, 5000);
//the below line will execute at 2nd position
console.log("Activity-A : Triggering Activity-B at " + showTime() + " will execute after 5 seconds");