import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addCompanies,
  checkedCompanies,
  checkedCompany,
} from "./companiesSlice";
import type { Company } from "./companiesSlice";
import { companiesMockData } from "./mockData";
import styles from "./Companies.module.css";
import { TData } from "./components/TData";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

export const CompaniesList = () => {
  const dispatch = useAppDispatch();

  const { companiesById, companiesIds } = useAppSelector(
    state => state.companies,
  );

  const columns = useMemo<Array<ColumnDef<Company>>>(
    () => [
      {
        accessorKey: "checked",
        header: () => (
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
        ),
        cell: info => {
          //   console.log(a);

          return (
            <input
              type="checkbox"
              checked={info.getValue<Company["checked"]>()}
              onChange={e => {
                // console.log(e.target.checked);
                // dispatch(
                //   checkedCompany({
                //     id: info.getValue<Company["checked"]>(),
                //     newValue: e.target.checked,
                //   }),
                // );
              }}
            />
          );
        },
        size: 30,
      },
      {
        accessorKey: "name",
        cell: info => info.getValue(),
      },
      {
        accessorFn: row => row.address,
        id: "address",
        cell: info => info.getValue(),
        header: () => <span>Address</span>,
      },
    ],
    [],
  );

  const data = useMemo(() => {
    return companiesIds.map(elm => companiesById[elm]);
  }, [companiesIds, companiesById]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  const { rows } = table.getRowModel();

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 35,
  });

  //   const handleChangeContent = ({
  //     id,
  //     field,
  //     newValue,
  //   }: {
  //     id: string;
  //     field: string;
  //     newValue: string;
  //   }) => {
  //     console.log(id, field, newValue);
  //   };

  //   useEffect(() => {
  //     dispatch(addCompanies(companiesMockData));
  //   }, []);

  useEffect(() => {
    console.log({ companiesById });
  }, [companiesById]);

  const handleScroll = e => {
    console.log(e);
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    console.log(scrollTop, scrollHeight, clientHeight);
  };

  return (
    <div ref={parentRef} style={{ height: "600px", overflow: "auto" }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {virtualizer.getVirtualItems().map((virtualRow, index) => {
              const row = rows[virtualRow.index];
              return (
                <tr
                  key={row.id}
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${
                      virtualRow.start - index * virtualRow.size
                    }px)`,
                  }}
                >
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
