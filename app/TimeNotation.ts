import { TimeNote, NoteType } from './TimeNote';

export default class TimeNotation {

    private hours: number;
    private minutes: number;

    hourNotes: TimeNote[];
    minuteNotes: TimeNote[];

    constructor(hours: number, minutes: number) {
        this.updateTime(hours, minutes);
    }

    public updateTime(hours: number, minutes: number): void {
        // Special case: midnight
        if (hours === 0 && this.hours !== hours &&
                minutes === 0 && this.minutes !== minutes) {
            this.hours = hours;
            this.minutes = minutes;
            
            this.hourNotes = new Array<TimeNote>(1);
            this.hourNotes[0] = new TimeNote(NoteType.WHOLE_REST, 0);
            this.minuteNotes = new Array<TimeNote>(0);
            return;
        }
        
        if (this.hours != hours) {
            this.hours = hours;
            
            if (this.hours === 0) {
                this.hourNotes = new Array<TimeNote>(1);
                this.hourNotes[0] = new TimeNote(NoteType.HALF_REST, this.hours);
            }
            else {
                this.hourNotes = new Array<TimeNote>(2);
                this.hourNotes[0] = new TimeNote(
                    Math.floor(this.hours / 10) === 0 ? NoteType.QUARTER_REST : NoteType.QUARTER_NOTE,
                    this.hours / 10);
                this.hourNotes[1] = new TimeNote(
                    this.hours % 10 === 0 ? NoteType.QUARTER_REST : NoteType.QUARTER_NOTE,
                    this.hours % 10);
            }
        }

        if (this.minutes != minutes) {
            this.minutes = minutes;

            if (this.minutes === 0) {
                this.minuteNotes = new Array<TimeNote>(1);
                this.minuteNotes[0] = new TimeNote(NoteType.HALF_REST, this.minutes);
            }
            else {
                this.minuteNotes = new Array<TimeNote>(2);
                this.minuteNotes[0] = new TimeNote(
                    Math.floor(this.minutes / 10) === 0 ? NoteType.QUARTER_REST : NoteType.QUARTER_NOTE,
                    this.minutes / 10);
                this.minuteNotes[1] = new TimeNote(
                        this.minutes % 10 === 0 ? NoteType.QUARTER_REST : NoteType.QUARTER_NOTE,
                        this.minutes % 10);
            }
        }
    }
}