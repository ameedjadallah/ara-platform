import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { NotesTable } from "src/sections/notes/notes-table";
import { NotesSearch } from "src/sections/notes/notes-search";
import { applyPagination } from "src/utils/apply-pagination";

import { app, database } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";

const useNotes = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};

const useNoteIds = (notes) => {
  return useMemo(() => {
    return notes.map((note) => note?.id);
  }, [notes]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const notes = useNotes(data, page, rowsPerPage);
  const notesIds = useNoteIds(notes);
  const notesSelection = useSelection(notesIds);
  const { user } = useAuth();

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const getAllUsers = async () => {
    try {
      const notesCollection = collection(database, "Notes");

      const notesQuerySnapshot =
        window?.sessionStorage.getItem("ara_superuser") === "true"
          ? await getDocs(query(notesCollection, orderBy("timestamp", "desc")))
          : await getDocs(
              query(
                notesCollection,
                where("municipality", "==", window?.sessionStorage.getItem("ara_userId")),
                orderBy("timestamp", "desc")
              )
            );

      const promises = [];

      notesQuerySnapshot.forEach((noteDoc) => {
        const userUID = noteDoc.data().userUID;

        const usersCollection = collection(database, "Users");
        const userDocRef = doc(usersCollection, userUID);

        const userSnapshotPromise = getDoc(userDocRef).then((userSnapshot) => {
          if (userSnapshot.exists()) {
            return { ...noteDoc.data(), id: noteDoc.id, userData: userSnapshot.data() };
          } else {
            return null; // User does not exist
          }
        });

        promises.push(userSnapshotPromise);
      });

      Promise.all(promises)
        .then((notes) => {
          // Remove null values (notes without existing user)
          const filteredNotes = notes.filter((note) => note !== null);

          setData(filteredNotes);
        })
        .catch((error) => {
          console.error("Error fetching notes and user data:", error);
        });

      // Replace "dateField" with the actual field name you want to order by
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  useEffect(() => {
    getAllUsers();

    const notesCollection = collection(database, "Notes");

    // Listen to future changes in the Notes collection
    onSnapshot(notesCollection, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        getAllUsers();
      });
    });
  }, []);

  return (
    <>
      <Head>
        <title>المستخدمون | ARA</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1} sx={{ mb: 2 }}>
                <Typography variant="h5">الإقتراحات والشكاوي</Typography>
              </Stack>
            </Stack>
            <NotesTable
              count={data.length}
              items={notes}
              onDeselectAll={notesSelection.handleDeselectAll}
              onDeselectOne={notesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={notesSelection.handleSelectAll}
              onSelectOne={notesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={notesSelection.selected}
              getAllUsers={getAllUsers}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
