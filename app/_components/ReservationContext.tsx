"use client";

import { createContext, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

interface IReservationContext {
  range: DateRange | undefined;
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

const ReservationContext = createContext<IReservationContext | null>(null);

const initialState = {
  from: undefined,
  to: undefined,
};

export function ReservationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [range, setRange] = useState<DateRange | undefined>(initialState);
  return (
    <ReservationContext.Provider value={{ range, setRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservationContext() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error(
      "useReservationContext must be used within a ReservationProvider"
    );
  }
  return context;
}
