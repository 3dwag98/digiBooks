import {BsStarFill} from "react-icons/bs";

import { Stack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";


const Rating = React.forwardRef(
  ({ size, icon, scale, fillColor, strokeColor,rate,setRating,onChange }, ref) => {
    const [rating, setRate] = useState(rate);
    const buttons = [];

    const onClick = idx => {
      if (!isNaN(idx)) {
        // allow user to click first icon and set rating to zero if rating is already 1
        if (rating === 1 && idx === 1) {
          setRating(0);
          setRate(0);
        } else {
          setRating(idx);
          setRate(idx);
        }
      }
    };

    const RatingIcon = ({ fill }) => {
      return (
        <BsStarFill
       //   name={icon}
          size={`${size}px`}
          color={fillColor}
          strokeOpacity={!fill ? "100%" : "0"}
          strokeWidth={0.7}
          stroke={strokeColor}
          onClick={onClick}
          fillOpacity={fill ? "100%" : "0"}
        />
      );
    };

    const RatingButton = ({ idx, fill }) => {
      return (
        <Box
          as="button"
          aria-label={`Rate ${idx}`}
          height={`${size}px`}
          width={`${size}px`}
          variant="unstyled"
          mx={1}
          onClick={() => onClick(idx)}
          _focus={{ outline: 0 }}
        >
          <RatingIcon fill={fill} />
        </Box>
      );
    };

    for (let i = 1; i <= scale; i++) {
      buttons.push(<RatingButton key={i} idx={i} fill={i <= rating} />);
    }

    return (
      <Stack isInline mt={2} justify="center">
        <input name="rating" type="hidden" value={rating} ref={ref} onChange={onChange}/>
        {buttons}
      </Stack>
    );
  }
);

Rating.displayName = "Rating";

export default Rating;
