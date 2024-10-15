// Proper Working Start

import React, { useEffect, useState } from "react";
import "./Home.css";
import Button from "../../components/common_components/Button";
import Elevator from "../../components/common_components/Elevator/Elevator";

const Home = () => {
  const [currentSelectedFloors, setCurrentSelectedFloors] = useState([]);
  const [elevators, setElevators] = useState(
    Array.from({ length: 5 }, (_, index) => ({
      position: 0,
      busyTime: 0,
      busy: false,
      elevatorId: index + 1,
      isMoving: false,
      hasArrived: false,
      ClickBtn: "",
      buttonColor: "green",
      buttonText: "Call",
    }))
  );
  const [floorWaitinglist, setFloorWaitinglist] = useState([]);

  const ButtonColor_Text = elevators.map((elevator) => ({
    ClickBtn: elevator.ClickBtn,
    ButtonColor: elevator.buttonColor,
    ButtonText: elevator.buttonText,
  }));

  console.log("Button Handler ==> ", ButtonColor_Text);

  console.log("Elevator Movement Details ==> ", elevators);

  const handleFloorSelection = (floor) => {
    setFloorWaitinglist((selectedFloors) => {
      const newFloors = Array.isArray(floor) ? floor : [floor];
      return [...new Set([...selectedFloors, ...newFloors])];
    });
  };

  useEffect(() => {
    if (floorWaitinglist.length === 0) return;

    const currentWorkingFloor = floorWaitinglist[0];
    setCurrentSelectedFloors([currentWorkingFloor]);

    const newPosition = Number(currentWorkingFloor.slice(1)) || 0;
    const availableElevators = elevators.filter((elevator) => !elevator.busy);

    if (availableElevators.length === 0) {
      console.log("No free elevators, please wait!");
      return;
    }

    const elevatorDistances = availableElevators.map((elevator) => ({
      ElevatorID: elevator.elevatorId,
      distance: Math.abs(elevator.position - newPosition),
    }));

    const closestElevator = elevatorDistances.reduce(
      (lastPosition, currentPosition) =>
        lastPosition.distance < currentPosition.distance
          ? lastPosition
          : currentPosition
    );

    const elevatorId = closestElevator.ElevatorID - 1;

    setElevators((prevElevators) => {
      const newElevators = [...prevElevators];
      const busyTimePerFloor = 3000;
      newElevators[elevatorId].ClickBtn = `f${newPosition}`;
      newElevators[elevatorId].buttonColor = `red`;
      newElevators[elevatorId].buttonText = `Waiting`;
      newElevators[elevatorId].busy = true;
      newElevators[elevatorId].isMoving = true;
      newElevators[elevatorId].hasArrived = false;

      // Simulate the elevator movement
      const moveElevator = (startPosition, destinationPosition) => {
        const distance = startPosition < destinationPosition ? 1 : -1;
        const floorsToMove = Array.from(
          { length: Math.abs(startPosition - destinationPosition) },
          (_, index) => startPosition + distance * (index + 1)
        );

        floorsToMove.forEach((floor, distance) => {
          setTimeout(() => {
            newElevators[elevatorId].position = floor;
            newElevators[elevatorId].busyTime =
              (floorsToMove.length - distance) * busyTimePerFloor;
            setElevators([...newElevators]);
          }, distance * busyTimePerFloor);
        });

        setTimeout(() => {
          newElevators[elevatorId].busy = false;
          newElevators[elevatorId].busyTime = 0;
          newElevators[elevatorId].isMoving = false;
          newElevators[elevatorId].ClickBtn = `f${newPosition}`;
          newElevators[elevatorId].buttonColor = `green`;
          newElevators[elevatorId].buttonText = `Arrived`;
          newElevators[elevatorId].hasArrived = true;
          newElevators[elevatorId].position = newPosition;

          setElevators([...newElevators]);
          console.log(
            `Elevator ${elevatorId + 1} reached floor ${newPosition}.`
          );
        }, busyTimePerFloor * floorsToMove.length);
      };

      moveElevator(newElevators[elevatorId].position, newPosition);
      return newElevators;
    });

    setFloorWaitinglist((prev) => prev.slice(1));
  }, [floorWaitinglist, elevators]);

  const floorLabels = [
    "9th Floor",
    "8th Floor",
    "7th Floor",
    "6th Floor",
    "5th Floor",
    "4th Floor",
    "3rd Floor",
    "2nd Floor",
    "1st Floor",
    "Ground Floor",
  ];

  return (
    <div className="main-container">
      <div className="all-contain">
        <div className="main-label">
          <h3>Elevator Exercise</h3>
        </div>
        <div className="elevator-contain">
          <div className="floor-grp">
            {floorLabels.map((label, index) => (
              <p key={index}>{label}</p>
            ))}
          </div>

          <div className="elevator-grp">
            {elevators.map((elevator) => (
              <Elevator
                key={elevator.elevatorId}
                className={
                  elevator.elevatorId === 1
                    ? "first-elv"
                    : elevator.elevatorId === 5
                    ? "last-elv"
                    : ""
                }
                elevatorId={elevator.elevatorId}
                currentFloor={`f${elevator.position}`}
                isMoving={elevator.isMoving}
                hasArrived={elevator.hasArrived}
                btncolor={elevator.btnColor}
              />
            ))}
          </div>

          <div className="button-grp">
            {Array.from({ length: 10 }, (_, index) => {
              const floorId = `f${9 - index}`;
              const buttonProperty =
                ButtonColor_Text.find(
                  (elevator) => elevator.ClickBtn === floorId
                ) || {};

              console.log("Button Property :==> ", buttonProperty);

              return (
                <div key={index} className="button-container">
                  <Button
                    // className="call-button"
                    className={
                      buttonProperty.ButtonColor === "red"
                        ? "waiting-button"
                        : "call-button"
                    }
                    // style={buttonStyle}
                    onClick={() => handleFloorSelection(floorId)}
                    id={floorId}
                  >
                    {buttonProperty.ButtonText || "Call"}
                    {""}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// Proper Working End
