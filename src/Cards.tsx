import { WcsButton, WcsCard, WcsCardBody, WcsCheckbox } from "wcs-react";
import { Task } from "./models/task";
import { WcsCheckboxCustomEvent } from "wcs-core";



interface CardsProps {
  task: Task;
    onDeleteTask: (id: number) => void; 
    onChangingState: (id: number) => void;
}

const Cards: React.FC<CardsProps> = ({ task, onDeleteTask, onChangingState }) => {
const handleCheckboxChange = (e: WcsCheckboxCustomEvent<any>) => {
  onChangingState(task.id);
};
  return (
    <div className="card">
      <WcsCard mode="raised">
        <WcsCardBody>
          <WcsCheckbox checked={task.done} onWcsChange={handleCheckboxChange}>
            {task.title}
          </WcsCheckbox>

          <div>
            <WcsButton
              class="wcs-danger"
              shape="round"
              size="m"
              onClick={() => onDeleteTask(task.id)}
            >
              Supprimer
            </WcsButton>
            <WcsButton class="wcs-warning" shape="round" size="m">
              Modifier
            </WcsButton>
          </div>
        </WcsCardBody>
      </WcsCard>
    </div>
  );
};

export default Cards;
