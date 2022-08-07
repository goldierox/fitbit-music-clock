import clock from "clock";
import { TimeUpdate } from "./TimeUpdate";
export default class Clock {
    public clockCallback: (timeUpdate: TimeUpdate) => void;

    constructor() {
        clock.granularity = "minutes";
        clock.addEventListener("tick", this.updateClock);
    }

    private updateClock = () => {
        if (!this.clockCallback) {
            return;
        }

        this.clockCallback(new TimeUpdate(new Date()));
    }
}
