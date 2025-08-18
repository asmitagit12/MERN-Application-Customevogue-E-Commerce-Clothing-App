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
    
    Divider,
    Stack,
    Slider,
    Chip,
    IconButton,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addWishlistItem, removeWishlistItem } from '../../../redux/slices/wishlistSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import toast from 'react-hot-toast';
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
    minPrice: number;
    maxPrice: number;
};

const UserCollection: React.FC = () => {
    const [productList, setProductList] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories] = useState<string[]>(["Men", "Women", "Kids"]);
    const [types] = useState<string[]>(["Topwear", "Bottomwear", "Winterwear"]);
    const [sortOption, setSortOption] = useState<string>("relevant");
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<Filters>({
        category: "",
        type: "",
        minPrice: 0,
        maxPrice: 5000, // Default price range
    });
    const navigate = useNavigate()
    const dispatch = useDispatch();
    // Fetch wishlist items from Redux store
    const wishlistItems = useSelector((state: any) => state.wishlist.items);
    // Function to handle adding/removing item from wishlist
    const handleAddToWishlist = (product: any) => {
        // Check if the product is already in the wishlist
        const existingItem = wishlistItems?.find((item: any) => item._id === product._id);

        if (existingItem) {
            // If it's in the wishlist, remove it
            dispatch(removeWishlistItem({ id: product._id }));
            toast.success('Product removed from wishlist')
        } else {
            // If it's not in the wishlist, add it
            dispatch(addWishlistItem(product));
            toast.success('Product added to wishlist')
        }
    };
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
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
            } finally {
                setLoading(false);
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
    const handlePriceChange = (_event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setFilters((prev) => ({
                ...prev,
                minPrice: newValue[0],
                maxPrice: newValue[1],
            }));
        }
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

            // Filter by Price Range
            filtered = filtered.filter(
                (product) => product.price >= filters.minPrice && product.price <= filters.maxPrice
            );

            setFilteredProducts(filtered);
        };

        applyFilters();
    }, [filters, productList]);

    if (loading) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        );
    }
    return (
        <Grid container spacing={2} sx={{ width: '100%', pl: { lg: 4, md: 2, sm: 1, xs: 0 }, pr: { lg: 4, md: 1, sm: 1, xs: 0 }, pt: 3, pb: 3, display: 'flex', justifyContent: 'center' }}>
            <Grid item lg={2} md={3} sm={3} xs={12}>
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
                    {/* Price Range Filter */}
                    <Box mb={3} sx={{ border: '1px solid #E5E4E2', p: 2 }}>
                        <Typography variant="subtitle1">Price Range</Typography>
                        <Slider
                            size='medium'
                            value={[filters.minPrice, filters.maxPrice]}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={5000}
                            step={100}
                        />
                        <Typography variant="body2">
                            ₹{filters.minPrice} - ₹{filters.maxPrice}
                        </Typography>
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
            <Grid item lg={9} md={9} sm={9} xs={12}>
                {/* Products and Sorting */}
                <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Stack direction="row" alignItems="center" spacing={2} width={'100%'}>
                            <Typography sx={{ fontSize: 24, fontWeight: 500, fontFamily: 'Prata, serif' }} gutterBottom>
                                All Collections
                            </Typography>
                            <Box flex={1}>
                                <Divider sx={{ bgcolor: '#808080' }} />
                            </Box>
                        </Stack>

                    </Box>

                    <Grid container spacing={2}>
                        {filteredProducts.map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                                <Card
                                    component={'div'}
                                    onClick={() => navigate(`/product-details/${product._id}`)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        cursor: 'pointer',
                                        position: 'relative', // Added position relative to ensure heart icon can be positioned absolutely
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={`${baseUrl}api/uploads/${product.images[0]}`}
                                        alt={product.name}
                                    />
                                    <CardContent style={{ flexGrow: 1 }}>
                                        <Typography sx={{ fontSize: 15, fontWeight: 500 }} gutterBottom>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 550 }} color="textSecondary">
                                            ₹{product.price}
                                        </Typography>
                                    </CardContent>

                                    {/* Stock information */}
                                    <div style={{ padding: '8px' }}>
                                        {product.stock < 3 ? (
                                            <Chip label="Few left" color="error" size="small" sx={{ fontSize: 10 }} />
                                        ) : product.stock === 3 ? (
                                            <Chip label="Only 3 left" color="error" size="small" sx={{ fontSize: 10 }} />
                                        ) : null}
                                    </div>

                                    {/* Heart Icon to add/remove from wishlist */}
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering the card's onClick
                                            handleAddToWishlist(product);
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            color: wishlistItems.some((item: any) => item._id === product._id) ? 'red' : 'gray', // Change color based on if product is in wishlist
                                            zIndex: 10, // Ensure it's on top of other elements
                                        }}
                                    >
                                        <FavoriteIcon />
                                    </IconButton>
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




