import TimeNotation from "../TimeNotation";
import { NoteType, TimeNote } from "../TimeNote";

test('midnight is one note', () => {
    let midnight = new TimeNotation(0, 0);
    expect(midnight.hourNotes.length).toEqual(1);
    expect(midnight.minuteNotes.length).toEqual(0);

    expect(midnight.hourNotes[0].noteType).toEqual(NoteType.WHOLE_REST);
    expect(midnight.hourNotes[0].unitValue).toEqual(0);
});

test('12:30am is half rest, quarter note, quarter rest', () => {
    let twelveThirty = new TimeNotation(0, 30);
    expect(twelveThirty.hourNotes.length).toEqual(1);
    expect(twelveThirty.minuteNotes.length).toEqual(2);

    expect(twelveThirty.hourNotes[0].noteType).toEqual(NoteType.HALF_REST);
    expect(twelveThirty.minuteNotes[0].noteType).toEqual(NoteType.QUARTER_NOTE);
    expect(twelveThirty.minuteNotes[1].noteType).toEqual(NoteType.QUARTER_REST);
});

test('7:05am is quarter rest, quarter note, quarter rest, quarter note', () => {
    let sevenOhFive = new TimeNotation(7, 5);
    expect(sevenOhFive.hourNotes.length).toEqual(2);
    expect(sevenOhFive.minuteNotes.length).toEqual(2);

    expect(sevenOhFive.hourNotes[0].noteType).toEqual(NoteType.QUARTER_REST);
    expect(sevenOhFive.hourNotes[1].noteType).toEqual(NoteType.QUARTER_NOTE);
    expect(sevenOhFive.minuteNotes[0].noteType).toEqual(NoteType.QUARTER_REST);
    expect(sevenOhFive.minuteNotes[1].noteType).toEqual(NoteType.QUARTER_NOTE);
});

test('9:00pm is quarter note, quarter note, half rest', () => {
    let ninePm = new TimeNotation(21, 0);
    expect(ninePm.hourNotes.length).toEqual(2);
    expect(ninePm.minuteNotes.length).toEqual(1);

    expect(ninePm.hourNotes[0].noteType).toEqual(NoteType.QUARTER_NOTE);
    expect(ninePm.hourNotes[1].noteType).toEqual(NoteType.QUARTER_NOTE);
    expect(ninePm.minuteNotes[0].noteType).toEqual(NoteType.HALF_REST);
});