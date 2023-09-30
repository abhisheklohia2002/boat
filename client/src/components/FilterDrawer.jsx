import React, { useRef } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
  
  export default function FilterDrawer({btnRefFilter,onOpenFilter,isOpenFilter,onCloseFilter}) {
    


  return (
    <>

 
   
      <Drawer
        isOpen={isOpenFilter}
        placement='right'
        onClose={onCloseFilter}
        finalFocusRef={btnRefFilter}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Type here...' />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onCloseFilter}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>

  )
}
