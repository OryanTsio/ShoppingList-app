import React , {useEffect ,useState} from 'react';
import {View , Text , StyleSheet , Pressable , Alert} from 'react-native';
import {db , updateDoc,doc ,deleteDoc } from './firebase-config';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ShopItem = (props) => {

    const [isChecked , setIsChecked] = useState(props.product.isChecked)
    const deleteItem = async() => {
        try {
            await deleteDoc(doc(db , "shopinglist" , props.product.id));
            props.reloadData();
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    const updateItem = async() => {
        const updateRef = doc(db , "shopinglist" , props.product.id);
        await updateDoc(updateRef , {
            isChecked:isChecked
        })

        
    }

        useEffect(() => {
            updateItem();
        },[isChecked])



    return(
        <View style={styles.row}>
             <Pressable onPress={deleteItem}>
                <MaterialCommunityIcons name='delete-empty' size={30} color={'#151515'}/>
            </Pressable>
            
            <Text style ={styles.itemText}>{props.product.title}</Text>
            <Pressable onPress={() => setIsChecked(!isChecked)}>
            {
                isChecked ? 
                (
                    <Feather name='check-circle' size={30} color={'#4CB944'}/>
                ) : 
                (
                    <Feather name='circle' size={30} color={'#8AA39B'}/>
                ) 
            }
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    itemText:{
        fontSize:22,
        marginLeft:20,
        fontWeight:700,
        width:'70%',    
    },
    row:{
     alignItems:'center',
     justifyContent:'space-between',
     width:'100%' ,
     flexDirection:'row',
     padding:10,
     height:60 ,
     backgroundColor:'#ffff' ,
     marginBottom:12 ,
     borderRadius:12,
     shadowColor:'#00000',
     shadowOffset:{width:0 , height:2},
     shadowOpacity:0.60 ,
     shadowRadius:5,
     elevation:5
    },

})

export default ShopItem;