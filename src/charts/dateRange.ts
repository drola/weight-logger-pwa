import add from "date-fns/add";
import max from "date-fns/max";
import min from "date-fns/min";
import sub from "date-fns/sub";

export function dateRange(dates: Date[]): [Date, Date] {
  let timeMin: Date = new Date(2000, 0, 1);
  let timeMax: Date = new Date(2000, 0, 1);

  if (dates.length > 0) {
    timeMin = min(dates);
    timeMax = max(dates);
  }

  const minTimeSpan = 3600 * 1000;
  const timeSpanPadding = Math.max(
    0,
    minTimeSpan - (timeMax.getTime() - timeMin.getTime())
  );
  timeMin = sub(timeMin, { seconds: timeSpanPadding / 2 / 1000 });
  timeMax = add(timeMax, { seconds: timeSpanPadding / 2 / 1000 });

  return [timeMin, timeMax];
}
