export interface IBookingRequest {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  cabinPrice: number;
  extraPrice: number;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  totalPrice: number;
  numGuests: number;
  guestId: number;
  cabinId: number;
  status: "checked-in" | "checked-out";
}
