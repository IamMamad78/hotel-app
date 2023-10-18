import Map from "../Map/Map";

function Bookmark() {
    
  return (
    <div className="appLayout">
      <div className="sidebar">
        <div>BookMark List</div>
        {/* <Outlet /> */}
      </div>
      <Map markerLocations={[]}/>
    </div>
  );
}

export default Bookmark;
