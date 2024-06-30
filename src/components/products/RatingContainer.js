import { FaStar } from "react-icons/fa6";
import { userReviewStarRatings } from "../../utils/constants";
import ReusableButton from "../ReusableButton";

const RatingContainer = ({ setRating, rating }) => {
  return (
    <div className="flex items-center my-2 xs:space-x-1 h-6">
      {Array(5)
        .fill("")
        .map((each, index) => {
          const givenRating = index + 1;
          return (
            <div key={index}>
              <FaStar
                className="cursor-pointer mr-[2px] xs:mr-0"
                onClick={() => setRating(givenRating)}
                color={
                  givenRating < rating || givenRating === rating
                    ? "#eddc24"
                    : "rgb(192,192,192)"
                }
              />
            </div>
          );
        })}
      {rating > 0 && (
        <span className="text-xs w-36">
          {userReviewStarRatings[rating - 1]?.message}
        </span>
      )}
      {rating > 0 && (
        <ReusableButton
          className="text-xs h-8 w-fit"
          name={"Cancel"}
          onClick={() => setRating(0)}
        />
      )}
    </div>
  );
};

export default RatingContainer;
