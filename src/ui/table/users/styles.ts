import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => {
  return {
    pagination: {
      marginTop: 20,
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      width: "100%",
      borderRadius: 17,
      color: "white",
      paddingBottom: 45,
      "& .MuiPaginationItem-root": {
        color: "white",
      },
    },

    tableContainer: {
      minWidth: "99%",
      margin: "24px 0px 24px 11px",
      backgroundColor: "#121825",
      alignItems: "center",
    },

    tableCell: {
      color: "rgba(156, 163, 175, 1)",
      width: "300px",
      height: "46px",
      padding: "4px, 20px, 14px, 20px",
      fontSize: "14px",
      fontWeight: "500",
      lineHeight: "20px",
      textAlign: "center",
      borderRadius: "10px",
      borderBottom: "transparent",
    },
    tableBody: {
      width: "300px",
      color: "rgba(156, 163, 175, 1)",
      textAlign: "center",
      borderBottom: "1px solid #313E62",
      backgroundColor: "#121825",
    },

    sortedTitle: {
      color: "rgba(156, 163, 175, 1) !important",
      "& .MuiTableSortLabel-icon": {
        color: "rgba(156, 163, 175, 1) !important",
      },
    },
  };
});
