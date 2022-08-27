import Clock from "./Clock";
import document from "document";
import { me as appbit } from "appbit";
import { HeartRateSensor } from "heart-rate";
import { today } from "user-activity";
import { NoteType, TimeNote } from "./TimeNote";
import { min } from "scientific";

const dayOfWeekElement = document.getElementById("dayOfWeek") as TextElement;
const heartRateElement = document.getElementById("heartRate") as TextElement;
const dateElement = document.getElementById("date") as TextElement;
const stepCount = document.getElementById("stepCount") as TextElement;

const hourTensImage = document.getElementById("hourTensImage") as ImageElement;
const hourOnesImage = document.getElementById("hourOnesImage") as ImageElement;
const minuteTensImage = document.getElementById("minuteTensImage") as ImageElement;
const minuteOnesImage = document.getElementById("minuteOnesImage") as ImageElement;
const wholeRest = document.getElementById("wholeRest") as RectElement;

const updateStepCount = () => {
  if (appbit.permissions.granted("access_activity")) {
    stepCount.text = `- ${today.adjusted.steps} -`;
  }
};

const updateTimeNotes = (hours: number, minutes: number) => {
  hours = 0
  minutes = 30
  console.log(`Updating time: hours = ${hours}, minutes = ${minutes}`);

  const noteImages = [hourOnesImage, hourTensImage, minuteTensImage, minuteOnesImage];
  
  // Midnight special case
  if (hours === 0 && minutes === 0) {
    noteImages.forEach(x => x.style.visibility = "hidden");
    wholeRest.style.visibility = "visible";
    return;
  }
  else {
    wholeRest.style.visibility = "hidden";
  }
  
  // TODO extract to util
  const hoursTens: number = Math.floor(hours / 10.0);
  let hourTensNoteType: NoteType = NoteType.QUARTER_NOTE;
  if (hours === 0) {
      hourTensNoteType = NoteType.HALF_REST;
  }
  else if (hoursTens === 0) {
    hourTensNoteType = NoteType.QUARTER_REST;
  }

  const hoursTensTimeNote = new TimeNote(hourTensNoteType, hoursTens);
  hourTensImage.href = hoursTensTimeNote.imageHref;
  hourTensImage.y = hoursTensTimeNote.noteYPosition

  // TODO extract to util
  const hoursOnes: number = hours % 10;
  let hourOnesNoteType: NoteType = NoteType.QUARTER_NOTE;
  if (hourTensNoteType === NoteType.HALF_REST) {
    hourOnesNoteType = null; // TODO is null the right way to capturing hiding?
  }
  else if (hoursOnes === 0) {
    hourOnesNoteType = NoteType.QUARTER_REST;
  }

  if (hourOnesNoteType === null) {
    hourOnesImage.style.visibility = "hidden";
  }
  else {
    const hoursOnesTimeNote = new TimeNote(hourOnesNoteType, hoursOnes);
    hourOnesImage.style.visibility = "visible";
    hourOnesImage.href = hoursOnesTimeNote.imageHref
    hourOnesImage.y = hoursOnesTimeNote.noteYPosition
  }

  // TODO extract to util
  const minutesTens: number = Math.floor(minutes / 10.0);
  let minuteTensNoteType: NoteType = NoteType.QUARTER_NOTE;
  if (minutes === 0) {
    minuteTensNoteType = NoteType.HALF_REST;
  }
  else if (minutesTens === 0) {
    minuteTensNoteType = NoteType.QUARTER_REST;
  }

  if (minuteTensNoteType === null) {
    minuteTensImage.style.visibility = "hidden";
  }
  else {
    const minuteTensTimeNote = new TimeNote(minuteTensNoteType, minutesTens);
    minuteTensImage.style.visibility = "visible";
    minuteTensImage.href = minuteTensTimeNote.imageHref
    minuteTensImage.y = minuteTensTimeNote.noteYPosition
  }

  // TODO extract to util
  const minuteOnes: number = minutes % 10;
  let minuteOnesNoteType: NoteType = NoteType.QUARTER_NOTE;
  if (minuteTensNoteType === NoteType.HALF_REST) {
    minuteOnesNoteType = null; // TODO is null the right way to capturing hiding?
  }
  else if (minuteOnes === 0) {
    minuteOnesNoteType = NoteType.QUARTER_REST;
  }

  if (minuteOnesNoteType === null) {
    minuteOnesImage.style.visibility = "hidden";
  }
  else {
    const minuteOnesTimeNote = new TimeNote(minuteOnesNoteType, minuteOnes);
    minuteOnesImage.style.visibility = "visible";
    minuteOnesImage.href = minuteOnesTimeNote.imageHref
    minuteOnesImage.y = minuteOnesTimeNote.noteYPosition
  }
}

const clock = new Clock();
clock.clockCallback = (t) => {
    console.log("Updating day of week: " + t.dayOfWeek);
    dayOfWeekElement.text = t.dayOfWeek;
    dateElement.text = t.dateString;

    updateTimeNotes(t.hours, t.minutes)
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