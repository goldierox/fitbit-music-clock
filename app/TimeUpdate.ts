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
}