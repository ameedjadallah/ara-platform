import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { NotesTable } from 'src/sections/notes/notes-table';
import { NotesSearch } from 'src/sections/notes/notes-search';
import { applyPagination } from 'src/utils/apply-pagination';

import { app, database } from '../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const now = new Date();


const useNotes = (data,page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data,page, rowsPerPage]
  );
};

const useNoteIds = (notes) => {
  return useMemo(
    () => {
      return notes.map((note) => note.id);
    },
    [notes]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([])
  const notes = useNotes(data,page, rowsPerPage);
  const notesIds = useNoteIds(notes);
  const notesSelection = useSelection(notesIds);


  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const getAllUsers = () => {
    const dbInstance = collection(database, 'Users');
    getDocs(dbInstance)
    .then((data) => {
      let x = data.docs.map((item) => {
        return { ...item.data(), id: item.id }
      });

      setData(x);
     
    })
  }

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  useEffect(()=>{
    getAllUsers();
  })

  return (
    <>
      <Head>
        <title>
          المستخدمون | ARA
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                المستخدمون
                </Typography>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <NotesSearch />
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
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
