import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  checkedCompanies,
  checkedCompany,
  changeField,
  bulkRemove,
} from "./companiesSlice";
import styles from "./Companies.module.css";
import { TData } from "./components/TData";
import { useVirtualizer } from "@tanstack/react-virtual";
import cn from "classnames";
import { AddCompany } from "./components/AddCompany";

export const CompaniesList = () => {
  const dispatch = useAppDispatch();
  const parentRef = useRef<HTMLDivElement>(null);

  const { companiesById, companiesIds } = useAppSelector(
    state => state.companies,
  );

  const virtualizer = useVirtualizer({
    count: companiesIds.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 35,
  });

  const handleChangeContent = ({
    id,
    field,
    newValue,
  }: {
    id: string;
    field: "name" | "address";
    newValue: string;
  }) => {
    dispatch(changeField({ id, field, newValue }));
  };

  return (
    <div>
      <AddCompany></AddCompany>
      <header>
        <button onClick={() => dispatch(bulkRemove())}>Удалить</button>
      </header>
      <div ref={parentRef} style={{ height: "600px", overflow: "auto" }}>
        <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
          <table className={styles.tableRoot}>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={e =>
                      dispatch(
                        checkedCompanies({
                          ids: companiesIds,
                          newValue: e.target.checked,
                        }),
                      )
                    }
                  />
                </th>
                <th className={styles.theaderName}>Name</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {virtualizer.getVirtualItems().map((virtualRow, index) => {
                const id = companiesIds[virtualRow.index];

                const data = companiesById[id];

                const isSelected = data.checked;
                return (
                  <tr
                    key={id}
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${
                        virtualRow.start - index * virtualRow.size
                      }px)`,
                      ...(isSelected ? { backgroundColor: "lightgray" } : {}),
                    }}
                    className={cn(styles.trow, {
                      trowSelected: isSelected,
                    })}
                  >
                    <td>
                      {
                        <input
                          type="checkbox"
                          checked={data.checked}
                          onChange={e =>
                            dispatch(
                              checkedCompany({
                                id,
                                newValue: e.target.checked,
                              }),
                            )
                          }
                        />
                      }
                    </td>
                    <TData
                      value={data.name}
                      onChange={newValue =>
                        handleChangeContent({ id, newValue, field: "name" })
                      }
                    />
                    <TData
                      value={data.address}
                      onChange={newValue =>
                        handleChangeContent({ id, newValue, field: "address" })
                      }
                    />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
