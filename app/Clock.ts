import clock from "clock";
import { TimeUpdate } from "./TimeUpdate";
export class Clock {
    public clockCallback: (timeUpdate: TimeUpdate) => void;

    constructor() {
        clock.granularity = "minutes";
        // Update the clock every tick event
        clock.addEventListener("tick", this.updateClock);
    }
    private updateClock = () => {
        if (!this.clockCallback) {
            return;
        }

        this.clockCallback(new TimeUpdate(new Date()));
    }
}
export default Clock;