import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../../store/AuthContext";

type RatingsProps = {
  maxValue: number;
  selectedValue: number;
  averageVote: number;
  onChange: (rate: number) => void;
};

const Ratings = (props: RatingsProps) => {
  const [api, contextHolder] = notification.useNotification();
  const [maximumValueArr, setMaximumValueArr] = useState<number[]>([]);
  const [selectedValue, setSelectedValue] = useState(props.selectedValue);
  const { claims } = useContext(AuthenticationContext);

  const openNotification = (placement: NotificationPlacement) => {
    api.error({
      message: `Error`,
      description: `You have to be authenticated in order to rate`,
      placement,
    });
  };

  const handleClick = (rate: number) => {
    const isUserLoggedIn = claims.length > 0;

    if (!isUserLoggedIn) {
      openNotification("top");
      return;
    }

    setSelectedValue(rate);
    props.onChange(rate);
  };

  const handleMouseOver = (rate: number) => {
    setSelectedValue(rate);
  };

  useEffect(() => {
    setMaximumValueArr(Array(props.maxValue).fill(0));
  }, [props.maxValue]);

  return (
    <div className="mt-2 mb-2">
      {contextHolder}
      <div className="flex flex-row items-center">
        {maximumValueArr.map((_, index) => (
          <FontAwesomeIcon
            icon="star"
            key={index}
            color={`${index + 1 <= selectedValue ? "#FDCC0D" : "black"}`}
            onClick={() => handleClick(index + 1)}
            onMouseLeave={!props.averageVote ? () => setSelectedValue(-1) : undefined}
            onMouseOver={!props.averageVote ? () => handleMouseOver(index + 1) : undefined}
            className={`cursor-pointer`}
          />
        ))}
        <p className="ml-2 mt-[2px] text-xs fontbold">{props.averageVote}</p>
      </div>
    </div>
  );
};

export default Ratings;
