import {
  Box,
  IconButton,
  Input,
  colors,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useContext, useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { ColorModeContext, tokens } from "./theme";

const Topbar = ({ products }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [selectedBrand, setSelectedBrand] = useState("default");

  return (
    // TOPBAR
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="search FIN"></InputBase>
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      {/* FILTER BRAND */}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="product-label">Brand</InputLabel>
        <Select
          labelId="product-brand"
          id="brand-select"
          label="Brand"
          onChange={(e) => {
            setSelectedBrand(e.target.value);
          }}
          defaultValue="default"
        >
          <MenuItem value="default">All</MenuItem>
          {products.map((product) => (
            <MenuItem key={product.brand} value={product.brand}>
              {product.brand}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      Topbar
    </Box>
  );
};

export default Topbar;
