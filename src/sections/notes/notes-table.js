import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  Modal,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { SeverityPill } from "src/components/severity-pill";
import { app, database, storage, getFileDownloadURL, getFileMetadata } from "../../../firebase";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import Map from "./Map";

const statusMap = {
  0: "info",
  1: "warning",
  2: "success",
};

const states = [
  {
    value: 0,
    label: "جديد",
  },
  {
    value: 1,
    label: "قيد المتابعة",
  },
  {
    value: 2,
    label: "تم إنجازها",
  },
];

export const NotesTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    getAllUsers = () => {},
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState();
  const [attached, setAttached] = useState({});
  const [currentStatus, setCurrentStatus] = useState();

  const handleChange = useCallback(
    async (event) => {
      try {
        setCurrentStatus(event.target.value);

        const docRef = doc(database, "Notes", selectedNote?.id); // Update the path to your collection
        await updateDoc(docRef, { status: parseInt(event.target.value) });

        // Optionally, you can update the local selectedNote's status too
        setSelectedNote((prevNote) => ({
          ...prevNote,
          status: parseInt(event.target.value),
        }));
        getAllUsers();
      } catch (error) {
        console.error(error);
      }
    },
    [selectedNote]
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpenModal = async (note) => {
    setSelectedNote(note);
    setCurrentStatus(note.status);
    if (note.media) {
      const downloadURL = await getFileDownloadURL(`files/${note.media}`);
      const metadata = await getFileMetadata(`files/${note.media}`);
      setAttached({
        url: downloadURL,
        type: metadata.contentType,
      });
    }

    setIsOpen(true);
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>الإسم</TableCell>
                <TableCell>رقم الهوية</TableCell>
                <TableCell>رقم الهاتف</TableCell>
                <TableCell>نوع الملاحظة</TableCell>
                <TableCell>عنوان الملاحظة</TableCell>
                <TableCell>تاريخ الإرسال</TableCell>
                <TableCell>الحالة</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer?.id);

                return (
                  <TableRow hover key={customer?.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer?.id);
                          } else {
                            onDeselectOne?.(customer?.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{customer.userData.Name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer?.userData.ID || "-"}</TableCell>
                    <TableCell>{customer?.userData.Phone}</TableCell>
                    <TableCell>{customer?.type}</TableCell>
                    <TableCell>{customer?.title}</TableCell>
                    <TableCell>{customer?.date}</TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[customer.status]}>
                        {customer.status === 0
                          ? "جديدة"
                          : customer.status === 1
                          ? "قيد المتابعة"
                          : "تم إنجازها"}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      <Button color="primary" onClick={() => handleOpenModal(customer)}>
                        عرض
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>

      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "auto" }}
      >
        <Box
          sx={{ width: "80%", bgcolor: "background.paper", p: 4, m: "3rem auto", borderRadius: 2 }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ borderBottom: 1, borderColor: "#efefef", pb: 3 }}
          >
            <span>عرض الملاحظة </span>
            <SeverityPill color={statusMap[selectedNote?.status]} sx={{ mx: 2 }}>
              {selectedNote?.status === 0
                ? "جديدة"
                : selectedNote?.status === 1
                ? "قيد المتابعة"
                : "تم إنجازه"}
            </SeverityPill>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={3}>
                  <div style={{ fontSize: 14, color: "#417DAB" }}>معلومات المرسل</div>
                  <div
                    style={{
                      background: "#f9f9f9",
                      padding: 15,
                      borderRadius: 10,
                      marginBottom: 10,
                      width: "100%",
                      display: "flex",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        color: "#aaaaaa",
                        fontSize: 13,
                        marginBottom: 10,
                        display: "block",
                      }}
                    >
                      اسم المرسل
                    </div>
                    <div style={{ fontSize: 14 }}>{selectedNote?.userData.Name}</div>
                  </div>
                  <div
                    style={{
                      background: "#f9f9f9",
                      padding: 15,
                      borderRadius: 10,
                      marginBottom: 10,
                      width: "100%",
                      display: "flex",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        color: "#aaaaaa",
                        fontSize: 13,
                        marginBottom: 10,
                        display: "block",
                      }}
                    >
                      رقم الهاتف
                    </div>
                    <div style={{ fontSize: 14 }}>{selectedNote?.userData.Phone}</div>
                  </div>
                  <div
                    style={{
                      background: "#f9f9f9",
                      padding: 15,
                      borderRadius: 10,
                      marginBottom: 10,
                      width: "100%",
                      display: "flex",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        color: "#aaaaaa",
                        fontSize: 13,
                        marginBottom: 10,
                        display: "block",
                      }}
                    >
                      رقم الهوية
                    </div>
                    <div style={{ fontSize: 14 }}>{selectedNote?.userData.ID || "-"}</div>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <TextField
                      fullWidth
                      label="تغيير الحالة"
                      name="state"
                      onChange={handleChange}
                      required
                      select
                      SelectProps={{ native: true }}
                      value={currentStatus}
                    >
                      {states.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </div>
                  <Map
                    address={selectedNote?.locationName}
                    lat={selectedNote?.lat}
                    lng={selectedNote?.lng}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={9}>
                  <div style={{ fontSize: 14, color: "#417DAB" }}>معلومات الملاحظة</div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <div
                      style={{
                        background: "#f9f9f9",
                        padding: 15,
                        borderRadius: 10,
                        marginBottom: 10,
                        width: "100%",
                        display: "flex",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          color: "#aaaaaa",
                          fontSize: 13,
                          marginBottom: 10,
                          display: "block",
                        }}
                      >
                        نوع الملاحظة
                      </div>
                      <div style={{ fontSize: 14 }}>{selectedNote?.type}</div>
                    </div>
                    <div
                      style={{
                        background: "#f9f9f9",
                        padding: 15,
                        borderRadius: 10,
                        marginBottom: 10,
                        width: "100%",
                        display: "flex",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          color: "#aaaaaa",
                          fontSize: 13,
                          marginBottom: 10,
                          display: "block",
                        }}
                      >
                        عنوان الملاحظة
                      </div>
                      <div style={{ fontSize: 14 }}>{selectedNote?.title}</div>
                    </div>
                    <div
                      style={{
                        background: "#f9f9f9",
                        padding: 15,
                        borderRadius: 10,
                        marginBottom: 10,
                        width: "100%",
                        display: "flex",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          color: "#aaaaaa",
                          fontSize: 13,
                          marginBottom: 10,
                          display: "block",
                        }}
                      >
                        العنوان حسب الخريطة
                      </div>
                      <div style={{ fontSize: 14 }}>{selectedNote?.locationName}</div>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "#f9f9f9",
                      padding: 15,
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{ color: "#aaaaaa", fontSize: 13, marginBottom: 10, display: "block" }}
                    >
                      وصف الملاحظة المقدمة
                    </div>
                    <div style={{ fontSize: 14 }}>{selectedNote?.description}</div>
                  </div>
                  <div
                    style={{
                      background: "#f9f9f9",
                      padding: 15,
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{ color: "#aaaaaa", fontSize: 13, marginBottom: 10, display: "block" }}
                    >
                      المرفقات
                    </div>
                    <div style={{ fontSize: 14 }}>
                      {attached?.url && (
                        <>
                          {attached.type.startsWith("image") && (
                            <img src={attached.url} width="100%" />
                          )}
                          {attached.type.startsWith("video") && (
                            <video src={attached.url} height="500" width="100%" controls={true} />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Typography>
        </Box>
      </Modal>

      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 15, 25]}
      />
    </Card>
  );
};

NotesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  getAllUsers: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
