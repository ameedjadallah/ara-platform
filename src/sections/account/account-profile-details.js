import { useCallback, useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Alert,
  Unstable_Grid2 as Grid,
  SvgIcon,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { collection, addDoc } from "firebase/firestore";
import { app, database } from "../../../firebase";

const states = [
  {
    value: "جنين",
    label: "جنين",
  },
  {
    value: "طوباس",
    label: "طوباس",
  },
  {
    value: "طولكرم",
    label: "طولكرم",
  },
  {
    value: "قلقيلية",
    label: "قلقيلية",
  },
  {
    value: "نابلس",
    label: "نابلس",
  },
  {
    value: "رام الله",
    label: "رام الله",
  },
];

export const AccountProfileDetails = () => {
  const [values, setValues] = useState({
    firstName: "",
    state: "جنين",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  function hasEmptyProperty(obj) {
    for (const key in obj) {
      console.log(key, obj[key]);
      if (!obj[key]) {
        return true;
      }
    }
    return false;
  }

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(false);
    let dataToSend = {
      city: values.state,
      email: values.email,
      name: values.firstName,
      password: values.password,
      phone: values.phone,
    };

    if (hasEmptyProperty(dataToSend)) {
      setError(true);
      setSubmitting(false);
    } else {
      try {
        dataToSend.superuser = false;
        const dbInstance = collection(database, "Municipalities");
        addDoc(dbInstance, dataToSend).then((data) => {
          setSubmitted(true);
          setValues({
            firstName: "",
            state: "جنين",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          });
        });
      } catch (err) {
        setError(true);
        setSubmitting(false);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <form autoComplete="off">
      <Card>
        <CardHeader title="معلومات البلدية" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            {submitted && (
              <Alert severity="success" sx={{ mt: 2 }}>
                تم إضافة البلدية بنجاح
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                الرجاء تعبئة جميع الحقول المطلوبة
              </Alert>
            )}
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText=""
                  label="اسم البلدية"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                  error={submitting && !values.firstName.length}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="المدينة"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                  error={submitting && !values.state.length}
                >
                  {states.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="البريد الإلكتروني الخاص بالبلدية"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                  autoComplete="off"
                  error={submitting && !values.email.length}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="رقم الهاتف"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="كلمة المرور"
                  name="password"
                  onChange={handleChange}
                  required
                  value={values.password}
                  type="password"
                  autoComplete="off"
                  autoSave="off"
                  inputProps={{
                    autocomplete: "password",
                    form: {
                      autocomplete: "off",
                    },
                  }}
                  error={submitting && !values.password.length}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="تأكيد كلمة المرور"
                  name="confirmPassword"
                  onChange={handleChange}
                  required
                  value={values.confirmPassword}
                  type="password"
                  autoComplete="off"
                  inputProps={{
                    autocomplete: "confirmPassword",
                    form: {
                      autocomplete: "off",
                    },
                  }}
                  error={submitting && !values.confirmPassword.length}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleSubmit}>
            إضافة {submitting && <CircularProgress color="inherit" size={13} sx={{ ml: 1 }} />}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
