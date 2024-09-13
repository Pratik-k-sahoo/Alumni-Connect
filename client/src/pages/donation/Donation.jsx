import React from 'react'
import Hero from '@/components/donation/hero'
import Stats from '@/components/donation/stats'
import Contact from '@/components/donation/contact'
import Card from '@/components/donation/cards'
import { ChakraProvider } from '@chakra-ui/react'
import Thankyou from '@/components/donation/thankyou'
import {Header} from "@/components";
import Footer from "../../components/Footer/Footer";

const Donation = () => {
  return (
    <div>
        <Header />
        <ChakraProvider>
		<Hero />
		<Card />
		<Thankyou />
		<Stats />
		<Contact />
		</ChakraProvider>
        <Footer />
    </div>
  )
}

export default Donation