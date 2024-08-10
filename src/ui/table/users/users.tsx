import {
  Container,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { FC, useState } from "react";
import { useStyles } from "./styles";
import { tableHeadData, tableHeadKeys } from "./consts";
import { Drawer } from "../../index";
import useMediaQuery from "@mui/material/useMediaQuery";

type UserProps = {
  dataList: Post[];
  URL: string;
};

type Post = {
  id: string | number;
  email: string;
  tg_id: string | null;
  name: string;
  password: string | null;
  avatar: string | null;
  created_at: string;
  role: string;
  subscription: Subscription;
};

interface Subscription {
  id: string | number;
  plan_id: string;
  user_id: string;
  tokens: number;
  additional_tokens: number;
  created_at: string;
  plan: Plan;
}

interface Plan {
  id: string | number;
  type: string;
  price: number;
  currency: string;
  tokens: number;
}

type Order = "asc" | "desc";

type OrderBy = keyof Post;

export const Users: FC<UserProps> = ({ dataList, URL }: UserProps) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Post>("email");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postPerPage, setPostPerPage] = useState<number>(10);
  const [drawerActive, setDrawerActive] = useState<boolean>(false);
  const [idForDrawer, setIdForDrawer] = useState<string>("");
  const [emailForDrawer, setEmailForDrawer] = useState<string>("");

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const displayedItems = dataList.slice(firstPostIndex, lastPostIndex);
  const pageQty = Math.ceil(dataList.length / 10);

  const handleRequestSort = (index: number) => {
    const isAsc = order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(tableHeadKeys[index] as OrderBy);
  };

  const getComparator = (order: Order, orderBy: OrderBy) => {
    return order === "desc"
      ? (a: Post, b: Post) => descendingComparator(a, b, orderBy)
      : (a: Post, b: Post) => -descendingComparator(a, b, orderBy);
  };

  function descendingComparator(a: Post, b: Post, orderBy: string) {
    const aValue = getNestedValue(a, orderBy);
    const bValue = getNestedValue(b, orderBy);

    if (bValue < aValue) {
      return -1;
    }
    if (bValue > aValue) {
      return 1;
    }
    return 0;
  }

  const getNestedValue = (obj: any, path: string) => {
    const keys = path.split(".");
    return keys.reduce((value, key) => value && value[key], obj);
  };

  const stableSort = (
    array: Post[],
    comparator: (a: number | Post, b: number | Post) => number
  ) => {
    const stabilizedThis = array.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }

      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const sortedData = stableSort(displayedItems, getComparator(order, orderBy));

  const { classes } = useStyles();

  const handleChange = (__: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const logsForTarget = (data: string) => {
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
        URL={URL}
      />
      <Container className={classes.tableContainer} sx={{}}>
        <Table sx={{ borderRadius: 10 }}>
          <TableHead
            sx={{ backgroundColor: "rgba(14, 12, 21, 1)", display: "flex" }}
          >
            {tableHeadData.map((data: string, index: number) => {
              return (
                <TableRow>
                  <TableCell className={classes.tableCell} variant="head">
                    <TableSortLabel
                      className={classes.sortedTitle}
                      active={
                        orderBy === tableHeadKeys[index] && data !== "Действия"
                      }
                      direction={
                        orderBy === tableHeadKeys[index] ? order : "asc"
                      }
                      onClick={() =>
                        data !== "Действия" && handleRequestSort(index)
                      }
                    >
                      {data}
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableHead>
          <TableBody sx={{ display: "flex", flexDirection: "column" }}>
            {sortedData.map((row) => (
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
        count={pageQty}
      />
    </>
  );
};
