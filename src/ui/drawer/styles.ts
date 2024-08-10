import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => {
  return {
    drawerContainer: {
      padding: "0px",
      marginTop: "20px",
      width: "100%",
      backgroundColor: "#121825",
      "@media (min-width: 600px)": {
        padding: 0,
      },
      drawerBody: {
        color: "rgba(156, 163, 175, 1)",
        width: "300px",
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "20px",
        textAlign: "center",

        borderBottom: "transparent",
      },
    },
  };
});
