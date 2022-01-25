// Ignore for importing components with vite loader
// @ts-ignore
import HeartStrokeSvg from "../../assets/favorite-stroke.svg?component";
// @ts-ignore
import ClockSvg from "../../assets/time.svg?component";
import "./NewsCardSkeleton.css";

const NewsCardSkeleton = () => {
  return (
    <div className="NewsCardSkeleton">
      <div className="NewsCardSkeleton__content">
        <div className="NewsCardSkeleton__content-time">
          <ClockSvg />
          <span>Loading...</span>
        </div>
        <p>Loading...</p>
      </div>
      <div className="NewsCardSkeleton__favorite">
        <HeartStrokeSvg />
      </div>
    </div>
  );
};

export default NewsCardSkeleton;
