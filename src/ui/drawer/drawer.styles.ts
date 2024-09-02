import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => {
  return {
    drawerContainer: {
      display: "flex",
      marginTop: "20px",
      width: "100%",
      backgroundColor: "#121825",
      "@media (min-width: 600px)": {
        padding: 0,
      },
    },
    drawerTableHead: {
      padding: 0,
      height: "46px",
      borderRadius: "8px 8px 0 0 ",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      backgroundColor: "rgba(14, 12, 21, 1)",
    },

    drawerTableCell: {
      padding: 0,
      borderBottom: "0px",
      display: "flex",
      justifyContent: "center",
      color: "rgba(156, 163, 175, 1)",
    },

    drawerTableBody: {
      padding: 0,
      border: 0,
      display: "flex",
      flexDirection: "column",
    },

    drawerBody: {
      padding: 0,
      display: "flex",
      borderBottom: "1px solid rgba(34, 43, 68, 1)",
      fontSize: "14px",
      fontWeight: "500",
      lineHeight: "20px",
      textAlign: "center",
    },
  };
});
