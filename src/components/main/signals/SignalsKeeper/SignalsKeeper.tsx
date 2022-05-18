import cn from "classnames";
import { SignalEditor } from "components/main/signals/SignalEditor/SignalEditor";
import { SignalsTable } from "components/main/signals/SignalsTable/SignalsTable";
import { ReparoButton } from "components/shared/ReparoButton/ReparoButton";
import { defaultSignalModel, SignalModel } from "domain/SignalModel";
import React from "react";
import { guid } from "utils/guidUtils";
import styles from "./SignalsKeeper.scss";

interface Props {
  readonly className?: string;
  readonly items: ReadonlyArray<SignalModel>;
  readonly onChange: (items: SignalModel[]) => void;
}

export const SignalsKeeper: React.FC<Props> = ({
  className,
  items,
  onChange,
}) => {
  const [draft, setDraft] = React.useState(defaultSignalModel);
  const [selected, setSelected] = React.useState<SignalModel>();
  const onChangeDraft = (changes: Partial<SignalModel>) => {
    setDraft({ ...draft, ...changes });
  };

  const onAddClick = () => {
    onChange([...items, { ...draft, id: guid() }]);
  };

  const onApplyClick = () => {
    if (selected) {
      const newItems = [...items];
      const index = newItems.findIndex((x) => x.id === selected.id);
      newItems[index] = { ...draft, id: newItems[index].id };
      onChange(newItems);
    }
  };

  const onRemoveClick = () => {
    if (selected) {
      onChange(items.filter((x) => x.id !== selected.id));
    }
  };

  const onClearClick = () => {
    onChange([]);
  };

  return (
    <div className={cn(styles.root, className)}>
      <SignalEditor value={draft} onChange={onChangeDraft} />

      <div className={styles.buttons}>
        <ReparoButton onClick={onAddClick}>Добавить</ReparoButton>
        <ReparoButton onClick={onApplyClick}>Применить</ReparoButton>
        <ReparoButton onClick={onRemoveClick}>Удалить</ReparoButton>
        <ReparoButton onClick={onClearClick}>Очистить</ReparoButton>
      </div>

      <SignalsTable
        items={items}
        selectedItem={selected}
        onSelectItem={setSelected}
      />
    </div>
  );
};
