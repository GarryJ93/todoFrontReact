import {
  WcsButton,
  WcsCard,
  WcsCardBody,
  WcsCheckbox,
  WcsInput,
  WcsMatIcon,
  WcsProgressRadial,
} from "wcs-react";
import { Task } from "../models/task";
import { useState, useEffect } from "react";
import titleCase from "../hooks/titleCase";
import './cards.css'

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

  const handleSaveTitle = (id: number, title: string) => {
    onChangingTitle(id, title);
    setIsEditing(false);
  };

  return (
    <div className="card">
      <WcsCard mode="raised">
        <WcsCardBody>
          {!isEditing ? (
            <div>
              {task.done ? (
                <WcsMatIcon
                  size="m"
                  icon="done_all"
                  family="outlined"
                ></WcsMatIcon>
              ) : (
                <WcsMatIcon
                  size="m"
                  icon="assignment_late"
                  family="outlined"
                ></WcsMatIcon>
              )}

              <div className="flex-card">
                <WcsCheckbox
                  checked={task.done}
                  onWcsChange={() => onChangingState(task.id)}
                >
                  {titleCase(task.title)}
                </WcsCheckbox>
                <div className="progress">
                  <WcsProgressRadial
                    size={40}
                    value={task.done ? 100 : 0}
                  ></WcsProgressRadial>
                </div>
              </div>
              <div className="action-btn">
                <WcsButton
                  className="wcs-danger"
                  size="m"
                  onClick={() => onDeleteTask(task.id)}
                >
                  Supprimer
                </WcsButton>
                <WcsButton
                  className="wcs-warning"
                  size="m"
                  onClick={() => setIsEditing(true)}
                >
                  Modifier
                </WcsButton>
              </div>
            </div>
          ) : (
            <>
              <WcsInput
                type="text"
                value=""
                id="input"
                prefix-label="
                Nouveau titre : "
                placeholder={title}
                onWcsChange={(e) => setTitle(e.target.value as string)}
              />
              <WcsButton
                className="wcs-primary"
                onClick={() => handleSaveTitle(task.id, title)}
              >
                Valider
              </WcsButton>
              <WcsButton class="wcs-danger" onClick={() => setIsEditing(false)}>
                Annuler
              </WcsButton>
            </>
          )}
        </WcsCardBody>
      </WcsCard>
    </div>
  );
};

export default Cards;
