import { MdLocationOn, MdPerson } from "react-icons/md";
import {
  HiCalendar,
  HiSearch,
  HiMinus,
  HiPlus,
  HiBookmark,
  HiUserGroup,
} from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideClick from "../../Hooks/useOutsideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function Header() {
  const [serachParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    serachParams.get("destination") || ""
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
    console.log(operation);
  };
  const styles = {
    border: "1px solid #ebe9e9",
    borderRadius: "5px",
    maxWidth: "260px",
  };
  const navigate = useNavigate();
  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            className="headerSearchInput"
            placeholder="Where to go ?"
            name="destination"
            id="destination"
          />
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown" onClick={() => setOpenDate(!openDate)}>
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              style={styles}
              ranges={date}
              className="date"
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
        </div>
        <div className="headerSearchItem" style={{ border: "none" }}>
          <button className="btn headerSearchBtn">
            <HiUserGroup
              className="headerIcon"
              id="optionDropDown"
              onClick={() => setOpenOptions(!openOptions)}
            />
          </button>
          {openOptions && (
            <GuestOptionList
              setOpenOptions={setOpenOptions}
              options={options}
              handleOptions={handleOptions}
            />
          )}
        </div>
        <div className="headerSearchItem">
          <div className="headerBtn">
            <button className="headerSearchBtn" onClick={handleSearch}>
              <HiSearch className="headerIcon" />
            </button>
            <button className="headerSearchBtn">
              <HiBookmark className="bookmarkIcon" />
            </button>
            <button className="headerSearchBtn">
              <MdPerson className="bookmarkIcon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));

  return (
    <div className="guestOptions" ref={optionsRef}>
      <span className="guestOptionsTitle">
        {options.adult} Adult &bull; {options.children} Children &bull;
        {options.room} Room
      </span>
      <OpenItem
        options={options}
        type="adult"
        minLimit={1}
        handleOptions={handleOptions}
      />
      <OpenItem
        options={options}
        type="children"
        minLimit={0}
        handleOptions={handleOptions}
      />
      <OpenItem
        options={options}
        type="room"
        minLimit={1}
        handleOptions={handleOptions}
      />
    </div>
  );
}

function OpenItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
          onClick={() => handleOptions(type, "dec")}
        >
          <HiMinus />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOptions(type, "inc")}
        >
          <HiPlus />
        </button>
      </div>
    </div>
  );
}
