import dayjs from "dayjs";
export class TimeUpdate {
    private _date: Date;
    private _dayNames: string[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    constructor(date: Date) {
        this._date = date;
    }

    public get dayOfWeek(): string {
        if (!this._date) {
            return null;
        }

        return this._dayNames[this._date.getDay()];
    }

    public get dateString(): string {
        if (!this._date) {
            return null;
        }

        // TODO explore caching this
        return dayjs(this._date).format("MMM DD");
    }

    public get hours(): number {
        if (!this._date) {
            return null;
        }

        return this._date.getHours();
    }

    public get minutes(): number {
        if (!this._date) {
            return null;
        }

        return this._date.getMinutes();
    }
}