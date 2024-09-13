import React from 'react'
import Hero from '@/components/alumni_directory/hero.jsx'
import SearchResult from '@/components/alumni_directory/search_results';
import { ChakraProvider } from '@chakra-ui/react';
import Pageination from '@/components/alumni_directory/pageination';
import Header from '@/components/Header/Header';


function Alumni_directory() {
  return (
    <div className='bg-indigo-200'>
        <Header />
        <Hero />
        <ChakraProvider>
            <SearchResult />
        </ChakraProvider>
        <Pageination />
        
    </div>
  )
}

export default Alumni_directory;