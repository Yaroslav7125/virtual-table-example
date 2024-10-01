import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import { companiesMockData } from "./mockData";

export interface Company {
  id: string;
  checked: boolean;
  name: string;
  address: string;
}

interface InitialState {
  companiesById: Record<string, Company>;
  companiesIds: string[];
}

const getData = (data: Company[]) => {
  let newIds: InitialState["companiesIds"] = [];
  const newCompaniesById = data.reduce<InitialState["companiesById"]>(
    (acumm, curr) => {
      newIds.push(curr.id);
      acumm[curr.id] = curr;
      return acumm;
    },
    {},
  );

  return { ids: newIds, newCompaniesById };
};
const temp = getData(companiesMockData);
const initialState: InitialState = {
  companiesById: temp.newCompaniesById,
  companiesIds: temp.ids,
};

export const companiesSlice = createAppSlice({
  name: "companies",
  initialState,
  reducers: {
    addCompanies: (state, { payload }: PayloadAction<Company[]>) => {
      let newIds: InitialState["companiesIds"] = [];
      const newCompaniesById = payload.reduce<InitialState["companiesById"]>(
        (acumm, curr) => {
          newIds.push(curr.id);
          acumm[curr.id] = curr;
          return acumm;
        },
        {},
      );

      state.companiesById = { ...state.companiesById, ...newCompaniesById };
      state.companiesIds = state.companiesIds.concat(newIds);
    },
    checkedCompanies: (
      state,
      { payload }: PayloadAction<{ ids: string[]; newValue: boolean }>,
    ) => {
      const { ids, newValue } = payload;
      console.log(payload);
      ids.forEach(id => (state.companiesById[id].checked = newValue));
      return state;
    },
    checkedCompany: (
      state,
      { payload }: PayloadAction<{ id: string; newValue: boolean }>,
    ) => {
      const { id, newValue } = payload;
      state.companiesById[id].checked = newValue;
    },
    changeField: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: string;
        field: keyof Omit<Company, "id" | "checked">;
        newValue: string;
      }>,
    ) => {
      const { id, field, newValue } = payload;
      state.companiesById[id][field] = newValue;
    },
  },
});

export const { addCompanies, checkedCompanies, checkedCompany, changeField } =
  companiesSlice.actions;
