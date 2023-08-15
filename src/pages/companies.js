import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';

import { app, database } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';


const Page = () => {

  const router = useRouter();

  const [companies, setCompanies] = useState([])

  
  const getAllMun = async () => {
    try {
      const municipalitiesCollection = collection(database, 'Municipalities');
      const nonSuperuserQuery = query(municipalitiesCollection, where('superuser', '==', false));
  
      const querySnapshot = await getDocs(nonSuperuserQuery);
  
      const nonSuperuserMunicipalities = [];
      querySnapshot.forEach((doc) => {
        nonSuperuserMunicipalities.push(doc.data());
      });

      setCompanies(nonSuperuserMunicipalities)
      return nonSuperuserMunicipalities;
    } catch (error) {
      console.error('Error fetching non-superuser municipalities:', error);
      return [];
    }
  }

  useEffect(()=>{
    getAllMun();
  })


  return <>
    <Head>
      <title>
        البلديات | ARA
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
            <Stack spacing={1} sx={{mb:2}}>
                <Typography variant="h5">
                البلديات
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
                onClick={()=>{router.push('/account')}}
              >
                إضافة بلدية
              </Button>
            </div>
          </Stack>
        
          <Grid
            container
            spacing={3}
          >
            {companies.map((company) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={company.id}
              >
                <CompanyCard company={company} />
              </Grid>
            ))}
          </Grid>
          {/* <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Pagination
              count={3}
              size="small"
            />
          </Box> */}
        </Stack>
      </Container>
    </Box>
  </>
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
