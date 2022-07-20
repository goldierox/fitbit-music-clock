import Clock from "./Clock";
import document from "document";
import { me as appbit } from "appbit";
import { HeartRateSensor } from "heart-rate";
import { today } from "user-activity";

const dayOfWeekElement = document.getElementById("dayOfWeek") as TextElement;
const heartRateElement = document.getElementById("heartRate") as TextElement;
const dateElement = document.getElementById("date") as TextElement;
const stepCount = document.getElementById("stepCount") as TextElement;

const updateStepCount = () => {
  if (appbit.permissions.granted("access_activity")) {
    stepCount.text = `- ${today.adjusted.steps} -`;
  }
};

const clock = new Clock();
clock.clockCallback = (t) => {
    console.log("Updating day of week: " + t.dayOfWeek);
    dayOfWeekElement.text = t.dayOfWeek;
    dateElement.text = t.dateString;

    updateStepCount();
};

if (HeartRateSensor) {
    const hrm = new HeartRateSensor({ frequency: 1 });
    hrm.addEventListener("reading", () => {
        console.log(`Current heart rate: ${hrm.heartRate}`);
        heartRateElement.text = "= " + hrm.heartRate;
    });
    hrm.start();
}

updateStepCount();