import {
  WcsButton,
  WcsCard,
  WcsCardBody,
  WcsCheckbox,
  WcsInput,
} from "wcs-react";
import { Task } from "./models/task";
import {
  CheckboxChangeEventDetail,
  WcsCheckboxCustomEvent,
} from "wcs-core";
import { useState, useEffect } from "react";

interface CardsProps {
  task: Task;
  onDeleteTask: (id: number) => void;
  onChangingState: (id: number) => void;
  onChangingTitle: (id: number, title: string) => void;
}

const Cards: React.FC<CardsProps> = ({
  task,
  onDeleteTask,
  onChangingState,
  onChangingTitle,
}) => {
  const [isEditing, setIsEditing] = useState(task.isEditing);
  const [title, setTitle] = useState(task.title);

  useEffect(() => {
    setTitle(task.title);
  }, [task.title]);

  const handleCheckboxChange = (
    e: WcsCheckboxCustomEvent<CheckboxChangeEventDetail>
  ) => {
    onChangingState(task.id);
  };

  const handleSaveTitle = (id: number, title: string) => {
    onChangingTitle(id, title);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="card">
      <WcsCard mode="raised">
        <WcsCardBody>
          {!isEditing ? (
            <>
              <WcsCheckbox
                checked={task.done}
                onWcsChange={handleCheckboxChange}
              >
                {task.title}
              </WcsCheckbox>
              <div>
                <WcsButton
                  className="wcs-danger"
                  shape="round"
                  size="m"
                  onClick={() => onDeleteTask(task.id)}
                >
                  Supprimer
                </WcsButton>
                <WcsButton
                  className="wcs-warning"
                  shape="round"
                  size="m"
                  onClick={handleEditClick}
                >
                  Modifier
                </WcsButton>
              </div>
            </>
          ) : (
            <>
              <WcsInput
                type="text"
                value=""
                placeholder={title}
                onWcsChange={(e) => setTitle(e.target.value as string)}
              />
              <WcsButton
                className="wcs-primary"
                onClick={() => handleSaveTitle(task.id, title)}
              >
                Valider
              </WcsButton>
            </>
          )}
        </WcsCardBody>
      </WcsCard>
    </div>
  );
};

export default Cards;
