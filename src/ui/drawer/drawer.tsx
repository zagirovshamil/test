import "./drawer.scss";
import { useStyles } from "./index";
import CloseIcon from "@mui/icons-material/Close";
import CanvasJSReact from "@canvasjs/react-stockcharts";
import { useEffect, useState } from "react";
import { headerDataForDrawer } from "./drawer.consts";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { getPersonInfo } from "../../api/index";

interface propsForDrawer {
  id: string;
  email: string;
  active: boolean;
  setActive: (active: boolean) => void;
  URL: string;
}

export const Drawer = ({ id, active, setActive, email }: propsForDrawer) => {
  const { classes } = useStyles();

  const [dataPoints, setDataPoints] = useState<any[]>([]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["transactionsKey", id],
    queryFn: () => getPersonInfo(id),
  });

  console.log("data", data);

  useEffect(() => {
    if (data) {
      setDataPoints(
        data.map((item) => ({
          x: new Date(item.created_at),
          y: item.amount,
        }))
      );
    }
  }, [data]);

  if (isLoading) return <div></div>;

  if (error) return <div></div>;

  const CanvasJS = CanvasJSReact.CanvasJS;
  const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

  const options = {
    title: {
      text: "",
    },
    charts: [
      {
        data: [
          {
            type: "line",
            dataPoints: dataPoints,
          },
        ],
      },
    ],
    navigator: {
      slider: {
        maximum: new Date("2024-1-1"),
        minimum: new Date("2024-12-12"),
      },
    },
  };

  const containerProps = {
    width: "371px",
    height: "255px",
    margin: "20px 0 0 0",
  };

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <CloseIcon
        className="modal__button__changeState"
        onClick={() => setActive(false)}
        sx={{ cursor: "pointer" }}
      />

      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="modal__email">{email}</p>

        <p className="modal__tokens">Использование токенов</p>

        <CanvasJSStockChart
          className="modal__chart_main"
          options={options}
          containerProps={containerProps}
        />

        <p className="modal__history">История операций</p>
        <Container className={classes.drawerContainer}>
          <Table>
            <TableHead className={classes.drawerTableHead}>
              {headerDataForDrawer.map((data: string) => {
                return (
                  <TableRow>
                    <TableCell
                      id={data.id}
                      className={classes.drawerHeaderTableCell}
                      variant="head"
                      sx={{ color: "rgba(156, 163, 175, 1)", borderBottom: 0 }}
                    >
                      {data.name}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableHead>
            {data.slice(0, 5).map((row: any) => (
              <TableBody className={classes.drawerTableBody}>
                <TableRow
                  sx={{
                    width: "425px",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "",
                  }}
                  className={classes.drawerBody}
                  key={`table-${row.id}`}
                >
                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "rgba(156, 163, 175, 1)",
                      borderBottom: 0,
                      width: "141.67px",
                    }}
                    key={`type-${row.id}`}
                    variant="body"
                  >
                    {row.type === "WRITE_OFF"
                      ? "Пополнение"
                      : row.type === "REPLENISH"
                      ? "Списание"
                      : ""}
                  </TableCell>

                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: 0,
                      width: "141.67px",
                      color:
                        row.type === "WRITE_OFF"
                          ? "green"
                          : row.type === "REPLENISH"
                          ? "red"
                          : "inherit",
                    }}
                    key={`amount-${row.id}`}
                    variant="body"
                  >
                    {row.type === "WRITE_OFF"
                      ? `+ ${row.amount} BTKN`
                      : row.type === "REPLENISH"
                      ? `- ${row.amount} BTKN`
                      : ""}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(156, 163, 175, 1)",
                      borderBottom: 0,
                      width: "141.67px",
                    }}
                    key={`tokens-${row.id}`}
                    variant="body"
                  >
                    {new Date(row.created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </Container>
      </div>
    </div>
  );
};
