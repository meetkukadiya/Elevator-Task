import React from "react";
import "./Elevator.css";
import PropTypes from "prop-types";
import Elevator_Logo from "../../../assets/Elevator_Logo";

const Elevator = ({
  className,
  elevatorId,
  currentFloor,
  isMoving,
  hasArrived,
}) => {
  const getColor = () => {
    if (isMoving) return "#f29294";
    if (hasArrived) return "#97deb4";
    return "#000000";
  };

  const CURRENT_PUSH = (
    <Elevator_Logo color={getColor()} className="elevator-logo" />
  );

  return (
    <div className={className} id={elevatorId}>
      {Array.from({ length: 10 }, (_, index) => {
        const floorNumber = 9 - index;
        const floorId = `f${floorNumber}`;
        return (
          <div
            className="elevator-floor"
            id={`e${elevatorId}_${floorId}`}
            key={floorId}
          >
            {currentFloor === floorId && CURRENT_PUSH}
          </div>
        );
      })}
    </div>
  );
};

Elevator.propTypes = {
  className: PropTypes.string.isRequired,
  elevatorId: PropTypes.number.isRequired,
  currentFloor: PropTypes.string.isRequired,
  isMoving: PropTypes.bool.isRequired,
  hasArrived: PropTypes.bool.isRequired,
};

export default Elevator;
