import {View, Text, ScrollView, Image} from 'react-native'
import React, {useState} from 'react'
import {icons, images} from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import {Link, useRouter} from "expo-router";
import OAuth from "@/components/OAuth";
import {useSignIn} from "@clerk/clerk-expo";

const SignIn = () => {
  const [form, setForm] = useState({email:"", password:""});
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password:form.password,
      })


      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {

        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, form.email, form.password])

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flx-1 bg-white">
        <View>
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]"/>
          <Text className="text-3xl text-black font-JakartaSemiBold absolute bottom-5 left-5">Welcome 👋</Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({...form, email:value})}/>
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => setForm({...form, password:value})}/>
          <CustomButton title="Sign In" onPress={onSignInPress} className="mt-6"/>
          {/*OAuth*/}
          <OAuth/>
          <Link href="/sign-up"
                className="text-lg text-center text-general-200 mt-10">
            <Text>Don't have an Account?</Text>
            <Text className="text-primary-500"> Sign up</Text>
          </Link>
        </View>
        {/*Verification Modal*/}
      </View>
    </ScrollView>
  )
}
export default SignIn
