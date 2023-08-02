import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react'
import { Outlet } from "react-router-dom"
import Sidebar from '../component/sidebar/Sidebar';

function RoutLayout() {
    return (
        <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">
          {/* sidebar */}
          <GridItem
            as="aside"
            colSpan={{ base: 6, lg: 2, xl: 1 }} 
            bg="#1E88E5"
            minHeight={{ lg: '100vh' }}
            p={{ base: '20px', lg: '30px' }}
          >
           <Sidebar/>
          </GridItem>
    
          {/* main content & navbar */}
          <GridItem
            as="main"
            colSpan={{ base: 6, lg: 4, xl: 5 }} 
            p="40px"
            minHeight={{ lg: '100vh' }}
          >
            <Outlet />
          </GridItem>
        </Grid>
      )
}

export default RoutLayout;