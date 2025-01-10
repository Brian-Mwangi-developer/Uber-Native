import {View, Text, FlatList} from 'react-native'
import React from 'react'
import RideLayout from "@/components/RideLayout";
import {exampleDrivers} from "@/components/Map";
import DriverCard from "@/components/DriverCard";
import CustomButton from "@/components/CustomButton";
import {router} from "expo-router";

const ConfirmRide = () => {
  return (
    <RideLayout title="Choose a  Driver" snapPoints={["65%","85%"]}>
      <FlatList data={exampleDrivers} renderItem={({item})=> <DriverCard item={item}/>}
      ListFooterComponent={()=>(
        <View className="mx-5 mt-10">
          <CustomButton title="select Driver" onPress={()=> router.push("/(root)/book-ride")}/>
        </View>
      )}/>
    </RideLayout>
  )
}
export default ConfirmRide
