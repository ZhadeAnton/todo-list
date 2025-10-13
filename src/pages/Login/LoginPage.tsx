import type * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Registration from "../../widget/Registration/Registration";
import Autorization from "../../widget/Autorization/Autorization";
import "./styles.css";

export default function LoginPage() {
  const [value, setValue] = useState("1");
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="login">
      <h2>Авторизация</h2>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="box">
            <TabList onChange={handleChange} aria-label="lab API tabs example" className="tab-list">
              <Tab label="Авторизация" value="1" />
              <Tab label="Регистрация" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Autorization />
          </TabPanel>
          <TabPanel value="2">
            <Registration />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
