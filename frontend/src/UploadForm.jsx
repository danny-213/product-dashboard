import React, { useState } from "react";
import { Button, TextField, FormControl, Grid } from "@mui/material";

const UploadForm = ({}) => {
  const [id, setPartNumber] = useState("");
  const [fullDesc, setDesc] = useState("");
  const [fullDim, setDim] = useState("");
  const [rrp, setRrp] = useState("");
  const [moMarking, setmoMarking] = useState("");
  const [runflat, setRunflat] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [logo, setLogo] = useState("");
  const [brand, setBrand] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id,
      fullDesc,
      fullDim,
      rrp,
      moMarking,
      runflat,
      imgUrl,
      logo,
      brand,
    };

    const url = "http://127.0.0.1:5000/upload_product";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    console.log("sending the request:", url, options);
    const request = await fetch(url, options);
    if (request.status !== 201 && request.status !== 200) {
      const data = request.json();
      alert(data.message);
    } else {
      console.log("Failed");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <p>
        *Note: Input record and press submit to upload new data into the
        dashboard, then hit refresh to view updated version This is an
        educational project and does not have correct data
      </p>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              name="id"
              label="Part Number"
              value={id}
              onChange={(e) => setPartNumber(e.target.value)}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              name="fullDesc"
              label="Full Description"
              value={fullDesc}
              onChange={(e) => setDesc(e.target.value)}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              name="fullDim"
              label="Full Dimension"
              value={fullDim}
              onChange={(e) => setDim(e.target.value)}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              name="rrp"
              label="Price"
              type="number"
              value={rrp}
              onChange={(e) => setRrp(e.target.value)}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              name="moMarking"
              label="moMarking"
              value={moMarking}
              onChange={(e) => setmoMarking(e.target.value)}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              name="runflat"
              label="runflat"
              value={runflat}
              onChange={(e) => setRunflat(e.target.value)}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              name="imgUrl"
              label="Product Image Url"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              name="logo"
              label="Brand Logo Url"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              name="brand"
              label="Brand Name"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UploadForm;
