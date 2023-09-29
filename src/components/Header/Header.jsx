import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiSearch, HiMinus, HiPlus } from "react-icons/hi";
import { useState } from "react";

function Header() {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
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
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown">2023-12-17</div>
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            2 Adult &bull; 1 Children &bull; 1 Room
          </div>
          {openOptions && <GuestOptionList />}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionList() {
  return (
    <div className="guestOptions">
      <OpenItem />
      <OpenItem />
      <OpenItem />
    </div>
  );
}

function OpenItem() {
  return (
    <div className="guestOptionItem">
      <span className="optionText">Adult</span>
      <div className="optionCounter">
        <button className="optionCounterBtn">
          <HiMinus />
        </button>
        <span className="optionCounterNumber">1</span>
        <button className="optionCounterBtn">
          <HiPlus />
        </button>
      </div>
    </div>
  );
}
