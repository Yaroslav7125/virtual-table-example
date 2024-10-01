import type { FormEvent } from "react";
import { useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { addCompany } from "../../companiesSlice";
import styles from "./AddCompany.module.css";

export const AddCompany = () => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    // @TODO убрать stat'ы для name и addres - ипользовать formData
    dispatch(
      addCompany({
        id: new Date().toISOString(),
        name,
        address,
        checked: false,
      }),
    );
  };

  return (
    <form
      className={styles.root}
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(e);
      }}
      style={{ display: "flex", gap: "15px" }}
    >
      <input
        value={name}
        name="name"
        type="text"
        placeholder="name"
        onChange={e => setName(e.target.value)}
      />
      <input
        name="address"
        value={address}
        type="text"
        placeholder="address"
        onChange={e => setAddress(e.target.value)}
      />
      <button type="submit"> Create company</button>
    </form>
  );
};
