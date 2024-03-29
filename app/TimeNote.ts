export class TimeNote {
    unitValue: number;
    noteType: NoteType;

    private startingPositionBelowB: number = 155;
    private startingPositionBAndAbove: number = 155;
    private noteMultiplier: number = 9.5;

    constructor(noteType: NoteType, unitValue: number) {
        this.noteType = noteType;
        this.unitValue = unitValue;
    }

    public get noteYPosition(): number {
        switch (this.noteType) {
            case NoteType.QUARTER_NOTE:
                if (this.unitValue < 7) {
                    return this.startingPositionBelowB - (this.unitValue - 1) * this.noteMultiplier;
                }
                else {
                    return this.startingPositionBAndAbove - (this.unitValue - 7) * this.noteMultiplier;
                }
            default:
                return 125;
        }
    }

    public get imageHref(): string {
        if (this.noteType === NoteType.QUARTER_NOTE) {
            if (this.unitValue === 1) {
                return "middle-c.png";
            }
            else if (this.unitValue < 7) {
                return "below-b.png";
            }
            
            return "above-b.png";
        }
        else if (this.noteType === NoteType.QUARTER_REST) {
            return "quarter-rest.png";
        }

        return null;
    }
}

export enum NoteType {
    WHOLE_REST,
    HALF_REST,
    QUARTER_REST,
    QUARTER_NOTE
}

export enum NotePosition {
    MIDDLE_C,
    BELOW_B,
    B_AND_ABOVE
}