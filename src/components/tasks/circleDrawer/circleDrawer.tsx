import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import Button from "../../shared/button/button";
import Input from "../../shared/input/input";
import { Title, Subtitle, Value } from "../../shared/text/styles";
import { Container, Wrapper } from "../../shared/container/styles";

type CircleProps = {
  id: string;
  x: number;
  y: number;
  diameter: number;
  editing: boolean;
  adjusting: boolean;
};

type FloatingMenuProps = {
  x: number;
  y: number;
  children?: React.ReactNode;
};

interface History {
  past: CircleProps[][];
  present: CircleProps[];
  future: CircleProps[][];
}

// Canvas configuration
const canvasConfig = {
  width: 600,
  height: 400,
  diameter: 30,
  maxDiameter: 120,
};

const Canvas = styled.div`
  width: ${canvasConfig.width}px;
  height: ${canvasConfig.height}px;
  position: relative;
  overflow: hidden;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  width: 100%;
  margin-top: 2.4rem;
`;

const Circle = styled.div<CircleProps>`
  width: ${({ diameter }) => diameter}px;
  height: ${({ diameter }) => diameter}px;
  position: absolute;
  top: ${({ y, diameter }) => y - diameter / 2}px;
  left: ${({ x, diameter }) => x - diameter / 2}px;
  border: 1px solid;
  border-radius: ${({ diameter }) => diameter}px;
  background: ${({ editing }) => (editing ? "#ccc" : "transparent")};
`;

const FloatingMenu = styled.div<FloatingMenuProps>`
  width: 200px;
  height: 120px;
  background: #fff;
  border: 1px solid;
  border-radius: 4px;
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  div {
    font-size: 0.9rem;
  }
  span {
    padding: 0.6rem;
    background: #efefef;
    width: 100%;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
    -webkit-transition: 0.2s color ease;
    transition: 0.2s color ease;
    width: 100%;
    &:hover {
      background: #dcdcdc;
    }
  }
`;

const CircleDrawer = () => {
  useEffect(() => {
    console.log("rendered CircleDrawer");
  });

  const [history, setHistory] = useState<History>({
    past: [],
    present: [],
    future: [],
  });

  const activeCircle = history.present.filter((c) => c.editing);

  const CircleDraw = ({
    id,
    diameter,
    x,
    y,
    editing,
    adjusting,
  }: CircleProps) => {
    return (
      <Circle
        onClick={() => handleCircleClick(id)}
        id={id}
        diameter={diameter}
        x={x}
        y={y}
        editing={editing}
        adjusting={adjusting}
      />
    );
  };

  const isValidCircle = (x: number, y: number) => {
    if (x >= canvasConfig.diameter && y >= canvasConfig.diameter) {
      return true;
    }
    return false;
  };

  const createCircle = (x: number, y: number) => {
    setHistory((currentHistory) => {
      const { past, present } = currentHistory;
      const disabledList = present.map((c) => {
        return { ...c, editing: false };
      });
      const newPresent = disabledList.concat({
        x,
        y,
        id: uuidv4(),
        diameter: canvasConfig.diameter,
        editing: false,
        adjusting: false,
      });
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  };

  const handleCanvasClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      const valid = isValidCircle(x, y);
      if (valid) {
        createCircle(x, y);
      }
    }
  };

  const handleCircleClick = (id: string) => {
    setHistory((currentHistory) => {
      const { past, present, future } = currentHistory;
      const newCircleList = present.map((circle: CircleProps) => {
        const currentlyEditing = circle.editing;
        if (circle.id === id) {
          return { ...circle, editing: !currentlyEditing };
        }
        return {
          ...circle,
          editing: currentlyEditing ? false : circle.editing,
        };
      });
      return {
        past: [...past],
        present: newCircleList,
        future: [...future],
      };
    });
  };

  const handleAdjustClick = (id: string) => {
    setHistory((currentHistory) => {
      const { past, present, future } = currentHistory;
      const newCircleList = present.map((circle: CircleProps) => {
        const currentlyAdjusting = circle.adjusting;
        if (circle.id === id) {
          return { ...circle, adjusting: !currentlyAdjusting };
        }
        return {
          ...circle,
          adjusting: currentlyAdjusting ? false : circle.adjusting,
        };
      });
      return {
        past: [...past],
        present: newCircleList,
        future: [...future],
      };
    });
  };

  const handleSliderChange = (id: string, diameter: number) => {
    setHistory((currentHistory) => {
      const { past, present, future } = currentHistory;
      const newCircleList = present.map((circle: CircleProps) => {
        if (circle.id === id) {
          return { ...circle, diameter: diameter };
        }
        return circle;
      });
      return {
        past: [...past],
        present: newCircleList,
        future: [...future],
      };
    });
  };

  const handleSliderRelease = (id: string) => {
    setHistory((currentHistory) => {
      const { past, present, future } = currentHistory;
      const newCircleList = present.map((circle: CircleProps) => {
        if (circle.id === id) {
          return { ...circle, adjusting: false, editing: false };
        }
        return circle;
      });
      return {
        past: [...past],
        present: newCircleList,
        future: [...future],
      };
    });
  };

  const handleUndo = () => {
    setHistory((currentHistory) => {
      const { past, present, future } = currentHistory;
      if (past && present) {
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        return {
          past: newPast,
          present: previous,
          future: [present, ...future],
        };
      }
      return currentHistory;
    });
  };

  const handleRedo = () => {
    setHistory((currentHistory) => {
      const { past, present, future } = currentHistory;
      if (future && present) {
        const next = future[0];
        const newFuture = future.slice(1);
        return {
          past: [...past, present],
          present: next,
          future: newFuture,
        };
      }
      return currentHistory;
    });
  };

  return (
    <Container>
      <Title>Circle drawer</Title>
      <Subtitle>
        click on the white board to create a circle, click on the circle to
        adjust his diameter
      </Subtitle>
      <Canvas onClick={handleCanvasClick}>
        {history.present.map((circle) => (
          <CircleDraw
            key={circle.id}
            id={circle.id}
            x={circle.x}
            y={circle.y}
            diameter={circle.diameter}
            editing={circle.editing}
            adjusting={circle.adjusting}
          />
        ))}
        {activeCircle.length > 0 && !activeCircle[0].adjusting ? (
          <FloatingMenu
            x={activeCircle.length > 0 ? activeCircle[0].x : 0}
            y={activeCircle.length > 0 ? activeCircle[0].y : 0}
          >
            <span
              onClick={() => {
                handleAdjustClick(activeCircle[0].id);
              }}
            >
              Adjust diameter
            </span>
          </FloatingMenu>
        ) : null}
        {activeCircle.length > 0 && activeCircle[0].adjusting ? (
          <FloatingMenu
            x={activeCircle.length > 0 ? activeCircle[0].x : 0}
            y={activeCircle.length > 0 ? activeCircle[0].y : 0}
          >
            <div>{`Ajust diameter of circle at (${activeCircle[0].x}, ${activeCircle[0].y})`}</div>
            <Input
              value={activeCircle[0].diameter}
              max={canvasConfig.maxDiameter}
              min={0}
              type="range"
              onMouseUp={() => {
                handleSliderRelease(activeCircle[0].id);
              }}
              onChange={(e) => {
                const value = Number(e.target.value);
                handleSliderChange(activeCircle[0].id, value);
              }}
            />
          </FloatingMenu>
        ) : null}
      </Canvas>
      <Wrapper top="medium">
        <Button
          text="Undo"
          type="button"
          disabled={history.past.length <= 0}
          onClick={() => {
            handleUndo();
          }}
          right="small"
        />
        <Button
          text="Redo"
          type="button"
          disabled={history.future.length <= 0}
          onClick={() => {
            handleRedo();
          }}
        />
      </Wrapper>
    </Container>
  );
};

export default CircleDrawer;
