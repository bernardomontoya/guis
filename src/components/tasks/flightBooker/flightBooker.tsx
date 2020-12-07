import { useState, useEffect } from "react";
import Select from "../../shared/select/Select";
import Input from "../../shared/input/input";
import Button from "../../shared/button/button";
import { Title, Subtitle } from "../../shared/text/styles";
import { Container, Wrapper } from "../../shared/container/styles";
import {
  getCurrentDate,
  formatDate,
  isValidDate,
  isDateMoreRecent,
} from "../../utils/date";

interface FlightDatesObj {
  startDate: {
    date: string;
    error: boolean;
  };
  returnDate: { date: string; error: boolean };
}

const FlightOptions = [
  { value: "oneWay", text: "One-way Flight", default: true },
  { value: "return", text: "Return", default: false },
];
const currentDate = formatDate(getCurrentDate(), ".");
const defaultFlight = FlightOptions.filter((flight) => flight.default)[0].value;

const FlightBooker = () => {
  const [flight, setFlight] = useState<string>(defaultFlight);
  const [flightDates, setFlightDates] = useState<FlightDatesObj>({
    startDate: { date: currentDate, error: false },
    returnDate: { date: currentDate, error: false },
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFlight(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    alert(
      flight === "oneWay"
        ? `You have booked a one-way flight on ${flightDates.startDate.date}`
        : `You have booked a one-way flight from ${flightDates.startDate.date} to ${flightDates.returnDate.date}`
    );
    e.preventDefault();
  };
  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    flightDate: "startDate" | "returnDate"
  ) => {
    const value = e.target.value;
    const valid = isValidDate(value);
    setFlightDates({
      ...flightDates,
      [flightDate]: { date: value, error: !valid },
    });
  };

  const oneWayFlight = flight === "oneWay";
  const dateMoreRecent =
    !flightDates.startDate.error && !flightDates.returnDate.error
      ? isDateMoreRecent(
          flightDates.startDate.date,
          flightDates.returnDate.date,
          oneWayFlight
        )
      : false;
  const submitDisabled =
    flightDates.startDate.error ||
    flightDates.returnDate.error ||
    !dateMoreRecent;

  useEffect(() => {
    console.log("rendered FlightBooker");
  });

  return (
    <Container>
      <Title>Fight booker</Title>
      <Subtitle>
        Choose either a one way flight or a flight with return date and book
        your flight!
      </Subtitle>
      <form onSubmit={handleSubmit}>
        <Wrapper direction="column" top="medium">
          <Wrapper direction="column" bottom="small">
            <Select
              value={flight}
              name="flight-select"
              options={FlightOptions}
              onChange={handleChange}
            />
          </Wrapper>
          <Wrapper direction="column" bottom="small">
            <Input
              value={flightDates.startDate.date}
              type="text"
              onChange={(e) => handleDateChange(e, "startDate")}
              placeholder={currentDate}
              label="Start date"
              id="start-date"
              error={flightDates.startDate.error}
            />
          </Wrapper>
          <Wrapper direction="column" bottom="small">
            <Input
              value={flightDates.returnDate.date}
              type="text"
              onChange={(e) => handleDateChange(e, "returnDate")}
              placeholder={currentDate}
              label="Return date"
              id="return-date"
              disabled={oneWayFlight}
              error={flightDates.returnDate.error}
            />
          </Wrapper>
          <Button text="Book" type="submit" disabled={submitDisabled} />
        </Wrapper>
      </form>
    </Container>
  );
};

export default FlightBooker;
