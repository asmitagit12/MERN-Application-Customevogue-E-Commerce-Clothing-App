import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../../services/admin/productServices';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Container,
    Divider,
    Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_BASEURL


type Product = {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: {
        _id: string;
        name: string;
    };
    subCategory?: {
        _id: string;
        name: string;
    };
    inStock: boolean;
    stock: number;
    sizes: {
        size: string;
        stock: number;
        _id: string;
    }[];
    images: string[];
    createdAt: string;
    updatedAt: string;
    categoryName: string;
    subCategoryName?: string;
};

type Filters = {
    category: string;
    type: string;
};

const UserCollection: React.FC = () => {
    const [productList, setProductList] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>(["Men", "Women", "Kids"]);
    const [types, setTypes] = useState<string[]>(["Topwear", "Bottomwear", "Winterwear"]);
    const [sortOption, setSortOption] = useState<string>("relevant");
    const [filters, setFilters] = useState<Filters>({
        category: "",
        type: "",
    });
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const filters = {
                    category: '',
                    subCategory: '',
                    minPrice: 0,
                    maxPrice: 0,
                    size: '',
                    stock: false,
                    search: ''
                };

                const response = await getAllProducts(filters);
                const productData = response?.data;
                if (productData && productData.length > 0) {
                    setProductList(productData);
                    setFilteredProducts(productData);
                }
            } catch (error: any) {
                console.error('Failed to fetch Products:', error.message);
            }
        };
        fetchProducts();
    }, []);

    const handleFilterChange = (filterKey: keyof Filters, value: string) => {
        setFilters((prev) => ({ ...prev, [filterKey]: value }));
    };

    const handleSortChange = (value: string) => {
        setSortOption(value);
        let sortedProducts = [...filteredProducts];
        if (value === "low-to-high") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (value === "high-to-low") {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else {
            return sortedProducts
        }
        setFilteredProducts(sortedProducts);
    };

    useEffect(() => {
        const applyFilters = () => {
            let filtered = productList;

            if (filters.category) {
                filtered = filtered.filter(
                    (product) => product.categoryName.toLowerCase() === filters.category.toLowerCase()
                );
            }

            if (filters.type) {
                filtered = filtered.filter(
                    (product) => product.subCategoryName?.toLowerCase() === filters.type.toLowerCase()
                );
            }

            setFilteredProducts(filtered);
        };

        applyFilters();
    }, [filters, productList]);

    return (
        <Grid container spacing={2} sx={{ width: '100%', pl: 4, pr: 4, pt: 3, pb: 3, display: 'flex', justifyContent: 'center' }}>
            <Grid item lg={2}>
                {/* Sidebar Filters */}
                <Box>
                    <Typography sx={{ fontSize: 24, fontWeight: 500, fontFamily: 'Prata, serif' }} gutterBottom>
                        Filters
                    </Typography>
                    <Box mb={2}>

                        <FormControl fullWidth size="small">
                            <InputLabel>Sort by</InputLabel>
                            <Select
                                value={sortOption}
                                label='Sort By'
                                onChange={(e) => handleSortChange(e.target.value)}
                            >
                                <MenuItem value="relevant">Relevant</MenuItem>
                                <MenuItem value="low-to-high">Low to High</MenuItem>
                                <MenuItem value="high-to-low">High to Low</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box mb={3} sx={{ border: '1px solid #E5E4E2', p: 2 }}>
                        <Typography variant="subtitle1">Categories</Typography>
                        <FormGroup>
                            {categories.map((category, index) => (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={filters.category === category}
                                            onChange={(e) =>
                                                handleFilterChange("category", e.target.checked ? category : "")
                                            }
                                        />
                                    }
                                    label={category}
                                />
                            ))}
                        </FormGroup>
                    </Box>

                    <Box mb={3} sx={{ border: '1px solid #E5E4E2', p: 2 }}>
                        <Typography variant="subtitle1">Type</Typography>
                        <FormGroup>
                            {types.map((type, index) => (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={filters.type === type}
                                            onChange={(e) =>
                                                handleFilterChange("type", e.target.checked ? type : "")
                                            }
                                        />
                                    }
                                    label={type}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                </Box>
            </Grid>
            <Grid item lg={9}>
                {/* Products and Sorting */}
                <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Stack direction="row" alignItems="center" spacing={2} width={'100%'}>
                            <Typography sx={{ fontSize: 24, fontWeight: 500, fontFamily: 'Prata, serif' }} gutterBottom>
                                All Collections
                            </Typography>
                            <Box flex={1}>
                                <Divider sx={{ bgcolor: '#808080' }} />
                            </Box>
                        </Stack>
                        {/* <FormControl size="small">
                            <InputLabel>Sort by</InputLabel>
                            <Select
                                value={sortOption}
                                onChange={(e) => handleSortChange(e.target.value)}
                            >
                                <MenuItem value="relevant">Relevant</MenuItem>
                                <MenuItem value="low-to-high">Low to High</MenuItem>
                                <MenuItem value="high-to-low">High to Low</MenuItem>
                            </Select>
                        </FormControl> */}
                    </Box>

                    <Grid container spacing={2}>
                        {filteredProducts.map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                                <Card
                                    component={'div'}
                                    onClick={() => navigate(`/product-details/${product._id}`)}
                                    style={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }} // Added cursor pointer for better UX
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={`${baseUrl}/uploads/${product.images[0]}`}
                                        alt={product.name}
                                    />
                                    <CardContent style={{ flexGrow: 1 }}>
                                        <Typography variant="h6" gutterBottom>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            ₹{product.price}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                </Box>

            </Grid>

        </Grid>
    );
};

export default UserCollection;
