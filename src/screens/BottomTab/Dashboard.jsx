import { gql, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { SelectedProduct } from '../../redux/actions/productDetail';
import useGetProducts from '../hooks/useGetProducts';
import SortModel from '../../components/SortModel';

//     query GetAllProducts($first: Int, $after: String) {
//         products(first: $first, after: $after) {
//             pageInfo {
//                 endCursor
//                 hasNextPage
//             }
//             edges {
//                 node {
//                     images(first: 1){
//                         edges {
//                             node{
//                                 url
//                             }
//                         }
//                     }
//                     title
//                     id
//                     descriptionHtml
//                     description
//                     priceRange{
//                         minVariantPrice{
//                             amount
//                         }
//                     }
//                     variants(first:5){
//                         edges{
//                             node{
//                                 image{
//                                     url
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `;

const Dashboard = ({ navigation }) => {

    const [sortSet, setSortSet] = useState('VENDOR');
    const [modalVisible , setModalVisible] = useState(false);

    const toogleModal = () => {
        setModalVisible(!modalVisible);
    }

    const variabel = {
        sort: sortSet
    }

    const {
        loading, 
        error,
        data:productsData,
        hasNextPage,
        loadMoreData, } = useGetProducts(variabel);

        console.log(productsData, "products");

    const dispatch = useDispatch();


    const handleProductSelect = (product) => {
        dispatch(SelectedProduct(product));
        navigation.navigate('ProductDetail', { product: product });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleProductSelect(item)} style={styles.item}>
            <View>

                <Image
                    style={styles.image}
                    source={item.node?.images?.edges[0]?.node?.url ?
                        { uri: item.node?.images?.edges[0]?.node?.url } :
                        { uri: 'https://images.unsplash.com/photo-1604662941425-9642752c5c14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29taW5ncyUyMHNvb258ZW58MHx8MHx8fDA%3D' }
                    }
                />

                <Text style={styles.title} numberOfLines={4}>$ {item.node?.variants?.edges[0]?.node?.price?.amount}</Text>
                <Text style={styles.description} numberOfLines={4}>{item.node?.title}</Text>
            </View>
        </TouchableOpacity>
    );

    console.log('all function data', productsData)

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={productsData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                onEndReached={() => loadMoreData()}
                onEndReachedThreshold={0.5}
            />
            <View style={styles.sortViewContainer}>
                <TouchableOpacity  onPress={() => toogleModal()}>
                    <Text style={styles.btnText}>
                        Sort By
                    </Text>
                </TouchableOpacity>
                <SortModel modalVisible={modalVisible} toogleModal={toogleModal} />
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoriesContainer: {
        display: 'flex',
    },
    categoriesTouchable: {
        marginVertical: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
    categories: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        height: 42,
        fontSize: 20,
        color: '#000',
        width: 'auto',
        fontFamily: 'Formula1-Regular'
    },
    item: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 9,
        width: '45%',
        textAlign: 'left',
        borderWidth: 2,
        borderRadius: 5
    },
    image: {
        height: 120,
        width: 120,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    title: {
        marginTop: 5,
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000000',
    },
    description: {
        marginTop: 3,
        fontSize: 12,
        color: '#000000',
        fontFamily: 'radikal_thin-webfont',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    sortViewContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#FFFBDA',
    },
});

export default Dashboard;
