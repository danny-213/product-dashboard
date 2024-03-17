import React from "react";
import "./App.css";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
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
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { ColorModeContext, tokens } from "./theme";
import UploadForm from "./UploadForm";

const Product = ({ products }) => {
  console.log(products);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const colorMode = useContext(ColorModeContext);

  //   property of a row to display on the detail card
  const [selectedBrand, setSelectedBrand] = useState("default");
  const [selectedDescription, setSelectedDescription] = useState(
    products[0].fullDesc
  );
  const [selectedDimension, setSelectedDimension] = useState(
    products[0].fullDim
  );
  const [selectedmoMarking, setSelectedmoMarking] = useState(
    products[0].moMarking
  );

  const [selectedrunflat, setSelectedrunflat] = useState(products[0].runflat);
  const [selectedimgUrl, setSelectedimgUrl] = useState(products[0].imgUrl);
  const [selectedLogo, setSelectedLogo] = useState(products[0].logo);

  //   Get row id of selected row from the table
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleSelectedRow = (selection) => {
    // set the updated row id manually instead of waiting for useState, because it wont update on the 1st click
    // due to useState async feature
    const newSelectedRowId = selection.length > 0 ? selection[0] : null;
    setSelectedRowId(newSelectedRowId);

    // Perform operations that rely on the updated state
    if (newSelectedRowId !== null) {
      const selectedRowObject = products.find(
        (item) => item.id === newSelectedRowId
      );
      setSelectedDescription(selectedRowObject.fullDesc);
      setSelectedDimension(selectedRowObject.fullDim);
      setSelectedimgUrl(selectedRowObject.imgUrl);
      setSelectedrunflat(selectedRowObject.runflat);
      setSelectedmoMarking(selectedRowObject.moMarking);
      setSelectedLogo(selectedRowObject.logo);
    } else {
      // Clear any selected description or dimension if no row is selected
      setSelectedDescription("");
      setSelectedDimension("");
    }
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "fullDesc", headerName: "Full Description" },
    { field: "fullDim", headerName: "Dimension" },
    { field: "rrp", headerName: "Retail Price (excl. VAT)" },
  ];
  return (
    <>
      {/* // TOPBAR //*/}
      <Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
        <Header
          title="Product Catalogue"
          subtitle="MB product in Vietnam"
          padding="5rem"
        />
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          height={50}
        >
          <InputBase sx={{ ml: 2 }} placeholder="search FIN"></InputBase>
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
      </Box>
      {/* UPLOAD SPACE */}
      <UploadForm />

      <Grid container spacing={2}>
        {/* PRODUCT LIST */}
        <Grid item xs={8}>
          <Card variant="outlined">
            <DataGrid
              rows={products.filter(
                (product) =>
                  selectedBrand === "default" || product.brand === selectedBrand
              )}
              columns={columns}
              checkboxSelection={false} // Disable checkbox selection for single selection mode
              rowSelectionModel={selectedRowId ? [selectedRowId] : []}
              onRowSelectionModelChange={handleSelectedRow}
            ></DataGrid>
          </Card>
        </Grid>
        {/* PRODUCT DETAILS */}
        <Grid item xs={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {selectedDescription}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {selectedDimension}
              </Typography>

              <Grid container spacing={2}>
                {/* TIRE PHOTO */}
                <Grid item xs={8}>
                  <img
                    src={selectedimgUrl}
                    alt="selected product photo png"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </Grid>
                {/* FLAG & LOGO */}
                <Grid item xs={4}>
                  <Box>
                    <img
                      src={selectedLogo}
                      alt="logo-brand"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}></Grid>
                    <Card
                      variant="elevation"
                      style={{
                        width: "100%",
                        height: "35px",
                        padding: "0",
                        lineHeight: "10px",
                      }}
                    >
                      <CardContent>{selectedmoMarking}</CardContent>
                    </Card>
                    <Card
                      variant="elevation"
                      style={{
                        width: "100%",
                        height: "35px",
                        padding: "0",
                        lineHeight: "10px",
                      }}
                    >
                      <CardContent>{selectedrunflat}</CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default Product;
