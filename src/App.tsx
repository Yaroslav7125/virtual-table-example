import { useEffect } from "react";
import "./App.css";
import { Counter } from "./features/counter/Counter";
import { Quotes } from "./features/quotes/Quotes";
import logo from "./logo.svg";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { addCompanies } from "./features/companies/companiesSlice";
import { companiesMockData } from "./features/companies/mockData";
import { CompaniesList } from "./features/companies/CompaniesList";

const App = () => {
  return (
    <div className="App">
      <CompaniesList />
    </div>
  );
};

export default App;
