import React , {useEffect ,useState} from 'react';
import {FlatList, StyleSheet, Text, View  , TextInput , Alert ,Pressable ,SafeAreaView} from 'react-native';
import {db ,collection, addDoc,updateDoc,doc, getDocs ,deleteDoc } from './firebase-config';
import ShopItem from './ShopItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Materialicons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
export default function App() {

  const [shopTitle , setShopTitle] = useState("");
  const [shopList , setShopList] = useState([])
  //CRUD -> CREATE NEW ITEM
  const saveMyItem = async() => {
    try {
      const shopingListRef = await addDoc(collection(db , "shopinglist") , {
        title: shopTitle,
        isChecked :false
      });
      setShopTitle("");
    } catch (error) {
      Alert.alert(error.message)
    }
    getMyList();
  }
  
  //CRUD -> READ ITEMS
  const getMyList = async() => {
    try {
      const query = await getDocs(collection(db , "shopinglist"));
      setShopList(
        query.docs.map((doc) => ({
          ...doc.data(), 
          id:doc.id
        }))
      )
    } catch (error) {
      Alert.alert(error.message);
    }
  }
  
  useEffect(() => {
    getMyList();
  } , [])

  const deleteAllItems = async() => {
    const query = await getDocs(collection(db , "shopinglist"));
    query.docs.map((item) => deleteDoc(doc(db , "shopinglist" , item.id)));
    getMyList();
  }
  


  return (
    <View style ={styles.container}>
      <View style = {styles.header}>
      <Pressable onPress={deleteAllItems}>
            <MaterialCommunityIcons name='delete-off' color={"#F21B3F"} size={36}/>
         </Pressable>
         <Text style={styles.logo}>ShopList</Text>
         <Fontisto name='opencart' size={30}/>
      </View>

      <View style = {styles.list}>
        {
          shopList.length > 0 ? (
          
          <FlatList 
           data={shopList} 
           keyExtractor={item => item.id}
           renderItem={({item}) => <ShopItem product = {item} reloadData={getMyList}/>}
          />
          ) : 
          (
            <View style ={styles.nodata_container}>
              <Materialicons name='error-outline' size={40}/><Text style={styles.nodata_lbl}>No data for you</Text>
            </View>
          )
        }
      </View>

      <View style = {styles.input}>
        <TextInput 
        style = {styles.inputText}
        placeholder='Enter your item'
        keyboardType='default'
        onChangeText={(text) => setShopTitle(text)}
        value={shopTitle}
        onSubmitEditing={saveMyItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nodata_container:{
    width:'100%' ,
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
  },
  nodata_lbl:{
    color:'#fffff',
    fontSize:24,
    marginRight:50,
    fontWeight:'800',
    width:'70%',
    marginTop:10
  },
  logo:{
    marginHorizontal:12,
    color:'#000000',
    fontSize:30,
    marginLeft:10,
    fontWeight:'800',
    width:'65%',
    marginTop:10
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFACC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{width:'100%' , height:'10%' , backgroundColor:'#FFFFB3',alignItems:'center' ,justifyContent:'center' , flexDirection:'row' ,marginTop:10},
  list:{width:'100%' , height:'80%',padding:10},
  input:{ width:'100%' , height:'10%' ,backgroundColor:'#FFFFB3' ,padding:10},
  inputText: {fontWeight:'700',width:'100%' , height:60 , backgroundColor:'#ffff' , fontSize:22 , paddingHorizontal:10}
});
