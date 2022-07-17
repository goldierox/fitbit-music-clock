export class TimeNote {
    noteType: NoteType
    unitValue: number

    constructor(noteType: NoteType, unitValue: number) {
        this.noteType = noteType;
        this.unitValue = unitValue;
    }
}

export enum NoteType {
    WHOLE_REST,
    HALF_REST,
    QUARTER_REST,
    QUARTER_NOTE
}