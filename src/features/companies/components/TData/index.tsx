import { useRef, useState } from "react";
import type { FC } from "react";
import styles from "./TData.module.css";
import cn from "classnames";

interface TDataProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const TData: FC<TDataProps> = ({ onChange, value, className }) => {
  const [isEdit, setIsEdit] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [innerValue, setInnerValue] = useState<string>(value);

  return (
    <td
      onClick={() => {
        setTimeout(() => ref?.current?.focus(), 0);
        setIsEdit(true);

        console.log("asdasd");
      }}
      className={cn(styles.root, className)}
    >
      {isEdit ? (
        <input
          type="text"
          defaultValue={value}
          onChange={e => setInnerValue(e.target.value)}
          ref={ref}
          onBlur={() => {
            setIsEdit(false);
            onChange(innerValue);
            console.log("input blur");
          }}
          onFocus={() => console.log("input focus")}
        />
      ) : (
        <div>{value}</div>
      )}
    </td>
  );
};
