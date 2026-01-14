"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ICabinResponse } from "../_models/_response/ICabinResponse";
import { ISettingsResponse } from "../_models/_response/ISettingsResponse";
import { useReservationContext } from "./ReservationContext";

function isAlreadyBooked(
  range: { from: Date | undefined; to?: Date | undefined },
  datesArr: Date[]
) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, {
        start: range.from as Date,
        end: range.to as Date,
      })
    )
  );
}

function DateSelector({
  settings,
  bookedDates,
  cabin,
}: {
  settings: ISettingsResponse;
  bookedDates: Date[];
  cabin: ICabinResponse;
}) {
  const { range, setRange } = useReservationContext();
  const { regularPrice, discount } = cabin;
  const displayRange =
    range && isAlreadyBooked(range, bookedDates)
      ? { from: undefined, to: undefined }
      : range;
  const numNights =
    displayRange?.from && displayRange?.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;
  const cabinPrice = numNights * (regularPrice - discount);
  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;
  return (
    <div className="flex flex-col justify-between border border-primary-800">
      <DayPicker
        className="py-12 place-self-center"
        mode="range"
        styles={{
          nav: { display: "none" },
          months: { gap: "10rem" },
        }}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
        selected={displayRange}
        onSelect={setRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => setRange({ from: undefined, to: undefined })}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
