import Clock from "./Clock";
import document from "document";
import { HeartRateSensor } from "heart-rate";

const dayOfWeekElement = document.getElementById("dayOfWeek") as TextElement;

const clock = new Clock();
clock.clockCallback = (t) => {
    console.log("Updating day of week: " + t.dayOfWeek);
    dayOfWeekElement.text = t.dayOfWeek;
};

if (HeartRateSensor) {
    const hrm = new HeartRateSensor({ frequency: 1 });
    hrm.addEventListener("reading", () => {
      console.log(`Current heart rate: ${hrm.heartRate}`);
    });
    hrm.start();
}