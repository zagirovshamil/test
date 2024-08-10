import "./drawer.scss";
import { useStyles } from "./index";
import CloseIcon from "@mui/icons-material/Close";
import CanvasJSReact from "@canvasjs/react-stockcharts";
import { useState, useEffect } from "react";
import { headerDataForDrawer } from "./consts";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

interface propsForDrawer {
  id: string;
  email: string;
  active: boolean;
  setActive: (active: boolean) => void;
  URL: string;
}

export const Drawer = ({
  id,
  active,
  setActive,
  URL,
  email,
}: propsForDrawer) => {
  const [dataPoints, setDataPoints] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = async (id: string) => {
    const response = await fetch(`${URL}/${id}/transactions`);
    const data = await response.json();

    setData(data);

    setDataPoints(
      data.map((item) => ({ x: new Date(item.created_at), y: item.amount }))
    );
  };

  console.log("data:", data);

  useEffect(() => {
    fetchData(id);
  }, [id]);

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

  const { classes } = useStyles();

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
            <TableHead
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                backgroundColor: "rgba(14, 12, 21, 1)",
              }}
            >
              {headerDataForDrawer.map((data: string) => {
                return (
                  <TableRow>
                    <TableCell
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        color: "rgba(156, 163, 175, 1)",
                      }}
                      variant="head"
                    >
                      {data}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableHead>
            <TableBody
              className={classes.drawerBody}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              {data.map((row) => (
                <TableRow key={`table-${row.id}`}>
                  <TableCell
                    sx={{ color: "rgba(156, 163, 175, 1)", width: "100%" }}
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
                    sx={{ color: "rgba(156, 163, 175, 1)", width: "100%" }}
                    key={`amount-${row.id}`}
                    variant="body"
                  >
                    {row.amount}
                  </TableCell>

                  <TableCell
                    sx={{ color: "rgba(156, 163, 175, 1)", width: "100%" }}
                    key={`tokens-${row.id}`}
                    variant="body"
                  >
                    {new Date(row.created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
      </div>
    </div>
  );
};
