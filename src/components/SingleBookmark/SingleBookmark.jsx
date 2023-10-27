import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../../context/BookmarkListContext";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { HiArrowCircleLeft } from "react-icons/hi";

function SingleBookmark() {
  const { id } = useParams();
  const { currentBookmark, isLoading, getBookmark } = useBookmark();
  const navigate = useNavigate();
  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoading || !currentBookmark) return <Loader />;

  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn btn--back">
        <HiArrowCircleLeft/>
      </button>
      <h2 className="single-bookmark__city">{currentBookmark.cityName}</h2>
      <div className="single-bookmark__location">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName} </strong> &nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;
