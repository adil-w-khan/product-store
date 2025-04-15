import { Container, VStack, Heading, FormControl, Box, useColorModeValue, Input, Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { useProductStore } from '../store/product'

const CreatePage = () => {
  const[newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    image: "",
  })
  const toast = useToast()

  const createProduct = useProductStore()
  const handleAddProduct = async () => {
    const {success,message} = await createProduct.createProduct(newProduct)
    if(!success){
      toast({
        title:"Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } else{
      toast({
        title:"Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }
    setNewProduct({
      name: "",
      price: "",
      image: "",
    })
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8} align={"center"} justify={"center"} mt={10}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Create Product</Heading>
        
        <Box
          w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack spacing={4} align={"flex-start"}>
            <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            
            />
            <Input
              placeholder='Price'
              price='price'
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            
            />
            <Input
              placeholder='Image Url'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            
            />

            <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage