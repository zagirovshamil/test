import {
  Container,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, useState } from "react";
import { useStyles, tableHeadData, Order, Props, User } from "./index";

import { useQuery } from "@tanstack/react-query";
import { getUsersList } from "../../api/index";
import { Drawer } from "../drawer";

export const Users: FC<Props> = ({ searchQuery }: Props) => {
  const [drawerActive, setDrawerActive] = useState<boolean>(false);
  const [idForDrawer, setIdForDrawer] = useState<string>("");
  const [emailForDrawer, setEmailForDrawer] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<Order>("tokens%3Aasc");

  const { isLoading, error, data } = useQuery({
    queryKey: ["queryKey", currentPage, searchQuery, orderBy],
    queryFn: () => getUsersList(currentPage, searchQuery, orderBy),
  });

  const { classes } = useStyles();

  if (isLoading) return <div>...loading</div>;

  if (error) return <div>Please reload the page!</div>;

  const listForPagination = data.pages;
  const listWithUser = data.data;
  console.log("listWithUser:", listWithUser);

  const handleChange = (__: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const logsForTarget = (data: { id: string; email: string }) => {
    setIdForDrawer(data.id);
    setEmailForDrawer(data.email);
  };

  return (
    <>
      <Drawer
        email={emailForDrawer}
        id={idForDrawer}
        active={drawerActive}
        setActive={setDrawerActive}
      />
      <Container className={classes.tableContainer}>
        <Table>
          <TableHead
            sx={{
              backgroundColor: "rgba(14, 12, 21, 1)",
              display: "flex",
              borderRadius: "10px 10px 0 0",
            }}
          >
            {tableHeadData.map(
              (data: { name: string; id: number | string }) => {
                return (
                  <TableRow>
                    <TableCell
                      style={{
                        cursor: data.name === "Токены" ? "pointer" : "default",
                      }}
                      className={classes.tableCell}
                      variant="head"
                      id={data.id.toString()}
                      onClick={() =>
                        data.name === "Токены" &&
                        setOrderBy((prevOrderBy) =>
                          prevOrderBy === "tokens%3Aasc"
                            ? "tokens%3Adesc"
                            : "tokens%3Aasc"
                        )
                      }
                    >
                      {data.name}
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableHead>
          <TableBody sx={{ display: "flex", flexDirection: "column" }}>
            {listWithUser.map((row: User) => (
              <TableRow
                key={`table-${row.id}`}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  logsForTarget(row);
                  setDrawerActive(true);
                }}
              >
                <TableCell
                  className={classes.tableBody}
                  key={`email-${row.id}`}
                  variant="body"
                >
                  {row.email}
                </TableCell>

                <TableCell
                  className={classes.tableBody}
                  key={`name-${row.id}`}
                  variant="body"
                >
                  {row.name}
                </TableCell>

                <TableCell
                  className={classes.tableBody}
                  key={`role-${row.id}`}
                  variant="body"
                >
                  {row.role}
                </TableCell>

                <TableCell
                  className={classes.tableBody}
                  key={`subscription-${row.id}`}
                  variant="body"
                >
                  {row.subscription.plan.type}
                </TableCell>

                <TableCell
                  className={classes.tableBody}
                  key={`tokens-${row.id}`}
                  variant="body"
                >
                  {row.subscription.tokens} TKN
                </TableCell>

                <TableCell
                  className={classes.tableBody}
                  key={`action-${row.id}`}
                  variant="body"
                ></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>

      <Pagination
        className={classes.pagination}
        color="primary"
        shape="rounded"
        onChange={handleChange}
        count={listForPagination}
        page={currentPage}
      />
    </>
  );
};
