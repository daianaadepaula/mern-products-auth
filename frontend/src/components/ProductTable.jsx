import { useEffect, useState } from "react";
import { Button, Container, Grid, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast, VStack } from "@chakra-ui/react"

import { useProductStore } from "../store/product";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

export const ProductTable = () => {
	const { fetchProducts, products, deleteProduct, updateProduct } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);
	console.log("products", products);

	const [updatedProduct, setUpdatedProduct] = useState({
		_id: "",
		name: "",
		price: 0,
		image: ""
	});

	const toast = useToast();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleEditClick = (product) => {
		setUpdatedProduct(product);
		onOpen();
	};

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);

		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		if (!pid) {
			toast({
				title: "Error",
				description: "Product ID is missing.",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		const { success, message } = await updateProduct(pid, updatedProduct);

		onClose();

		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};


	return (
		<Container
			maxW='container.xl' py={12}
		>
			<TableContainer >
				<Table variant='striped' colorScheme='purple'>
					<Thead>
						<Tr>
							<Th>Image</Th>
							<Th>Name</Th>
							<Th>Price ($)</Th>
							<Th>Edit / Delete</Th>
						</Tr>
					</Thead>
					<Tbody>

						{products.length > 0 && products.map((product) => (
							<Tr key={product._id}>
								<Td>
									<Image src={product.image} alt={product.name} h={12} w={12} objectFit='cover' />
								</Td>
								<Td>{product.name}</Td>
								<Td>${product.price}</Td>
								<Td>
									<Grid templateColumns='repeat(2, 1fr)' gap={2}>
										<IconButton
											icon={<EditIcon />}
											onClick={() => handleEditClick(product)}
											colorScheme='green'
										/>

										<IconButton
											icon={<DeleteIcon />}
											onClick={() => handleDeleteProduct(product._id)}
											colorScheme='red'
										/>
									</Grid>
								</Td>
							</Tr>
						))}

					</Tbody>
				</Table>
			</TableContainer>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Product Name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>

							<Input
								placeholder='Price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>

							<Input
								placeholder='Image URL'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='green' mr={3} onClick={() => handleUpdateProduct(updatedProduct._id, updatedProduct)}>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

		</Container>
	)
}
